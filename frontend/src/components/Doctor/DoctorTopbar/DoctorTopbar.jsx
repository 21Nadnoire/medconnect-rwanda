import React from "react";
import { FiSearch, FiBell } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";

const DoctorTopbar = ({ doctor }) => {
  const profileImage = doctor?.photoURL;

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow px-4 py-2">
      <div className="container-fluid d-flex justify-content-between align-items-center w-100">
        {/* Left: Welcome & Telemedicine Button */}
        <div className="d-flex align-items-center gap-3">
          <h5 className="mb-0 fw-semibold" style={{ color: "#0b3c5d" }}>
            Welcome, Dr. {doctor?.firstName || "YourName"}
          </h5>
          <button
            className="btn btn-sm rounded-pill text-white"
            style={{ backgroundColor: "#0b3c5d" }}
          >
            Start Telemedicine
          </button>
        </div>

        {/* Right: Search, Bell, Avatar */}
        <div className="d-flex align-items-center gap-3">
          <div className="position-relative">
            <input
              type="text"
              className="form-control form-control-sm ps-4 rounded-pill"
              placeholder="Search..."
              style={{ width: "180px" }}
            />
            <FiSearch
              className="position-absolute top-50 start-0 translate-middle-y ms-2"
              style={{ color: "#0b3c5d" }}
            />
          </div>

          <FiBell style={{ color: "#0b3c5d", fontSize: "1.25rem", cursor: "pointer" }} />

          {profileImage ? (
            <img
              src={profileImage}
              alt="Doctor Avatar"
              className="rounded-circle"
              style={{ width: "32px", height: "32px", objectFit: "cover", cursor: "pointer" }}
            />
          ) : (
            <div
              className="rounded-circle d-flex align-items-center justify-content-center"
              style={{
                width: "32px",
                height: "32px",
                backgroundColor: "#0b3c5d",
                cursor: "pointer",
              }}
            >
              <FaUserCircle className="text-white fs-5" />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default DoctorTopbar;
