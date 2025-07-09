import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DoctorSpecializations = () => {
  const [specializations, setSpecializations] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingSpecialization, setEditingSpecialization] = useState('');

  // Fetch specializations
  useEffect(() => {
    fetchSpecializations();
  }, []);

  const fetchSpecializations = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/doctors');  // Adjust endpoint if needed
      console.log('Fetched specializations:', response.data);
      setSpecializations(response.data);
    } catch (error) {
      console.error('Error fetching specializations:', error);
    }
  };

  // Start editing specialization
  const startEditing = (id, specialization) => {
    setEditingId(id);
    setEditingSpecialization(specialization);
  };

  // Save the edited specialization
  const handleSaveEdit = async () => {
    try {
      await axios.put(`http://localhost:5000/api/admin/edit-specialization/${editingId}`, { specialization: editingSpecialization });
      setEditingId(null);
      setEditingSpecialization('');
      fetchSpecializations();  // Reload the list after save
    } catch (error) {
      console.error('Error saving specialization:', error);
    }
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingSpecialization('');
  };

  // Delete specialization
  const handleDeleteSpecialization = async (doctorId) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/delete-specialization/${doctorId}`);
      fetchSpecializations();  // Reload the list after deletion
    } catch (error) {
      console.error('Error deleting specialization:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Doctor Specializations</h3>

      {/* Specializations List */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Specialization Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {specializations.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center">No specializations available</td>
            </tr>
          ) : (
            specializations.map((spec, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  {editingId === spec.id ? (
                    <input
                      type="text"
                      value={editingSpecialization}
                      className="form-control"
                      onChange={(e) => setEditingSpecialization(e.target.value)}
                    />
                  ) : (
                    spec.specialization // Assuming each specialization object has a field "specialization"
                  )}
                </td>
                <td>
                  {editingId === spec.id ? (
                    <>
                      <button className="btn btn-success btn-sm me-2" onClick={handleSaveEdit}>Save</button>
                      <button className="btn btn-secondary btn-sm" onClick={handleCancelEdit}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button className="btn btn-warning btn-sm me-2" onClick={() => startEditing(spec.id, spec.specialization)}>Edit</button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDeleteSpecialization(spec.id)}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorSpecializations;
