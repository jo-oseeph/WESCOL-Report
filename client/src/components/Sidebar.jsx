import React from "react";
import "../styles/Sidebar.css";

const navItems = [
  { key: "home", label: "Home" },
  { key: "overview", label: "Overview" },
  { key: "reports", label: "Reports" },
];

function Sidebar({ activeSection, onSelectSection, className = "" }) {
  return (
    <aside className={"sidebar " + className}>
      <div className="sidebar-brand">
        <div className="sidebar-logo">WK</div>
        <div className="sidebar-brand-text">
          <span className="sidebar-product">WEKSCOL Report</span>
          <span className="sidebar-org">West Kenya Sugar Co.</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <span className="sidebar-nav-label">Menu</span>
        <ul>
          {navItems.map((item) => (
            <li key={item.key}>
              <button
                className={
                  "sidebar-nav-item" +
                  (activeSection === item.key ? " sidebar-nav-item-active" : "")
                }
                onClick={() => onSelectSection(item.key)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <span className="sidebar-footer-text">Reporting Prototype v0.1</span>
      </div>
    </aside>
  );
}

export default Sidebar;
