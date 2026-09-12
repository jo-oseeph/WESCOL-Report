import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { reportCategories } from "../data/reportsData";
import CategoryTabs from "../components/CategoryTabs.jsx";
import ReportViewer from "../components/ReportViewer.jsx";
import "../styles/Home.css";
import "../styles/Reports.css";

function Home() {
  const { categoryId, subcategoryId, reportId } = useParams();
  const navigate = useNavigate();

  const selectedCategory = reportCategories.find((category) => category.id === categoryId) || null;
  const selectedSubcategory = selectedCategory?.subcategories.find(
    (subcategory) => subcategory.id === subcategoryId
  ) || null;
  const selectedReport = selectedSubcategory?.reports.find(
    (report) => report.id === reportId
  ) || null;

  function handleSelectReport(category, subcategory, report) {
    navigate(`/${category.id}/${subcategory.id}/${report.id}`);
  }

  return (
    <div className="home-shell reports-shell">
      <header className="reports-topbar">
        <div className="reports-topbar-inner">
          <div className="reports-topbar-branding">
            <div className="reports-topbar-logo">WK</div>
            <div className="reports-topbar-brand-copy">
              <strong>WEKSCOL Report</strong>
              <small>West Kenya Sugar Co.</small>
            </div>
          </div>
          <CategoryTabs
            categories={reportCategories}
            selectedCategory={selectedCategory}
            selectedSubcategory={selectedSubcategory}
            selectedReport={selectedReport}
            onSelectReport={handleSelectReport}
          />
          <div className="reports-topbar-user">
            <div className="reports-topbar-avatar">A</div>
            <div className="reports-topbar-user-copy">
              <strong>Admin User</strong>
              <small>Head Office</small>
            </div>
          </div>
        </div>
      </header>
      <main className="home-page">
        <div className="home-welcome">
          <span className="home-eyebrow">Welcome</span>
          <h1 className="home-heading">WEKSCOL Report</h1>
          <p className="home-text">
            Access clear, organized operational and management reports for West
            Kenya Sugar Company. Browse reports by business category, subcategory
            and report type from one central platform.
          </p>
        </div>

        <div className="home-info-grid">
          <div className="home-info-card">
            <h3>Organized by Department</h3>
            <p>Reports are grouped under Agriculture, Transport, Finance, Factory, HR and more.</p>
          </div>
          <div className="home-info-card">
            <h3>Easy to Navigate</h3>
            <p>Find the right report through a clear category and subcategory structure.</p>
          </div>
          <div className="home-info-card">
            <h3>Consistent Report Viewer</h3>
            <p>Every report opens with filters, results and export actions in one familiar view.</p>
          </div>
        </div>

        <section className="reports-content-panel home-report-panel">
          {selectedReport ? (
            <ReportViewer report={selectedReport} key={selectedReport.id} />
          ) : (
            <div className="reports-empty-state">
              <h3>Choose a report to get started</h3>
              <p>Open a category, select a subcategory, and choose a report from the menu above.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Home;
