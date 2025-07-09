import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
  const { resetToken } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5000/api/auth/reset-password/${resetToken}`,
        { password, confirmPassword }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Error resetting password");
    }
  };

  return (
    <div className=" flex items-center justify-center bg-gradient-to-br from-[#87CEEB] to-[#00008B]"
    style={{
        boxSizing: "border-box",
        width: "585px",
        height: "460px",
        left: "535px",
        top: "90px",
        position: "absolute",
      }}
      >
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md space-y-[10px]">
      <h2 className="text-2xl font-bold text-[#FFFF] text-center mb-4">Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Enter new password"
        />
        </div>
        <div>
        <input
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          placeholder="Confirm new password"
        />
        </div>
        <div className=" flex justify-center">
        <button type="submit">Reset Password</button>
        </div>
      </form>
      {message && (
  <div className="text-center mt-4">
    <p>{message}</p>
    {message === "Password has been reset successfully" && (
      <a
        href="/login"
        className="text-blue-600 underline hover:text-blue-800 transition"
      >
        Go to Login
      </a>
    )}
  </div>
)}

    </div>
    </div>
  );
};

export default ResetPassword;
