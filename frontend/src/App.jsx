import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Services from "./pages/Services";
import Doctors from "./pages/Doctors";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import SignUp from "./pages/signup";

const App = () => {
  return (
    <Routes>
      {/* Main Route for Landing Page */}
      <Route path="/" element={<LandingPage />} />
      
      {/* Other Routes */}
      <Route path="services" element={<Services />} />
      <Route path="doctors" element={<Doctors />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="Login" element={<Login />} />
      <Route path="signup" element={<SignUp />} />
      
      {/* Catch-all Route */}
      <Route path="*" element={<LandingPage />} />
    </Routes>
  );
};

export default App;