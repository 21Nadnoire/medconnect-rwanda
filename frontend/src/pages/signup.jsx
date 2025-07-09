import React, { useState } from "react";
import "../index.css";
import Navbar from "../components/Navbar";

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("patient");
  const [specialization, setSpecialization] = useState("");
  const [licenseNo, setLicenseNo] = useState("");
  const [experience, setExperience] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false); // Added state for terms checkbox

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
      setErrorMessage("All fields are required.");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    if (!acceptedTerms) {
      setErrorMessage("You must accept the terms and conditions.");
      return;
    }

    const userData = {
      firstName,
      lastName,
      email,
      phone,
      password,
      confirmPassword,
      role,
      specialization: role === "doctor" ? specialization : "",
      licenseNo: role === "doctor" ? licenseNo : "",
      experience: role === "doctor" ? experience : "",
    };

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccessMessage(data.message || "User registered successfully!");
      } else {
        setErrorMessage(data.message || "Something went wrong.");
      }
    } catch (error) {
      setErrorMessage("Server error. Please try again later.");
    }
  };

  return (
    <div className="w-full h-screen bg-[#2D2D2D]">
      <Navbar />

      <div
        className="absolute bg-[#F8F7F7] border border-[#DCD7D7] rounded-[14px] flex"
        style={{
          width: "1480px",
          height: "630px",
          left: "50px",
          top: "90px",
          position: "absolute",
        }}
      >
        {/* Left Side: Image */}
        <div className="w-[600px] flex justify-center items-center relative">
          <div className="absolute left-[0px] top-[0px] w-full h-full bg-gradient-to-b from-[#24306E] to-[#4a189a] z-0"></div>
          <div className="absolute top-[20px] left-[10px] text-[50px] font-bold">
            <span className="text-[#94A2EE]">Med</span>
            <span className="text-[#FFFFFF]">Connect</span>{" "}
            <span className="text-[#bbff00]">Rwanda</span>
          </div>
          <img
            src="/images/signup.png"
            alt="Signup"
            className="absolute w-[320px] h-[429px] left-[0px] top-[200px] z-10"
          />
          <img
            src="/images/signup2.png"
            alt="Signup 2"
            className="absolute w-[500px] h-[479px] left-[220px] top-[150px] z-10"
          />
        </div>

        {/* Right Side: Form */}
        <div
          className="absolute bg-[#F8F7F7] border border-[#DCD7D7] rounded-[14px] p-4 shadow-md overflow-y-auto"
          style={{
            width: "585px",
            height: "500px",
            left: "635px",
            top: "90px",
            position: "absolute",
            zIndex: 50, // Ensure form is on top
          }}
        >
          <h1 className="text-xl font-bold text-center mb-2 text-[#404040]">
            Sign Up For Account
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-2 text-sm">
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded bg-[#F5F5F5]"
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded bg-[#F5F5F5]"
              />
            </div>

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded bg-[#F5F5F5]"
            />

            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded bg-[#F5F5F5]"
            />

            <div className="flex gap-4">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded bg-[#F5F5F5]"
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded bg-[#F5F5F5]"
              />
            </div>

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded bg-[#F5F5F5]"
            >
              <option value="patient">Patient (default)</option>
              <option value="doctor">Doctor</option>
              <option value="admin">Admin</option>
            </select>

            {role === "doctor" && (
              <>
                <input
                  type="text"
                  placeholder="Specialization"
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded bg-[#F5F5F5]"
                />
                <div className="flex gap-4">
                  <input
                    type="text"
                    placeholder="License Number"
                    value={licenseNo}
                    onChange={(e) => setLicenseNo(e.target.value)}
                    className="flex-1 p-2 border border-gray-300 rounded bg-[#F5F5F5]"
                  />
                  <input
                    type="number"
                    placeholder="Years of Experience"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="flex-1 p-2 border border-gray-300 rounded bg-[#F5F5F5]"
                  />
                </div>
              </>
            )}

            {/* Terms and Conditions Checkbox */}
            <div className="flex items-center space-x-2 mt-2">
              <input
                type="checkbox"
                id="terms"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="w-4 h-4 accent-[#24306E]"
              />
              <label htmlFor="terms" className="text-xs text-gray-600 cursor-pointer">
                Accept all terms and conditions
              </label>
            </div>

            <button
              type="submit"
              className="bg-[#24306E] text-white py-2 rounded-md mt-1"
            >
              Sign Up
            </button>

            {errorMessage && (
              <div className="text-red-600 text-center">{errorMessage}</div>
            )}
            {successMessage && (
              <div className="text-green-600 text-center">{successMessage}</div>
            )}

            <div className="text-center text-gray-600 text-xs mt-1">
              Already have an account?{" "}
              <a href="/login" className="text-[#24306E] hover:underline">
                Login
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
