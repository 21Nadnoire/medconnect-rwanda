import React from "react";
import { FaBell, FaUserCircle, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const PatientTopbar = ({ patientName }) => {
  const navigate = useNavigate();

  const handleBookAppointment = () => {
    navigate("/dashboard/patient/book-appointment");
  };

  return (
    <div className="d-flex justify-content-between align-items-center px-4 py-2 border-bottom bg-white shadow-sm" style={{ height: "60px" }}>
      {/* Welcome message */}
      <h5 className="mb-0 fw-semibold text-primary">Welcome, {patientName}!</h5>

      {/* Right section: search + icons + book appointment */}
      <div className="d-flex align-items-center gap-3">
        {/* Search */}
        <div className="position-relative">
          <FaSearch className="position-absolute top-50 start-0 translate-middle-y ms-2 text-muted" />
          <input
            type="text"
            placeholder="Search..."
            className="form-control ps-5"
            style={{ height: "35px", width: "220px", fontSize: "0.9rem" }}
          />
        </div>

        {/* Book Appointment Button */}
        <button
          className="btn btn-primary btn-sm"
          style={{ fontSize: "0.85rem", padding: "5px 12px" }}
          onClick={handleBookAppointment}
        >
          Book Appointment
        </button>

        {/* Notification Icon */}
        <FaBell size={20} className="text-primary cursor-pointer" />

        {/* Profile Icon */}
        <FaUserCircle size={24} className="text-secondary cursor-pointer" />
      </div>
    </div>
  );
};

export default PatientTopbar;
