import React, { useState } from "react";
import "../index.css";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext"; // Importing the AuthContext
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth(); // Access login function from AuthContext
  const navigate = useNavigate();

const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const data = await loginUser({ email, password });

    if (!data.token || !data.user) {
      throw new Error("Missing token or user in response");
    }

    // Save token to localStorage
    localStorage.setItem("token", data.token);
    console.log("Token saved:", data.token); // ✅ Debug log

    // Save user in AuthContext
    login(data.user);

    // Redirect based on role
    if (data.user.role === "patient") {
      navigate("/patient-dashboard");
    } else if (data.user.role === "doctor") {
      navigate("/doctor-dashboard");
    } else if (data.user.role === "admin") {
      navigate("/admin-dashboard");
    } else {
      console.warn("Unknown role:", data.user.role);
    }
  } catch (error) {
    console.error("Login failed", error);
    alert("Login failed. Please check your email and password.");
  }
};


  return (
    <div className="w-full h-screen bg-[#2D2D2D]">
      {/* Navbar */}
      <Navbar />

      {/* Main Box */}
      <div
        className="absolute bg-[#F8F7F7] border border-[#DCD7D7] rounded-[14px] flex"
        style={{
          boxSizing: "border-box",
          width: "1480px",
          height: "630px",
          left: "50px",
          top: "90px",
          position: "absolute",
        }}
      >
        {/* Left Side: Image */}
        <div className="w-[600px] flex justify-center items-center relative">
          {/* Background Gradient Box */}
          <div className="absolute left-[0px] top-[0px] w-full h-full bg-gradient-to-b from-[#24306E] to-[#4a189a] z-0"></div>

          {/* MedConnect Logo */}
          <div className="absolute top-[20px] left-[10px] text-[50px] font-bold">
            <span className="text-[#94A2EE]">Med</span>
            <span className="text-[#FFFFFF]">Connect</span> <span className="text-[#bbff00]">Rwanda</span>
          </div>

          {/* First Image */}
          <img 
            src="/images/signup.png"
            alt="Signup"
            className="absolute w-[320px] h-[429px] left-[0px] top-[200px] z-10"
          />

          {/* Second Image */}
          <img 
            src="/images/signup2.png"
            alt="Signup 2"
            className="absolute w-[500px] h-[479px] left-[220px] top-[150px] z-10"
          />
        </div>

        {/* Right Side: Form */}
        <div
          className="absolute bg-[#F8F7F7] border border-[#DCD7D7] rounded-[14px] p-6 shadow-md"
          style={{
            boxSizing: "border-box",
            width: "585px",
            height: "400px",
            left: "635px",
            top: "90px",
            position: "absolute",
          }}
        >
          <h1 className="text-l font-bold text-center mb-4 text-[#404040]">
            Log In to Your Account
          </h1>

          {/* Login Form */}
          <form className="grid grid-cols-1 gap-6" onSubmit={handleLogin}>
            {/* Email Address */}
            <div className="relative">
              <label className="block text-[#404040] font-medium text-[20px] leading-[30px]">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Your Email Address"
                className="w-full p-3 border-2 border-gray-300 rounded-md bg-[#F5F5F5] text-[#B0B0B0] text-[17.16px] leading-[26px] focus:ring-2 focus:ring-blue-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block text-[#404040] font-medium text-[20px] leading-[30px]">
                Password
              </label>
              <input
                type="password"
                placeholder="Your Password"
                className="w-full p-3 border-2 border-gray-300 rounded-md bg-[#F5F5F5] text-[#B0B0B0] text-[17.16px] leading-[26px] focus:ring-2 focus:ring-blue-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex justify-between items-center">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="w-4 h-4" />
                <span>Remember Me</span>
              </label>
              <a href="/forgot-password" className="text-[#24306E] hover:underline">
                Forgot Password?
              </a>
            </div>

            {/* Log In Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-[250px] bg-[#24306E] text-[#FFFFFF] py-3 rounded-md text-lg transition duration-300"
              >
                Log In
              </button>
            </div>

            {/* Don't Have an Account? Sign Up */}
            <div className="text-center">
              Don't have an account?{" "}
              <a href="/signup" className="text-[#24306E]">
                Sign Up
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
