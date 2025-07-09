import React, { useState, useEffect } from "react";
import axios from "axios";
import { useOutletContext } from "react-router-dom"; // 👈 here

const UserTable = () => {
  const { searchQuery } = useOutletContext(); // 👈 and here

  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    id: null,
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    phone: "",
  });

  useEffect(() => {
    axios.get("http://localhost:5000/api/admin/users")
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the users:", error);
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/admin/delete-user/${id}`)
      .then(() => {
        setUsers(users.filter(user => user.id !== id));
        alert("User deleted successfully!");
      })
      .catch(error => {
        console.error("Error deleting user:", error);
        alert("Failed to delete user.");
      });
  };

  const handleEdit = (user) => {
    setEditingUser(user.id);
    setFormData({
      id: user.id,
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      role: user.role || "",
      phone: user.phone || "",
    });
  };

  const handleInputChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    axios.put(`http://localhost:5000/api/admin/edit-user/${formData.id}`, formData)
      .then(() => {
        alert("User updated successfully!");
        setUsers(users.map(user => (user.id === formData.id ? formData : user)));
        setEditingUser(null);
      })
      .catch(err => {
        console.error("Error updating user:", err);
        alert("Failed to update user.");
      });
  };

  const filteredUsers = users.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    return (
      fullName.includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="container mt-4">
      <h2>User Management</h2>
      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              editingUser === user.id ? (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>
                    <select
                      className="form-control"
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Role</option>
                      <option value="patient">Patient</option>
                      <option value="doctor">Doctor</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td>
                    <button
                      onClick={handleSave}
                      className="btn btn-success btn-sm"
                      style={{ marginRight: "8px" }}
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingUser(null)}
                      className="btn btn-secondary btn-sm"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ) : (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button
                      onClick={() => handleEdit(user)}
                      className="btn btn-sm"
                      style={{ backgroundColor: '#1E90FF', color: 'white', marginRight: '8px' }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="btn btn-sm"
                      style={{ backgroundColor: '#003366', color: 'white' }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
