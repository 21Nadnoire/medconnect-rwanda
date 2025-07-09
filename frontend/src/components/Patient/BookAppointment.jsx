import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookAppointment = () => {
  const [formData, setFormData] = useState({
    specialization: '',
    doctorId: '',
    type: '',
    appointment_date: '',
    appointment_time: '',
    reason: '',
    name: '',
    email: '',
    phone: ''
  });

  const [specializations, setSpecializations] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Fetch specializations
  useEffect(() => {
    const fetchSpecializations = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/doctors/specializations');
        setSpecializations(res.data);
      } catch (err) {
        console.error('Failed to fetch specializations:', err);
      }
    };

    fetchSpecializations();
  }, []);

  // Fetch doctors based on specialization
  useEffect(() => {
    if (!formData.specialization) return;

    const fetchDoctors = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/appointments/doctors/${formData.specialization}`);
        setDoctors(res.data);
      } catch (err) {
        console.error('Failed to fetch doctors:', err);
      }
    };

    fetchDoctors();
  }, [formData.specialization]);

  // Fetch user profile on load
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { firstName, lastName, email, phone } = res.data;
        setFormData((prev) => ({
          ...prev,
          name: `${firstName} ${lastName}`,
          email,
          phone,
        }));
      } catch (err) {
        console.error('Failed to fetch user profile:', err);
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/appointments/book', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage('✅ Appointment booked successfully!');
      setFormData((prev) => ({
        ...prev,
        specialization: '',
        doctorId: '',
        type: '',
        appointment_date: '',
        appointment_time: '',
        reason: '',
      }));
      setDoctors([]);
    } catch (err) {
      console.error(err.response?.data || err.message);
      setMessage('❌ Failed to book appointment. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Book Appointment</h2>

      {message && (
        <div className="mb-4 text-center text-sm text-red-600 font-medium">{message}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Autofilled Name, Email, Phone */}
        <input
          type="text"
          name="name"
          value={formData.name}
          readOnly
          className="w-full p-2 border rounded bg-gray-100"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          readOnly
          className="w-full p-2 border rounded bg-gray-100"
        />
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          readOnly
          className="w-full p-2 border rounded bg-gray-100"
        />

        <select
          name="specialization"
          value={formData.specialization}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select Specialization</option>
          {specializations.map((spec, index) => (
            <option key={index} value={spec.specialization}>{spec.specialization}</option>
          ))}
        </select>

        <select
          name="doctorId"
          value={formData.doctorId}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select Doctor</option>
          {doctors.map((doc) => (
            <option key={doc.doctor_id} value={doc.doctor_id}>
              Dr. {doc.firstName} {doc.lastName}
            </option>
          ))}
        </select>

        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select type</option>
          <option value="Physical">Physical</option>
          <option value="Online">Online</option>
        </select>

        <input
          type="date"
          name="appointment_date"
          value={formData.appointment_date}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="time"
          name="appointment_time"
          value={formData.appointment_time}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <textarea
          name="reason"
          value={formData.reason}
          onChange={handleChange}
          placeholder="Reason for appointment"
          className="w-full p-2 border rounded"
          rows="3"
        ></textarea>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? 'Booking...' : 'Book Appointment'}
        </button>
      </form>
    </div>
  );
};

export default BookAppointment;
