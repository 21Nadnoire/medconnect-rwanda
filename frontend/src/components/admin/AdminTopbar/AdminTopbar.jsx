import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Updated import
import "./AdminTopbar.css";

const AdminTopbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isChangePasswordVisible, setIsChangePasswordVisible] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate(); // Updated hook

  const handleToggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setMessage("All fields are required.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("New password and confirm password do not match.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/change-password", {
        currentPassword,
        newPassword,
      });

      setMessage(response.data.message); // Assume backend sends success message
    } catch (error) {
      setMessage("Failed to change password.");
      console.error("Error changing password", error);
    }
  };

  const handleLogout = () => {
    // Clear any stored session data (e.g., token, user info)
    localStorage.removeItem("authToken"); // Assuming you are storing the token in localStorage

    // Redirect to the login page
    navigate("/login"); // Change this if your login route is different
  };

  return (
    <div className="admin-topbar d-flex justify-content-between align-items-center px-4 py-2 border-bottom bg-white shadow-sm">
      {/* Logo */}
      <div className="logo fw-bold fs-4">
  <span className="text-[#24306E]">Med</span>
  <span className="text-[#60A5FA]">Connect Rwanda</span>
</div>
      {/* Right section */}
      <div className="d-flex align-items-center position-relative">
        {/* Profile icon */}
        <img
          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
          alt="Profile"
          className="rounded-circle me-2"
          width="36"
          height="36"
        />

        {/* Admin name and dropdown */}
        <div className="dropdown">
          <button
            className="btn btn-sm btn-outline-secondary dropdown-toggle"
            onClick={handleToggleDropdown}
          >
            Admin
          </button>
          {showDropdown && (
            <ul className="dropdown-menu show mt-2" style={{ right: 0, left: "auto" }}>
              <li>
                <button
                  className="dropdown-item py-2 small"
                  onClick={() => setIsChangePasswordVisible(!isChangePasswordVisible)}
                >
                  Change Password
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item py-2 small text-danger"
                  onClick={handleLogout} // Trigger logout
                >
                  Logout
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>

      {/* Change Password Form */}
      {isChangePasswordVisible && (
        <div className="change-password-form mt-3">
          <div>
            <label htmlFor="currentPassword">Current Password</label>
            <input
              type="password"
              id="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="form-control"
            />
          </div>
          <div>
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="form-control"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="form-control"
            />
          </div>
          <button onClick={handleChangePassword} className="btn btn-primary mt-2">
            Change Password
          </button>
          {message && <div className="alert alert-info mt-2">{message}</div>}
        </div>
      )}
    </div>
  );
};

export default AdminTopbar;
