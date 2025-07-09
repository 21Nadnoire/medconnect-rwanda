import pool from '../config/db.js';

const Doctor = {
  // ✅ Get all doctors
  getAll: async () => {
    const [results] = await pool.query('SELECT * FROM doctors');
    return results;
  },

  // ✅ Get distinct specializations
  getSpecializations: async () => {
    const [results] = await pool.query(
      'SELECT DISTINCT specialization FROM doctors'
    );
    return results;
  },

  // ✅ Fetch doctors by specialization with user details
  getBySpecialization: async (specialization) => {
    console.log('📤 Running DB query for specialization:', specialization);

    const [results] = await pool.query(
      `SELECT d.id AS doctor_id, u.firstName, u.lastName, u.email, u.phone
       FROM doctors d
       JOIN users u ON d.user_id = u.id
       WHERE d.specialization = ?`,
      [specialization]
    );

    return results;
  },

  // ✅ Create a doctor
  create: async (doctorData) => {
    const { user_id, specialization, contact_info, location, available } = doctorData;

    const [result] = await pool.query(
      'INSERT INTO doctors (user_id, specialization, contact_info, location, available) VALUES (?, ?, ?, ?, ?)',
      [user_id, specialization, contact_info, location, available]
    );

    return result;
  },

  // ✅ Get doctor by ID
  getById: async (id) => {
    const [results] = await pool.query('SELECT * FROM doctors WHERE id = ?', [id]);
    return results[0];
  },

  // ✅ Update doctor
  update: async (id, doctorData) => {
    const { specialization, contact_info, location, available } = doctorData;

    const [result] = await pool.query(
      'UPDATE doctors SET specialization = ?, contact_info = ?, location = ?, available = ? WHERE id = ?',
      [specialization, contact_info, location, available, id]
    );

    return result;
  },

  // ✅ Delete doctor
  delete: async (id) => {
    const [result] = await pool.query('DELETE FROM doctors WHERE id = ?', [id]);
    return result;
  },
};

export default Doctor;
