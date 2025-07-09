import express from 'express';
import pool from '../config/db.js'; // make sure db.js uses mysql2/promise
const router = express.Router();

// --- Summary ---
router.get('/summary', async (req, res) => {
  try {
    const [patients] = await pool.query("SELECT COUNT(*) AS count FROM users WHERE role = 'patient'");
    const [doctors] = await pool.query("SELECT COUNT(*) AS count FROM users WHERE role = 'doctor'");
    res.json({
      totalPatients: patients[0].count,
      totalDoctors: doctors[0].count,
    });
  } catch (err) {
    console.error("Error fetching summary:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// --- Activity Log ---
router.get('/activity-log', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM activity_log ORDER BY id DESC LIMIT 50');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching activity logs:', err);
    res.status(500).json({ error: 'Failed to fetch activity logs' });
  }
});

// --- Pending Users ---
// --- Pending Users ---
router.get('/pending-users', async (req, res) => {
  try {
    // Modify query to select only required fields, excluding sensitive information
    const [pendingUsers] = await pool.query(
      "SELECT id, firstName, lastName, email FROM users WHERE status = 'pending'"
    );
    res.json(pendingUsers);
  } catch (err) {
    console.error("Error fetching pending users:", err);
    res.status(500).json({ message: "Failed to fetch pending users" });
  }
});


// --- Approve a User ---
router.put('/approve-user/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const [result] = await pool.query(
      "UPDATE users SET status = 'approved' WHERE id = ? AND status = 'pending'",
      [userId]
    );
    console.log('Approve result:', result); // Log the result of the update
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found or already approved' });
    }

    // Re-fetch pending users after approval
    const [pendingUsers] = await pool.query("SELECT * FROM users WHERE status = 'pending'");
    console.log('Pending users after approval:', pendingUsers); // Log pending users after approval
    res.json({ message: 'User approved successfully', pendingUsers });
  } catch (err) {
    console.error("Error approving user:", err);
    res.status(500).json({ message: "Failed to approve user" });
  }
});

// --- Reject a User ---
router.put('/reject-user/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const [result] = await pool.query(
      "UPDATE users SET status = 'rejected' WHERE id = ? AND status = 'pending'",
      [userId]
    );
    console.log('Reject result:', result); // Log the result of the update
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found or already rejected' });
    }

    // Re-fetch pending users after rejection
    const [pendingUsers] = await pool.query("SELECT * FROM users WHERE status = 'pending'");
    console.log('Pending users after rejection:', pendingUsers); // Log pending users after rejection
    res.json({ message: 'User rejected successfully', pendingUsers });
  } catch (err) {
    console.error("Error rejecting user:", err);
    res.status(500).json({ message: "Failed to reject user" });
  }
});

// --- Users ---
router.get('/users', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users ORDER BY id ASC');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// --- Admin Settings ---
router.get('/admin-settings', async (req, res) => {
  try {
    const [settings] = await pool.query('SELECT * FROM admin_settings WHERE id = 1');
    res.json(settings[0]);
  } catch (err) {
    console.error("Error fetching admin settings:", err);
    res.status(500).json({ message: "Failed to fetch admin settings" });
  }
});

// --- Doctor Endpoints ---
router.get('/doctors', async (req, res) => {
  try {
    const [doctors] = await pool.query("SELECT * FROM doctors ORDER BY id ASC");
    res.json(doctors);
  } catch (err) {
    console.error("Error fetching doctors:", err);
    res.status(500).json({ message: "Failed to fetch doctors" });
  }
});

// Add a doctor
router.post('/add-doctor', async (req, res) => {
  const { firstName, lastName, email, phone, license_no, specialization, experience } = req.body;

  const fullName = `${firstName} ${lastName}`;

  try {
    // 1. Insert into users table
    const [userResult] = await pool.query(
      'INSERT INTO users (firstName, lastName, email, phone, role, status, password) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [firstName, lastName, email, phone, 'doctor', 'approved', 'defaultpassword'] // Use default password or implement secure handling
    );

    const userId = userResult.insertId;

    // 2. Insert into doctors table using the returned userId
    await pool.query(
      'INSERT INTO doctors (user_id, name, specialization, email, phone, license_no, experience) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [userId, fullName, specialization, email, phone, license_no, experience]
    );

    res.json({ message: "Doctor added successfully", userId });
  } catch (err) {
    console.error("Error adding doctor:", err);
    res.status(500).json({ message: "Failed to add doctor" });
  }
});



router.put('/edit-doctor/:id', async (req, res) => {
  const doctorId = req.params.id;
  const { firstName, lastName, email, phone, specialization, license_no, experience } = req.body;
  
  const fullName = `${firstName} ${lastName}`; // Create full name from first and last name

  try {
    // Fetch doctor to get user_id
    const [doctorResult] = await pool.query(
      'SELECT user_id FROM doctors WHERE id = ?',
      [doctorId]
    );

    if (doctorResult.length === 0) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    const userId = doctorResult[0].user_id;

    // Update the users table with first name, last name, email, and phone
    await pool.query(
      'UPDATE users SET firstName = ?, lastName = ?, email = ?, phone = ? WHERE id = ?',
      [firstName, lastName, email, phone, userId]
    );

    // Update the doctors table with full name, specialization, license_no, and experience
    await pool.query(
      'UPDATE doctors SET name = ?, specialization = ?, email = ?, phone = ?, license_no = ?, experience = ? WHERE id = ?',
      [fullName, specialization, email, phone, license_no, experience, doctorId]
    );

    res.json({ message: 'Doctor and user information updated successfully' });
  } catch (err) {
    console.error('Error editing doctor:', err);
    res.status(500).json({ message: 'Failed to edit doctor' });
  }
});



// Delete doctor
router.delete('/delete-doctor/:id', async (req, res) => {
  const doctorId = req.params.id;
  try {
    const [result] = await pool.query("DELETE FROM doctors WHERE id = ?", [doctorId]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.json({ message: "Doctor deleted successfully" });
  } catch (err) {
    console.error("Error deleting doctor:", err);
    res.status(500).json({ message: "Failed to delete doctor" });
  }
});

// Get distinct doctor specializations
router.get('/specializations', async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT DISTINCT specialization FROM doctors WHERE specialization IS NOT NULL");
    res.json(rows);
  } catch (err) {
    console.error("Error fetching specializations:", err);
    res.status(500).json({ message: "Failed to fetch specializations" });
  }
});

// Edit specialization (NEW)
router.put('/edit-specialization/:doctorId', async (req, res) => {
  const doctorId = req.params.doctorId;
  const { specialization } = req.body;

  try {
    const [result] = await pool.query(
      'UPDATE doctors SET specialization = ? WHERE id = ?',
      [specialization, doctorId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.json({ message: "Specialization updated successfully" });
  } catch (err) {
    console.error("Error editing specialization:", err);
    res.status(500).json({ message: "Failed to update specialization" });
  }
});

// Delete specialization (NEW)
router.delete('/delete-specialization/:doctorId', async (req, res) => {
  const doctorId = req.params.doctorId;

  try {
    const [result] = await pool.query(
      'UPDATE doctors SET specialization = NULL WHERE id = ?',
      [doctorId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.json({ message: "Specialization deleted successfully" });
  } catch (err) {
    console.error("Error deleting specialization:", err);
    res.status(500).json({ message: "Failed to delete specialization" });
  }
});

export default router;
