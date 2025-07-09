import React from 'react';

function Navbar() {
  return (
    <div className="absolute w-full h-[70px] left-0 top-0 bg-[#4a4a4a] bg-opacity-40"> {/* Lighter background color */}
      <nav className="absolute flex items-center justify-between w-full h-full px-12 ml-auto">
        
        {/* MedConnect Logo - 10px & Pushed Right */}
        <div className="text-[40px] font-extrabold tracking-wide ml-[80px] inline-block">
        <span className="text-[#94A2EE]">Med</span><span className="text-[#FFFFFF]">Connect</span>
      </div>

        {/* Navigation Links */}
        <ul id="navigation" className="absolute flex space-x-10 text-white top-[15px] left-[750px]">
          <li><a href="/services">Services</a></li>
          <li><a href="/doctors">Doctors</a></li>
          <li><a href="/about">About Us</a></li>
          <li><a href="/contact">Contact Us</a></li>
        </ul>

        {/* Login Button */}
        <div className="absolute left-[1300px] top-[18px] bg-[#24306E] rounded-[13px] px-6 py-2">
          <a href="/login" className="text-white text-lg">Login</a>
        </div>

        {/* Sign up Button */}
        <div className="absolute left-[1438px] top-[18px] border-2 border-white rounded-[13px] px-6 py-2">
          <a href="/signup" className="text-white text-lg">Sign up</a>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
