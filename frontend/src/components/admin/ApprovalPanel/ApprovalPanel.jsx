import React, { useState, useEffect } from "react";
import axios from "axios";

const ApprovalPanel = () => {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPendingUsers = async () => {
      try {
        const response = await axios.get("/api/admin/pending-users");
        if (Array.isArray(response.data)) {
          setPendingUsers(response.data);
        } else {
          setError("Failed to fetch pending users: Invalid data format");
        }
      } catch (err) {
        console.error("Error fetching pending users:", err);
        setError("Error fetching pending users");
      }
    };
    fetchPendingUsers();
  }, []);

  const approveUser = async (userId) => {
    try {
      await axios.put(`/api/admin/approve-user/${userId}`);
      setPendingUsers(pendingUsers.filter((user) => user.id !== userId));
    } catch (err) {
      console.error("Error approving user:", err);
    }
  };

  return (
    <div className="approval-panel">
      <h2>Approval Panel</h2>
      {error && <p className="error">{error}</p>}
      {pendingUsers.length === 0 ? (
        <p>No pending users.</p>
      ) : (
        <ul>
          {pendingUsers.map((user) => (
            <li key={user.id}>
              <p>{user.firstName} {user.lastName}</p> {/* Adjusted to show first and last name */}
              <button onClick={() => approveUser(user.id)}>Approve</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ApprovalPanel;
