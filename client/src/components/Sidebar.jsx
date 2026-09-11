import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Sidebar.css";

const navItems = [
  { to: "/dashboard", label: "Home", end: true },
  { to: "/dashboard/overview", label: "Overview" },
  { to: "/dashboard/reports", label: "Reports" },
];

function Sidebar({ className = "", onNavigate }) {
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
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.end}
                onClick={onNavigate}
                className={({ isActive }) =>
                  "sidebar-nav-item" + (isActive ? " sidebar-nav-item-active" : "")
                }
              >
                {item.label}
              </NavLink>
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