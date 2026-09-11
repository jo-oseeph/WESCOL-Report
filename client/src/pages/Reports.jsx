import React, { useState } from "react";
import { reportCategories } from "../data/reportsData";
import CategoryTabs from "../components/CategoryTabs.jsx";
import ReportViewer from "../components/ReportViewer.jsx";
import "../styles/Reports.css";

function Reports({ onBreadcrumbChange }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);

  function updateBreadcrumb(category, subcategory, report) {
    if (!onBreadcrumbChange) return;
    onBreadcrumbChange(
      [category?.name, subcategory?.name, report?.name].filter(Boolean)
    );
  }

  // The menu is hover-driven now, so category/subcategory are only ever
  // "selected" together with the report the user actually clicked.
  function handleSelectReport(category, subcategory, report) {
    setSelectedCategory(category);
    setSelectedSubcategory(subcategory);
    setSelectedReport(report);
    updateBreadcrumb(category, subcategory, report);
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
