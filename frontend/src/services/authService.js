import api from './api';

// Register User
export const registerUser = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    console.log('Register response:', response.data); // ✅ Debug
    return response.data;
  } catch (error) {
    console.error('Registration error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

// Login User
export const loginUser = async (userData) => {
  try {
    const response = await api.post('/auth/login', userData);
    
    const { token, user } = response.data || {};
    if (!token || !user) {
      throw new Error('Invalid response format: token or user missing');
    }

    console.log('Login response:', response.data); // ✅ Debug
    return { token, user };
  } catch (error) {
    console.error('Login error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};
