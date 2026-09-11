import React from "react";
import "../styles/Home.css";

function Home({ onGoToReports }) {
  return (
    <div className="home-page">
      <div className="home-welcome">
        <span className="home-eyebrow">Welcome</span>
        <h1 className="home-heading">WEKSCOL Report</h1>
        <p className="home-text">
          This is the internal reporting platform for West Kenya Sugar
          Company. Use the sidebar to check a high-level summary under{" "}
          <strong>Overview</strong>, or browse departmental reports under{" "}
          <strong>Reports</strong> &mdash; organized by Category, Subcategory
          and Report.
        </p>
        <button className="home-cta" onClick={onGoToReports}>
          Browse Reports
        </button>
      </div>

      <div className="home-info-grid">
        <div className="home-info-card">
          <h3>Organized by Department</h3>
          <p>
            Reports are grouped under Agriculture, Transport, Finance,
            Factory, HR and more &mdash; matching how the organization
            already works.
          </p>
        </div>
        <div className="home-info-card">
          <h3>Role-Based Access (Planned)</h3>
          <p>
            In future phases, each user will only see the reports relevant to
            their role and department permissions.
          </p>
        </div>
        <div className="home-info-card">
          <h3>Consistent Report Viewer</h3>
          <p>
            Every report opens in the same simple viewer with filters, a
            results table and export placeholders.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
