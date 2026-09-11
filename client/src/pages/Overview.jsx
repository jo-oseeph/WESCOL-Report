import React from "react";
import {
  reportCategories,
  recentlyUsedReports,
  getTotalReportCount,
  getTotalSubcategoryCount,
} from "../data/reportsData";
import "../styles/Overview.css";

function Overview() {
  const stats = [
    { label: "Total Reports", value: getTotalReportCount() },
    { label: "Total Categories", value: reportCategories.length },
    { label: "Total Subcategories", value: getTotalSubcategoryCount() },
    { label: "Active Users (Dummy)", value: 42 },
  ];

  return (
    <div className="overview-page">
      <div className="overview-stats">
        {stats.map((stat) => (
          <div className="overview-stat-card" key={stat.label}>
            <span className="overview-stat-value">{stat.value}</span>
            <span className="overview-stat-label">{stat.label}</span>
          </div>
        ))}
      </div>

      <div className="overview-grid">
        <div className="overview-panel">
          <h3 className="overview-panel-title">Reports by Category</h3>
          <ul className="overview-category-list">
            {reportCategories.map((category) => {
              const count = category.subcategories.reduce(
                (sum, sub) => sum + sub.reports.length,
                0
              );
              return (
                <li key={category.id}>
                  <span className="overview-category-name">{category.name}</span>
                  <span className="overview-category-count">{count}</span>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="overview-panel">
          <h3 className="overview-panel-title">Recently Used Reports</h3>
          <ul className="overview-recent-list">
            {recentlyUsedReports.map((item) => (
              <li key={item.name}>
                <div className="overview-recent-main">
                  <span className="overview-recent-name">{item.name}</span>
                  <span className="overview-recent-category">{item.category}</span>
                </div>
                <span className="overview-recent-time">{item.lastRun}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Overview;
