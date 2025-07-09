import express from 'express';
import {
  bookAppointment,
  getSpecializations,
  getDoctorsBySpecialization,
} from '../controllers/appointmentController.js';

const router = express.Router();

router.post('/book', bookAppointment);

// New routes for frontend dropdowns
router.get('/specializations', getSpecializations);
router.get('/doctors/:specialization', getDoctorsBySpecialization);

export default router;
