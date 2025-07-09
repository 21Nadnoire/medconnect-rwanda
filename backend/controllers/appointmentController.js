// backend/controllers/appointmentController.js
import jwt from 'jsonwebtoken';
import Appointment from '../models/appointment.js';
import Doctor from '../models/doctor.js';

export const bookAppointment = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const {
      doctorId,
      appointment_date,
      appointment_time,
      specialization,
      reason,
      type,
    } = req.body;

    const appointmentData = {
      user_id: userId,
      doctor_id: parseInt(doctorId),
      appointment_date,
      appointment_time,
      specialization,
      reason,
      type,
    };

    const result = await Appointment.create(appointmentData);
    res.status(201).json({ message: 'Appointment booked successfully', result });
  } catch (err) {
    console.error('Book appointment error:', err);
    res.status(500).json({ message: 'Something went wrong', error: err.message });
  }
};

// Get distinct specializations
export const getSpecializations = async (req, res) => {
  try {
    const specializations = await Doctor.getSpecializations();
    res.json(specializations);
  } catch (err) {
    console.error('Get specializations error:', err);
    res.status(500).json({ message: 'Failed to fetch specializations' });
  }
};

// Get doctors by specialization
export const getDoctorsBySpecialization = async (req, res) => {
  const specialization = req.params.specialization;
  console.log("📥 Incoming specialization request:", specialization);

  try {
    const doctors = await Doctor.getBySpecialization(specialization);
    console.log("✅ Doctors returned:", doctors);
    res.json(doctors);
  } catch (err) {
    console.error("❌ Error fetching doctors:", err);
    res.status(500).json({ message: 'Failed to fetch doctors' });
  }
};

