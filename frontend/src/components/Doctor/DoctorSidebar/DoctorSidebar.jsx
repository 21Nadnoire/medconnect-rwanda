import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiHome, FiLogOut } from "react-icons/fi";
import {
  FaComments,
  FaUserFriends,
  FaBrain,
  FaFolderOpen,
  FaUsersCog,
  FaGraduationCap,
  FaFlask,
  FaCalendarAlt,
  FaPills,
  FaNewspaper,
  FaAmbulance,
} from "react-icons/fa";

const DoctorSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear session or auth data
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");

    // Navigate to login
    navigate("/login");
  };

  return (
    <div
      className="d-flex flex-column vh-100 border-end"
      style={{ width: "280px", backgroundColor: "#24306E" }}
    >
      <div className="text-center fw-bold fs-4 py-3">
        <span style={{ color: "#00BFFF" }}>Med</span>
        <span style={{ color: "white" }}>Connect</span>
        <span style={{ color: "#FFD700" }}> Rwanda</span>
      </div>

      <nav className="nav flex-column px-3">
        <NavLink
          to="/doctor-dashboard"
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

        <NavLink to="/doctor-dashboard/messaging" className="nav-link d-flex align-items-center gap-2 px-3 py-2 text-white">
          <FaComments className="fs-5" />
          <span>Messaging & Communication</span>
        </NavLink>

        <NavLink to="/doctor-dashboard/patient-collaboration" className="nav-link d-flex align-items-center gap-2 px-3 py-2 text-white">
          <FaUserFriends className="fs-5" />
          <span>Patient Case Collaboration Hub</span>
        </NavLink>

        <NavLink to="/doctor-dashboard/clinical-support" className="nav-link d-flex align-items-center gap-2 px-3 py-2 text-white">
          <FaBrain className="fs-5" />
          <span>Clinical Decision Support</span>
        </NavLink>

        <NavLink to="/doctor-dashboard/medical-records" className="nav-link d-flex align-items-center gap-2 px-3 py-2 text-white">
          <FaFolderOpen className="fs-5" />
          <span>Medical Records Management</span>
        </NavLink>

        <NavLink to="/doctor-dashboard/discussion-forums" className="nav-link d-flex align-items-center gap-2 px-3 py-2 text-white">
          <FaUsersCog className="fs-5" />
          <span>Case Discussion Forums</span>
        </NavLink>

        <NavLink to="/doctor-dashboard/cme" className="nav-link d-flex align-items-center gap-2 px-3 py-2 text-white">
          <FaGraduationCap className="fs-5" />
          <span>Continuing Medical Education</span>
        </NavLink>

        <NavLink to="/doctor-dashboard/research" className="nav-link d-flex align-items-center gap-2 px-3 py-2 text-white">
          <FaFlask className="fs-5" />
          <span>Collaborative Research</span>
        </NavLink>

        <NavLink to="/doctor-dashboard/events" className="nav-link d-flex align-items-center gap-2 px-3 py-2 text-white">
          <FaCalendarAlt className="fs-5" />
          <span>Event Management</span>
        </NavLink>

        <NavLink to="/doctor-dashboard/prescriptions" className="nav-link d-flex align-items-center gap-2 px-3 py-2 text-white">
          <FaPills className="fs-5" />
          <span>Prescription Management</span>
        </NavLink>

        <NavLink to="/doctor-dashboard/news" className="nav-link d-flex align-items-center gap-2 px-3 py-2 text-white">
          <FaNewspaper className="fs-5" />
          <span>Community News Feed</span>
        </NavLink>

        <NavLink to="/doctor-dashboard/emergency" className="nav-link d-flex align-items-center gap-2 px-3 py-2 text-white">
          <FaAmbulance className="fs-5" />
          <span>Emergency Response</span>
        </NavLink>

        {/* Logout Button at the Bottom */}
        <div className="mt-auto">
          <button
            onClick={handleLogout}
            className="nav-link d-flex align-items-center gap-2 px-3 py-2 text-white btn btn-link text-start"
            style={{ textDecoration: "none" }}
          >
            <FiLogOut className="fs-5" />
            <span>Logout</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default DoctorSidebar;
