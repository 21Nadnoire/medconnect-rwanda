import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../config/db.js';
import dotenv from 'dotenv';

dotenv.config();

// Register User
export const registerUser = async (req, res) => {
    const { firstName, lastName, email, password, confirmPassword, role } = req.body;

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    try {
        db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
            if (err) {
                return res.status(500).json({ message: 'Database error' });
            }
            if (results.length > 0) {
                return res.status(400).json({ message: 'User already exists' });
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const userRole = role || 'patient'; // Default to 'patient' if no role is provided

            db.query(
                'INSERT INTO users (firstName, lastName, email, password, role) VALUES (?, ?, ?, ?, ?)',
                [firstName, lastName, email, hashedPassword, userRole],
                (err, result) => {
                    if (err) {
                        return res.status(500).json({ message: 'Database error' });
                    }
                    res.status(201).json({ message: 'User registered successfully', role: userRole });
                }
            );
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Login User
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Query to check if user exists by email
        db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
            if (err) {
                return res.status(500).json({ message: 'Database error' });
            }

            if (results.length === 0) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            const user = results[0];
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            // Check if the user's account is pending approval
            if (user.status !== "approved") {
                return res.status(403).json({ message: "Your account is pending approval." });
            }

            // Create JWT token
            const token = jwt.sign(
                { id: user.id, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            res.json({
                token,
                user: {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    role: user.role,
                }
            });
        });
    }catch (error) {
        console.error("Server Error:", error); // Log error to console
        res.status(500).json({ message: "Server error", error: error.message });
    }
    
};
