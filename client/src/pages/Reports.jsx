import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { reportCategories } from "../data/reportsData";
import CategoryTabs from "../components/CategoryTabs.jsx";
import ReportViewer from "../components/ReportViewer.jsx";
import "../styles/Reports.css";

function Reports() {
  const { categoryId, subcategoryId, reportId } = useParams();
  const navigate = useNavigate();

  const selectedCategory = reportCategories.find((c) => c.id === categoryId) || null;
  const selectedSubcategory =
    selectedCategory?.subcategories.find((s) => s.id === subcategoryId) || null;
  const selectedReport =
    selectedSubcategory?.reports.find((r) => r.id === reportId) || null;

  function handleSelectReport(category, subcategory, report) {
    navigate(`/dashboard/reports/${category.id}/${subcategory.id}/${report.id}`);
  }

  return (
    <div className="reports-page">
      <CategoryTabs
        categories={reportCategories}
        selectedCategory={selectedCategory}
        selectedSubcategory={selectedSubcategory}
        selectedReport={selectedReport}
        onSelectReport={handleSelectReport}
      />
      <section className="reports-content-panel">
        {selectedReport ? (
          <ReportViewer report={selectedReport} key={selectedReport.id} />
        ) : (
          <div className="reports-empty-state">
            <h3>Hover a category to browse reports</h3>
            <p>
              Hover a category above to open its subcategories, then hover a
              subcategory to see its reports. Click a report to open it here.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

export default Reports;