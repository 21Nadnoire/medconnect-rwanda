import React, { useState, useEffect } from "react";
import axios from "axios";
import DoctorSidebar from "../../components/Doctor/DoctorSidebar/DoctorSidebar";
import DoctorTopbar from "../../components/Doctor/DoctorTopbar/DoctorTopbar";
import DoctorDashboardMain from "../../pages/DoctorDashboard/DoctorDashboardMain"; // ✅ Import it

const DoctorDashboard = () => {
  const [doctorInfo, setDoctorInfo] = useState(null);

  useEffect(() => {
    const fetchDoctorInfo = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/doctor-info", {
          withCredentials: true,
        });
        setDoctorInfo(response.data);
      } catch (error) {
        console.error("Error fetching doctor info:", error);
      }
    };

    fetchDoctorInfo();
  }, []);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <DoctorSidebar />

      {/* Main Area */}
      <div className="flex flex-col flex-grow">
        {/* Topbar */}
        <DoctorTopbar doctor={doctorInfo} />

        {/* Scrollable Content */}
        <div className="flex-grow overflow-y-auto bg-gray-100">
          {/* Dashboard Main Content */}
          <DoctorDashboardMain doctor={doctorInfo} />
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
