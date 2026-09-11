import React, { useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import Topbar from "../components/Topbar.jsx";
import Home from "./Home.jsx";
import Overview from "./Overview.jsx";
import Reports from "./Reports.jsx";
import "../styles/Dashboard.css";

function Dashboard() {
  const [activeSection, setActiveSection] = useState("home");
  const [breadcrumb, setBreadcrumb] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function handleSelectSection(section) {
    setActiveSection(section);
    setBreadcrumb([]);
    setSidebarOpen(false);
  }

  function renderSection() {
    switch (activeSection) {
      case "overview":
        return <Overview />;
      case "reports":
        return <Reports onBreadcrumbChange={setBreadcrumb} />;
      case "home":
      default:
        return <Home onGoToReports={() => handleSelectSection("reports")} />;
    }
  }

  return (
    <div className="dashboard">
      <Sidebar
        activeSection={activeSection}
        onSelectSection={handleSelectSection}
        className={sidebarOpen ? "sidebar-open" : ""}
      />
      {sidebarOpen && (
        <div
          className="dashboard-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <div className="dashboard-body">
        <Topbar
          activeSection={activeSection}
          breadcrumb={breadcrumb}
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
        />
        <main className="dashboard-main">{renderSection()}</main>
      </div>
    </div>
  );
}

export default Dashboard;
