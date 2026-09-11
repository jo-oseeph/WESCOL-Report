import React from "react";
import { useLocation } from "react-router-dom";
import { reportCategories } from "../data/reportsData";
import "../styles/Topbar.css";

const sectionTitles = { home: "Home", overview: "Overview", reports: "Reports" };

function getPageInfoFromPath(pathname) {
  const segments = pathname.replace(/^\/dashboard\/?/, "").split("/").filter(Boolean);

  if (segments.length === 0) return { section: "home", breadcrumb: [] };
  if (segments[0] === "overview") return { section: "overview", breadcrumb: [] };

  if (segments[0] === "reports") {
    const [, categoryId, subcategoryId, reportId] = segments;
    const category = reportCategories.find((c) => c.id === categoryId);
    const subcategory = category?.subcategories.find((s) => s.id === subcategoryId);
    const report = subcategory?.reports.find((r) => r.id === reportId);
    return {
      section: "reports",
      breadcrumb: [category?.name, subcategory?.name, report?.name].filter(Boolean),
    };
  }

  return { section: "home", breadcrumb: [] };
}

function Topbar({ onToggleSidebar }) {
  const location = useLocation();
  const { section, breadcrumb } = getPageInfoFromPath(location.pathname);

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="topbar-menu-btn" onClick={onToggleSidebar} aria-label="Toggle sidebar">
          <span /><span /><span />
        </button>
        <div className="topbar-breadcrumb">
          <span className="topbar-section">{sectionTitles[section]}</span>
          {breadcrumb.length > 0 && (
            <span className="topbar-breadcrumb-trail">
              {breadcrumb.map((crumb, index) => (
                <React.Fragment key={index}>
                  <span className="topbar-breadcrumb-sep">/</span>
                  <span className={index === breadcrumb.length - 1 ? "topbar-breadcrumb-current" : ""}>
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