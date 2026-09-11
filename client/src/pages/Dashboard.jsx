import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import Topbar from "../components/Topbar.jsx";
import "../styles/Dashboard.css";

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="dashboard">
      <Sidebar
        className={sidebarOpen ? "sidebar-open" : ""}
        onNavigate={() => setSidebarOpen(false)}
      />
      {sidebarOpen && (
        <div className="dashboard-overlay" onClick={() => setSidebarOpen(false)} />
      )}
      <div className="dashboard-body">
        <Topbar onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />
        <main className="dashboard-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Dashboard;