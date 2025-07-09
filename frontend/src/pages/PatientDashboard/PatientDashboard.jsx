import React from "react";
import PatientSidebar from "../../components/Patient/PatientSidebar";
import PatientTopbar from "../../components/Patient/PatientTopbar";
import PatientDashboardMain from "../../components/Patient/PatientDashboardMain";

const PatientDashboard = ({ patient }) => {
  const name = patient?.firstName || "Patient";

  return (
    <div className="d-flex">
      <PatientSidebar />

      <div className="flex-grow-1">
        {/* Topbar */}
        <PatientTopbar patientName={name} />

        {/* Main Content */}
        <PatientDashboardMain />
      </div>
    </div>
  );
};

export default PatientDashboard;
