// services/adminService.js
import axios from 'axios';

// Fetch users with pending status
export const getPendingUsers = async () => {
    try {
        const response = await axios.get('/api/users/pending'); // Fetch pending users
        return response.data;
    } catch (error) {
        console.error("Error fetching pending users", error);
        return [];
    }
};

// Approve a user
export const approveUser = async (userId) => {
    try {
        const response = await axios.put(`/api/approve-user/${userId}`, { loggedInUserRole: 'super-admin' });
        return response.data;
    } catch (error) {
        console.error("Error approving user", error);
    }
};
