import React from "react";
import { useLocation } from "react-router-dom";
import "../styles/Topbar.css";

const sectionTitles = { home: "Home", overview: "Overview", reports: "Reports" };

function getSectionFromPath(pathname) {
  const segments = pathname.replace(/^\/dashboard\/?/, "").split("/").filter(Boolean);

  if (segments.length === 0) return "home";
  if (segments[0] === "overview") return "overview";
  if (segments[0] === "reports") return "reports";

  return "home";
}

function Topbar({ onToggleSidebar }) {
  const location = useLocation();
  const section = getSectionFromPath(location.pathname);

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="topbar-menu-btn" onClick={onToggleSidebar} aria-label="Toggle sidebar">
          <span /><span /><span />
        </button>
        <div className="topbar-breadcrumb">
          <span className="topbar-section">{sectionTitles[section]}</span>
        </div>
      </div>
      <div className="topbar-right">
        <div className="topbar-user">
          <div className="topbar-avatar">A</div>
          <div className="topbar-user-info">
            <span className="topbar-user-name">Admin User</span>
            <span className="topbar-user-role">Head Office</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Topbar;