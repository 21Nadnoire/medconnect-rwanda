import { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/auth/forgot-password", { email });
      setMessage(response.data.message);
    } catch (error) {
      setError(error.response?.data?.message || "Error sending email");
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
        {/* Card Header */}
        <h2 className="text-2xl font-bold text-gray-700 text-center mb-4">
          Forgot Password
        </h2>
        <p className="text-gray-700 text-center mb-6">
          Enter your email to receive a password reset link.
        </p>

        {/* Success or Error Messages */}
        {message && <p className="text-green-600 text-center bg-green-100 p-2 rounded-md mb-4">{message}</p>}
        {error && <p className="text-red-600 text-center bg-red-100 p-2 rounded-md mb-4">{error}</p>}

        {/* Forgot Password Form */}
        <form onSubmit={handleSubmit} className="space-y-[12px]">
          <div>
            <label className="block text-[#FFFF] font-medium text-[20px] leading-[30px]">Email Address</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
              className="w-[300px] p-3 border-2 border-gray-300 rounded-md bg-[#F5F5F5] text-[#B0B0B0] text-[17.16px] leading-[26px] focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Resend Button */}
          <div className=" flex justify-center">
              <button type="submit" className="w-[250px] bg-[#FFFF] text-[#24306E] py-2 rounded-md rounded-lg transition duration-300">
              Send Reset Link
              </button>
            </div>
        </form>

        {/* Go Back to Login */}
        <p className="mt-4 text-sm text-gray-500 text-center">
          Remembered your password?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
