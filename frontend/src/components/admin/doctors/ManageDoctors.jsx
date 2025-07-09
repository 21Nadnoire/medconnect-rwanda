import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManageDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState(null);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    specialization: '',
    license_no: '',
    experience: '',
  });

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/doctors');
      setDoctors(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch doctors');
    }
  };

  const handleDelete = async (doctorId) => {
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      try {
        await axios.delete(`http://localhost:5000/api/admin/delete-doctor/${doctorId}`);
        setDoctors(prev => prev.filter(doc => doc.id !== doctorId));
      } catch (err) {
        console.error(err);
        alert('Failed to delete doctor');
      }
    }
  };

  const handleEditClick = (doctor) => {
    setEditingDoctor(doctor.id);
    setFormData({
      name: doctor.name,
      email: doctor.email,
      phone: doctor.phone,
      specialization: doctor.specialization,
      license_no: doctor.license_no,
      experience: doctor.experience,
    });
  };

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/admin/edit-doctor/${editingDoctor}`, formData);
      setEditingDoctor(null);
      fetchDoctors();
    } catch (err) {
      console.error(err);
      alert('Failed to update doctor');
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">Manage Doctors</h4>
        </div>
        <div className="card-body">
          {error && <div className="alert alert-danger">{error}</div>}

          <table className="table table-bordered table-striped">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Specialization</th>
                <th>License No</th>
                <th>Experience (yrs)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {doctors.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center">No doctors found.</td>
                </tr>
              ) : (
                doctors.map((doc, index) => (
                  <tr key={doc.id}>
                    <td>{index + 1}</td>
                    <td>
                      {editingDoctor === doc.id ? (
                        <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="form-control" />
                      ) : (
                        doc.name
                      )}
                    </td>
                    <td>
                      {editingDoctor === doc.id ? (
                        <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="form-control" />
                      ) : (
                        doc.email
                      )}
                    </td>
                    <td>
                      {editingDoctor === doc.id ? (
                        <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} className="form-control" />
                      ) : (
                        doc.phone
                      )}
                    </td>
                    <td>
                      {editingDoctor === doc.id ? (
                        <input type="text" name="specialization" value={formData.specialization} onChange={handleInputChange} className="form-control" />
                      ) : (
                        doc.specialization
                      )}
                    </td>
                    <td>
                      {editingDoctor === doc.id ? (
                        <input type="text" name="license_no" value={formData.license_no} onChange={handleInputChange} className="form-control" />
                      ) : (
                        doc.license_no
                      )}
                    </td>
                    <td>
                      {editingDoctor === doc.id ? (
                        <input type="number" name="experience" value={formData.experience} onChange={handleInputChange} className="form-control" />
                      ) : (
                        doc.experience
                      )}
                    </td>
                    <td>
                      {editingDoctor === doc.id ? (
                        <>
                          <button className="btn btn-sm btn-success me-2" onClick={handleUpdate}>Save</button>
                          <button className="btn btn-sm btn-secondary" onClick={() => setEditingDoctor(null)}>Cancel</button>
                        </>
                      ) : (
                        <>
                          <button className="btn btn-sm btn-warning me-2" onClick={() => handleEditClick(doc)}>Edit</button>
                          <button className="btn btn-sm btn-danger" onClick={() => handleDelete(doc.id)}>Delete</button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageDoctors;
