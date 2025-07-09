import express from 'express';
import pool from '../config/db.js';// make sure the path to your db file is correct

const router = express.Router();

// ✅ Get distinct doctor specializations
router.get('/specializations', async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT DISTINCT specialization FROM doctors WHERE specialization IS NOT NULL"
    );
    res.json(rows);
  } catch (err) {
    console.error("Error fetching specializations:", err);
    res.status(500).json({ message: "Failed to fetch specializations" });
  }
});

// ✅ Get doctors by specialization
router.get('/doctors-by-specialization/:specialization', async (req, res) => {
  const { specialization } = req.params;

  try {
    const [rows] = await pool.query(
      `SELECT d.id AS doctorId, u.firstName, u.lastName 
       FROM doctors d 
       JOIN users u ON d.user_id = u.id 
       WHERE d.specialization = ?`,
      [specialization]
    );

    res.json(rows);
  } catch (err) {
    console.error("Error fetching doctors:", err);
    res.status(500).json({ message: "Failed to fetch doctors" });
  }
});

export default router;
