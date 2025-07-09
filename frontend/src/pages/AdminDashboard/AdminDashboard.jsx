import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar/AdminSidebar";
import AdminTopbar from "../../components/admin/AdminTopbar/AdminTopbar";
import AdminDashboardContainer from "../../components/admin/AdminDashboardContainer";

const AdminDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main content area */}
      <div className="flex-1 flex flex-col bg-gray-100">
        {/* Topbar */}
        <AdminTopbar />

        {/* Admin Dashboard Container with search */}
        <AdminDashboardContainer
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Dynamic Content */}
        <div className="p-4">
          <Outlet context={{ searchQuery }} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
