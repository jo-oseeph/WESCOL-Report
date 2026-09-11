import React from "react";
import "../styles/Topbar.css";

const sectionTitles = {
  home: "Home",
  overview: "Overview",
  reports: "Reports",
};

function Topbar({ activeSection, breadcrumb, onToggleSidebar }) {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <button
          className="topbar-menu-btn"
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
        >
          <span />
          <span />
          <span />
        </button>
        <div className="topbar-breadcrumb">
          <span className="topbar-section">{sectionTitles[activeSection]}</span>
          {breadcrumb && breadcrumb.length > 0 && (
            <span className="topbar-breadcrumb-trail">
              {breadcrumb.map((crumb, index) => (
                <React.Fragment key={index}>
                  <span className="topbar-breadcrumb-sep">/</span>
                  <span
                    className={
                      index === breadcrumb.length - 1
                        ? "topbar-breadcrumb-current"
                        : ""
                    }
                  >
                    {crumb}
                  </span>
                </React.Fragment>
              ))}
            </span>
          )}
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
