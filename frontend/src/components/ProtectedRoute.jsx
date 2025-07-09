import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
  const token = localStorage.getItem('token');

  // If there's no token, redirect to the login page
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Decode the token to get user information (e.g., role)
  const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode the JWT payload
  const userRole = decodedToken.role;

  // Depending on the user's role, render the dashboard or redirect to an unauthorized page
  if (userRole === 'patient') {
    return <Outlet />; // Render Patient Dashboard if the user is a patient
  } else if (userRole === 'doctor') {
    return <Outlet />; // Render Doctor Dashboard if the user is a doctor
  } else if (userRole === 'admin') {
    return <Outlet />; // Render Admin Dashboard if the user is an admin
  } else {
    return <Navigate to="/" />; // Redirect if the role is unknown
  }
}
