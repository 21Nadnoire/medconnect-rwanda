import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  FiHome,
  FiUsers,
  FiCheckCircle,
  FiSettings,
  FiBarChart2,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";
import {
  FaUserMd,
  FaUserInjured,
  FaClipboardList,
  FaHistory,
} from "react-icons/fa";

const AdminSidebar = () => {
  const location = useLocation();

  const [openDropdowns, setOpenDropdowns] = useState({
    doctors: true,
    users: true,
    patients: true,
    reports: true,
  });

  const toggleDropdown = (name) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <div className="d-flex flex-column vh-100 bg-white border-end" style={{ width: "280px" }}>
      <div className="text-center fw-bold fs-4 py-3" style={{ color: "#24306E" }}>
        Admin Panel
      </div>

      <nav className="nav flex-column px-3">
        <NavLink
          to="/admin-dashboard"
          className={({ isActive }) =>
            `nav-link d-flex align-items-center gap-2 px-3 py-2 rounded ${isActive ? "bg-light fw-semibold" : ""}`
          }
          style={{ textDecoration: "none", color: "#24306E" }}
        >
          <FiHome className="fs-5" />
          <span>Dashboard</span>
        </NavLink>

        {/* Users */}
        <div>
          <div
            onClick={() => toggleDropdown("users")}
            className="d-flex align-items-center justify-content-between px-3 py-2 rounded"
            style={{ cursor: "pointer", color: "#24306E" }}
          >
            <div className="d-flex align-items-center gap-2">
              <FiUsers className="fs-5" />
              <span>Users</span>
            </div>
            {openDropdowns.users ? <FiChevronUp /> : <FiChevronDown />}
          </div>

          {openDropdowns.users && (
            <div className="ms-4">
              <NavLink
                to="/admin-dashboard/user-table"
                className="nav-link py-1"
                style={{ color: "#24306E" }}
              >
                Manage Users
              </NavLink>
            </div>
          )}
        </div>

        {/* Doctors */}
        <div>
          <div
            onClick={() => toggleDropdown("doctors")}
            className="d-flex align-items-center justify-content-between px-3 py-2 rounded"
            style={{ cursor: "pointer", color: "#24306E" }}
          >
            <div className="d-flex align-items-center gap-2">
              <FaUserMd className="fs-5" />
              <span>Doctors</span>
            </div>
            {openDropdowns.doctors ? <FiChevronUp /> : <FiChevronDown />}
          </div>

          {openDropdowns.doctors && (
            <div className="ms-4">
              <NavLink to="/admin-dashboard/doctor-specializations" className="nav-link py-1" style={{ color: "#24306E" }}>
                Doctor Specializations
              </NavLink>
              <NavLink to="/admin-dashboard/add-doctor" className="nav-link py-1" style={{ color: "#24306E" }}>
                Add Doctor
              </NavLink>
              <NavLink to="/admin-dashboard/manage-doctors" className="nav-link py-1" style={{ color: "#24306E" }}>
                Manage Doctors
              </NavLink>
            </div>
          )}
        </div>

        {/* Patients */}
        <div>
          <div
            onClick={() => toggleDropdown("patients")}
            className="d-flex align-items-center justify-content-between px-3 py-2 rounded"
            style={{ cursor: "pointer", color: "#24306E" }}
          >
            <div className="d-flex align-items-center gap-2">
              <FaUserInjured className="fs-5" />
              <span>Patients</span>
            </div>
            {openDropdowns.patients ? <FiChevronUp /> : <FiChevronDown />}
          </div>

          {openDropdowns.patients && (
            <div className="ms-4">
              <NavLink
                to="/admin-dashboard/manage-patients"
                className="nav-link py-1"
                style={{ color: "#24306E" }}
              >
                Manage Patients
              </NavLink>
            </div>
          )}
        </div>

        {/* Appointment History */}
        <NavLink
          to="/admin-dashboard/appointments"
          className={({ isActive }) =>
            `nav-link d-flex align-items-center gap-2 px-3 py-2 rounded ${isActive ? "bg-light fw-semibold" : ""}`
          }
          style={{ textDecoration: "none", color: "#24306E" }}
        >
          <FaHistory className="fs-5" />
          <span>Appointment History</span>
        </NavLink>

        {/* Session Logs */}
        <NavLink
          to="/admin-dashboard/doctor-logs"
          className={({ isActive }) =>
            `nav-link d-flex align-items-center gap-2 px-3 py-2 rounded ${isActive ? "bg-light fw-semibold" : ""}`
          }
          style={{ textDecoration: "none", color: "#24306E" }}
        >
          <FaClipboardList className="fs-5" />
          <span>Doctor Session Logs</span>
        </NavLink>

        <NavLink
          to="/admin-dashboard/user-logs"
          className={({ isActive }) =>
            `nav-link d-flex align-items-center gap-2 px-3 py-2 rounded ${isActive ? "bg-light fw-semibold" : ""}`
          }
          style={{ textDecoration: "none", color: "#24306E" }}
        >
          <FaClipboardList className="fs-5" />
          <span>User Session Logs</span>
        </NavLink>

        {/* Approvals */}
        <NavLink
          to="/admin-dashboard/approval-panel"
          className={({ isActive }) =>
            `nav-link d-flex align-items-center gap-2 px-3 py-2 rounded ${isActive ? "bg-light fw-semibold" : ""}`
          }
          style={{ textDecoration: "none", color: "#24306E" }}
        >
          <FiCheckCircle className="fs-5" />
          <span>Approvals</span>
        </NavLink>

        {/* Reports */}
        <div>
          <div
            onClick={() => toggleDropdown("reports")}
            className="d-flex align-items-center justify-content-between px-3 py-2 rounded"
            style={{ cursor: "pointer", color: "#24306E" }}
          >
            <div className="d-flex align-items-center gap-2">
              <FiBarChart2 className="fs-5" />
              <span>Reports</span>
            </div>
            {openDropdowns.reports ? <FiChevronUp /> : <FiChevronDown />}
          </div>

          {openDropdowns.reports && (
            <div className="ms-4">
              <NavLink
                to="/admin-dashboard/report-between-dates"
                className="nav-link py-1"
                style={{ color: "#24306E" }}
              >
                B/w Dates Report
              </NavLink>
            </div>
          )}
        </div>

        {/* Settings */}
        <NavLink
          to="/admin-dashboard/admin-settings"
          className={({ isActive }) =>
            `nav-link d-flex align-items-center gap-2 px-3 py-2 rounded ${isActive ? "bg-light fw-semibold" : ""}`
          }
          style={{ textDecoration: "none", color: "#24306E" }}
        >
          <FiSettings className="fs-5" />
          <span>Settings</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default AdminSidebar;
