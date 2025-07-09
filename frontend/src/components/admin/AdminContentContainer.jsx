import React from "react";
import { NavLink } from "react-router-dom";

const AdminContentContainer = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Cards */}
      <div className="flex flex-wrap justify-center gap-6 p-6">
        <NavLink to="/admin-dashboard/summary-cards" className="card-link">
          <div className="card p-4 text-center shadow-sm" style={{ width: "400px", height: "170px" }}>
            <i className="bi bi-bar-chart-fill text-primary fs-1 mb-2"></i>
            <div>Summary Cards</div>
          </div>
        </NavLink>

        <NavLink to="/admin-dashboard/activity-log" className="card-link">
          <div className="card p-4 text-center shadow-sm" style={{ width: "400px", height: "170px" }}>
            <i className="bi bi-clipboard-check-fill text-primary fs-1 mb-2"></i>
            <div>Activity Logs</div>
          </div>
        </NavLink>

        <NavLink to="/admin-dashboard/appointments" className="card-link">
          <div className="card p-4 text-center shadow-sm" style={{ width: "400px", height: "170px" }}>
            <i className="bi bi-calendar-event-fill text-primary fs-1 mb-2"></i>
            <div>Appointments</div>
          </div>
        </NavLink>

        <NavLink to="/admin-dashboard/rms" className="card-link">
          <div className="card p-4 text-center shadow-sm" style={{ width: "400px", height: "170px" }}>
            <i className="bi bi-hdd-network-fill text-primary fs-1 mb-2"></i>
            <div>RMS</div>
          </div>
        </NavLink>

        {/* New Manage Doctors Card */}
        <NavLink to="/admin-dashboard/user-table" className="card-link">
          <div className="card p-4 text-center shadow-sm" style={{ width: "400px", height: "170px" }}>
            <i className="bi bi-person-badge-fill text-primary fs-1 mb-2"></i>
            <div>Manage Users</div>
          </div>
        </NavLink>
      </div>

      {/* Footer */}
      <footer className="text-center text-gray-400 py-4 mt-auto">
        MedConnect Rwanda
      </footer>
    </div>
  );
};

export default AdminContentContainer;
