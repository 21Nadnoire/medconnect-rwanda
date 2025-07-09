import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Make sure this is set in your .env file
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach token to every request if available
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      console.log("✅ Token attached to request:", token);
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn("⚠️ No token found in localStorage");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Optional: Handle 401 responses globally
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("🚫 Unauthorized. Redirecting to login.");
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default API;
