export const approveUser = (req, res) => {
    const { userId } = req.params;

    db.query(
        "UPDATE users SET status = 'approved' WHERE id = ?",
        [userId],
        (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Database error", error: err.message });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "User not found" });
            }
            res.json({ message: "User approved successfully!" });
        }
    );
};

export const getActivityLog = async (req, res) => {
    try {
      const logs = await db.query("SELECT * FROM activity_log ORDER BY created_at DESC");
      res.json(logs[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to fetch activity log" });
    }
  };
