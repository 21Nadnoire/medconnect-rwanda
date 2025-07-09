import db from '../config/db.js';

export const getUserProfile = async (req, res) => {
  const userId = req.user.id; // coming from authMiddleware
  try {
    const [user] = await db.query(
      'SELECT id, firstName, lastName, email, phone, role FROM users WHERE id = ?',
      [userId]
    );

    if (!user.length) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user[0]);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
