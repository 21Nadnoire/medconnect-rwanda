import React from "react";
import { NavLink } from "react-router-dom";
import { FiHome, FiLogOut } from "react-icons/fi";
import {
  FaCalendarCheck,
  FaNotesMedical,
  FaUserMd,
  FaPrescriptionBottleAlt,
  FaBell,
} from "react-icons/fa";

const PatientSidebar = () => {
  return (
    <div
      className="d-flex flex-column vh-100 border-end"
      style={{ width: "260px", backgroundColor: "#24306E" }}
    >
      <div className="text-center fw-bold fs-4 py-3">
        <span style={{ color: "#00BFFF" }}>Med</span>
        <span style={{ color: "white" }}>Connect</span>
        <span style={{ color: "#FFD700" }}> Rwanda</span>
      </div>

      <nav className="nav flex-column px-3">
        <NavLink
          to="/patient-dashboard"
          className={({ isActive }) =>
            `nav-link d-flex align-items-center gap-2 px-3 py-2 rounded ${
              isActive ? "bg-light text-dark fw-semibold" : ""
            }`
          }
          style={({ isActive }) => ({
            textDecoration: "none",
            color: isActive ? "#000" : "#00BFFF",
          })}
        >
          <FiHome className="fs-5" />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/patient-dashboard/appointments" className="nav-link d-flex align-items-center gap-2 px-3 py-2 text-white">
          <FaCalendarCheck className="fs-5" />
          <span>Appointments</span>
        </NavLink>

        <NavLink to="/patient-dashboard/medical-records" className="nav-link d-flex align-items-center gap-2 px-3 py-2 text-white">
          <FaNotesMedical className="fs-5" />
          <span>Medical Records</span>
        </NavLink>

        <NavLink to="/patient-dashboard/doctors" className="nav-link d-flex align-items-center gap-2 px-3 py-2 text-white">
          <FaUserMd className="fs-5" />
          <span>Your Doctors</span>
        </NavLink>

        <NavLink to="/patient-dashboard/prescriptions" className="nav-link d-flex align-items-center gap-2 px-3 py-2 text-white">
          <FaPrescriptionBottleAlt className="fs-5" />
          <span>Prescriptions</span>
        </NavLink>

        <NavLink to="/patient-dashboard/notifications" className="nav-link d-flex align-items-center gap-2 px-3 py-2 text-white">
          <FaBell className="fs-5" />
          <span>Notifications</span>
        </NavLink>

        {/* Logout */}
        <div className="mt-auto">
          <NavLink
            to="/login"
            className="nav-link d-flex align-items-center gap-2 px-3 py-2 text-white"
          >
            <FiLogOut className="fs-5" />
            <span>Logout</span>
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default PatientSidebar;
