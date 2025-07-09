// SuperAdminDashboard.js
import React, { useState, useEffect } from 'react';
import { getPendingUsers, approveUser } from '../services/adminService'; // Service for fetching users and approving

function SuperAdminDashboard() {
    const [pendingUsers, setPendingUsers] = useState([]);

    useEffect(() => {
        const fetchPendingUsers = async () => {
            const users = await getPendingUsers();  // Fetch users with status 'pending'
            setPendingUsers(users);
        };
        fetchPendingUsers();
    }, []);

    const handleApprove = async (userId) => {
        await approveUser(userId);  // Call API to approve the user
        setPendingUsers(pendingUsers.filter(user => user.id !== userId));  // Remove the approved user from the list
    };

    return (
        <div>
            <h1>Pending Users</h1>
            <ul>
                {pendingUsers.map((user) => (
                    <li key={user.id}>
                        {user.firstName} {user.lastName} ({user.role})
                        <button onClick={() => handleApprove(user.id)}>Approve</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SuperAdminDashboard;
