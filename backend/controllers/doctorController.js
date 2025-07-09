import Doctor from '../models/doctor.js';

const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.getAll();
    res.json(doctors);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving doctors');
  }
};

const getDoctorsBySpecialization = async (req, res) => {
  try {
    const { specialization } = req.query;
    if (!specialization) {
      return res.status(400).json({ message: "Specialization is required" });
    }

    const doctors = await Doctor.getBySpecialization(specialization);
    res.json(doctors);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving doctors by specialization');
  }
};

const createDoctor = async (req, res) => {
  try {
    const newDoctor = await Doctor.create(req.body);
    res.status(201).json(newDoctor);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating doctor');
  }
};

const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.getById(req.params.id);
    if (!doctor) return res.status(404).send('Doctor not found');
    res.json(doctor);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving doctor');
  }
};

const updateDoctor = async (req, res) => {
  try {
    const updatedDoctor = await Doctor.update(req.params.id, req.body);
    if (!updatedDoctor.affectedRows) return res.status(404).send('Doctor not found');
    res.json(updatedDoctor);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating doctor');
  }
};

const deleteDoctor = async (req, res) => {
  try {
    const deletedDoctor = await Doctor.delete(req.params.id);
    if (!deletedDoctor.affectedRows) return res.status(404).send('Doctor not found');
    res.json(deletedDoctor);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting doctor');
  }
};

export {
  getAllDoctors,
  getDoctorsBySpecialization, // <- Exporting the new function
  createDoctor,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
};
