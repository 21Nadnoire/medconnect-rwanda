import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Approvals = () => {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state

  console.log("✅ Approvals component rendered");

  // Fetch pending users from the backend
  useEffect(() => {
    console.log("🔄 Running useEffect to fetch pending users...");
    const fetchPendingUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/pending-users');
        console.log('✅ Full pending users response:', response);
        console.log('✅ Fetched pending users data:', response.data);

        if (!Array.isArray(response.data)) {
          throw new Error('Invalid data format');
        }

        setPendingUsers(response.data);
        setError(null);
      } catch (error) {
        console.error('❌ Error fetching pending users:', error);
        setError('Error fetching pending users. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPendingUsers();
  }, []);

  const handleApprove = async (userId) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/admin/approve-user/${userId}`);
      console.log('✅ User approved:', response.data);

      const newResponse = await axios.get('http://localhost:5000/api/admin/pending-users');
      console.log('🔄 Re-fetched pending users:', newResponse.data);
      setPendingUsers(newResponse.data);
      alert('User approved successfully');
    } catch (error) {
      console.error('❌ Error approving user:', error);
      alert('There was an error approving the user. Please try again.');
    }
  };

  const handleReject = async (userId) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/admin/reject-user/${userId}`);
      console.log('✅ User rejected:', response.data);

      const newResponse = await axios.get('http://localhost:5000/api/admin/pending-users');
      console.log('🔄 Re-fetched pending users:', newResponse.data);
      setPendingUsers(newResponse.data);
      alert('User rejected successfully');
    } catch (error) {
      console.error('❌ Error rejecting user:', error);
      alert('There was an error rejecting the user. Please try again.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">User Approvals</h1>

      {loading ? (
        <p>Loading pending users...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : pendingUsers.length === 0 ? (
        <p>No pending users to approve or reject.</p>
      ) : (
        <table className="table table-hover table-bordered">
  <thead className="table-dark">
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    {pendingUsers.map(user => (
      <tr key={user.id}>
        <td>{user.firstName} {user.lastName}</td>
        <td>{user.email}</td>
        <td>
          <div className="d-flex gap-2">
            <button
              onClick={() => handleApprove(user.id)}
              className="btn btn-success"
            >
              Approve
            </button>
            <button
              onClick={() => handleReject(user.id)}
              className="btn btn-danger"
            >
              Reject
            </button>
          </div>
        </td>
      </tr>
    ))}
  </tbody>
</table>

      )}
    </div>
  );
};

export default Approvals;
