// backend/models/appointment.js
import pool from '../config/db.js';

const Appointment = {
  create: async (appointmentData) => {
    const {
      user_id,
      doctor_id,
      appointment_date,
      appointment_time,
      specialization,
      type,  // new field: Physical or Online
      reason,
    } = appointmentData;

    const [rows] = await pool.query(
      `INSERT INTO appointments (
        user_id, doctor_id, appointment_date, appointment_time, specialization, type, reason
      ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [user_id, doctor_id, appointment_date, appointment_time, specialization, type, reason]
    );

    return rows;
  },
};

export default Appointment;
