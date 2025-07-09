import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../config/db.js";
import nodemailer from "nodemailer";
import { randomBytes } from "crypto";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// Register Route
router.post("/register", async (req, res) => {
  const { 
    firstName, 
    lastName, 
    email, 
    password, 
    confirmPassword, 
    role, 
    phone, 
    specialization, 
    licenseNo, 
    experience 
  } = req.body;

  // Validate required fields
  if (!firstName || !lastName || !email || !password || !confirmPassword || !role || !phone) {
    return res.status(400).json({ message: "All fields are required." });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match." });
  }

  try {
    // Check if email is already registered
    const [existingUser] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: "Email already registered." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Set the user status (auto-approve for patients)
    const status = role === "patient" ? "approved" : "pending";

    // Insert user into 'users' table
    const [result] = await db.query(
      "INSERT INTO users (firstName, lastName, email, password, role, status, phone) VALUES (?, ?, ?, ?, ?, ?, ?)", 
      [firstName, lastName, email, hashedPassword, role, status, phone]
    );

    // If the role is "doctor", insert the additional doctor details
    if (role === "doctor") {
      // Check that all doctor-specific fields are provided
      if (!specialization || !licenseNo || !experience) {
        return res.status(400).json({ message: "All doctor fields are required." });
      }

      // Insert doctor details into 'doctors' table
      const doctorName = `${firstName} ${lastName}`;
      await db.query(
        "INSERT INTO doctors (user_id, name, specialization, email, phone, license_no, experience) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [result.insertId, doctorName, specialization, email, phone, licenseNo, experience]
      );
    }

    // Respond with success message
    res.status(201).json({ 
      message: "User registered successfully!", 
      userId: result.insertId,
      status: status
    });
  } catch (error) {
    console.error("Registration Error:", error); // ✅ Logs error to terminal
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const [users] = await db.query("SELECT * FROM users WHERE email = ?", [email]);  // No need for .promise() here

    if (users.length === 0) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const user = users[0];
    console.log("✅ Retrieved User:", user);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (user.role !== "patient" && user.status !== "approved") {
      return res.status(403).json({ message: "Your account is pending approval." });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({
      token,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Forgot Password - Send reset email
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    // Check if user exists
    const [user] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (user.length === 0) {
      return res.status(400).json({ message: "User with this email does not exist" });
    }

    // Generate a reset token (using crypto)
    const resetToken = randomBytes(20).toString("hex");
    const resetTokenExpiration = Date.now() + 3600000; // 1 hour expiration time

    // Save reset token and expiration in the database
    await db.query(
      "UPDATE users SET reset_token = ?, reset_token_expiry = ? WHERE email = ?",
      [resetToken, resetTokenExpiration, email]
    );

    // Send reset email
    const transporter = nodemailer.createTransport({
      service: "gmail", // or any other email service
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Request",
      text: `You have requested a password reset. Click the link below to reset your password:\n\nhttp://localhost:5173/reset-password/${resetToken}`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        return res.status(500).json({ message: "Error sending email", error: err });
      }
      res.status(200).json({ message: "Password reset link sent to your email" });
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Reset Password
router.post("/reset-password/:resetToken", async (req, res) => {
  const { resetToken } = req.params;
  const { password, confirmPassword } = req.body;

  if (!password || !confirmPassword) {
    return res.status(400).json({ message: "Password and confirm password are required" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    // Check if the reset token exists and is not expired
    const [user] = await db.query(
      "SELECT * FROM users WHERE reset_token = ? AND reset_token_expiry > ?",
      [resetToken, Date.now()]
    );

    if (user.length === 0) {
      return res.status(400).json({ message: "Invalid or expired reset token" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's password and clear the reset token
    await db.query(
      "UPDATE users SET password = ?, reset_token = NULL, reset_token_expiry = NULL WHERE reset_token = ?",
      [hashedPassword, resetToken]
    );

    res.status(200).json({ message: "Password has been reset successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Admin Approve User Route
router.put("/approve-user/:userId", async (req, res) => {
  const { userId } = req.params;
  const { loggedInUserRole } = req.body;  // Assume the logged-in user is passed from the frontend

  try {
    // Only allow super-admin to approve other admins or doctors
    if (loggedInUserRole !== 'super-admin') {
      return res.status(403).json({ message: "You do not have permission to approve users." });
    }

    // Check if user exists and is in "pending" status
    const [user] = await db.query("SELECT * FROM users WHERE id = ? AND status = 'pending'", [userId]);

    if (user.length === 0) {
      return res.status(400).json({ message: "User not found or already approved." });
    }

    // Update the user's status to 'approved'
    await db.query("UPDATE users SET status = 'approved' WHERE id = ?", [userId]);

    res.status(200).json({ message: "User approved successfully" });
  } catch (error) {
    console.error("Error in approving user:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
