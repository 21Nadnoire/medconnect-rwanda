import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import App from './App';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import SignUp from './pages/signup';

import ProtectedRoute from './components/ProtectedRoute';
import BookAppointment from './components/Patient/BookAppointment'; // 👈 for logged-in users

import PatientDashboard from './pages/PatientDashboard/PatientDashboard';
import DoctorDashboard from './pages/DoctorDashboard/DoctorDashboard';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';

import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";

import ActivityLog from './components/admin/ActivityLog/ActivityLog';
import AdminSettings from './components/admin/AdminSettings/AdminSettings';
import Approvals from './pages/Approvals';
import SummaryCards from './components/admin/SummaryCards/SummaryCards';
import UserTable from './components/admin/UserTable/UserTable';
import AdminContentContainer from './components/admin/AdminContentContainer';

import AddDoctor from './components/admin/doctors/AddDoctor';
import ManageDoctors from './components/admin/doctors/ManageDoctors';
import DoctorSpecializations from './components/admin/doctors/DoctorSpecializations';
import DoctorMessaging from "./components/Doctor/DoctorMessaging";

import { AuthProvider } from './context/AuthContext'; // ✅ Import AuthProvider

import '@fortawesome/fontawesome-free/css/all.min.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider> {/* ✅ Wrap entire app in AuthProvider */}
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/landing-page" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:resetToken" element={<ResetPassword />} />


          {/* 🔐 Protected routes for authenticated users */}
          <Route element={<ProtectedRoute />}>
            <Route path="/patient-dashboard" element={<PatientDashboard />} />
            <Route path="/dashboard/patient/book-appointment" element={<BookAppointment />} />
            <Route path="/doctor-dashboard" element={<DoctorDashboard />} />

            <Route path="/admin-dashboard" element={<AdminDashboard />}>
              <Route index element={<AdminContentContainer />} />
              <Route path="summary-cards" element={<SummaryCards />} />
              <Route path="activity-log" element={<ActivityLog />} />
              <Route path="admin-settings" element={<AdminSettings />} />
              <Route path="approval-panel" element={<Approvals />} />
              <Route path="user-table" element={<UserTable />} />
              <Route path="add-doctor" element={<AddDoctor />} />
              <Route path="manage-doctors" element={<ManageDoctors />} />
              <Route path="doctor-specializations" element={<DoctorSpecializations />} />
            </Route>

            {/* ✅ Moved outside admin-dashboard */}
<Route path="/doctor-dashboard/messaging" element={<DoctorMessaging />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  </React.StrictMode>
);
