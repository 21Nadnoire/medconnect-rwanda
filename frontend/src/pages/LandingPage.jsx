import React from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";
import Navbar from "../components/Navbar";

function LandingPage() {
  const navigate = useNavigate();

  const handleBookAppointment = () => {
    navigate("/book-appointment"); // ✅ This should match the route in your index.js
  };

  return (
    <div
      className="w-full h-screen bg-cover bg-top"
      style={{ backgroundImage: "url(/images/background.png)" }}
    >
      {/* Navbar */}
      <Navbar />

      <div className="relative">
        {/* Overlay with Buttons */}
        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-end items-end p-8">
          <div className="space-y-4 mr-10">
            {/* Button for Well Qualified Doctors */}
            <button
              className="bg-blue-500 text-white rounded-md text-xl transition duration-300"
              style={{
                position: "absolute",
                width: "323.12px",
                height: "68.62px",
                left: "1250px",
                top: "485px",
              }}
            >
              Well Qualified Doctors
              <br />
              Treat with care
            </button>

            {/* ✅ Button for Book an Appointment */}
            <button
              onClick={handleBookAppointment} // ← Add this line
              className="bg-blue-500 text-white rounded-md text-xl hover:bg-blue-700 transition duration-300"
              style={{
                position: "absolute",
                width: "323.12px",
                height: "68.62px",
                left: "1250px",
                top: "565px",
                background: "#24306E",
              }}
            >
              Book an Appointment
            </button>
          </div>
        </div>

        <p className="absolute left-[300px] top-[660px]">
          Good health is the state of mental, physical and social well being
          and it does not just mean absence of diseases.
        </p>
      </div>
    </div>
  );
}

export default LandingPage;
