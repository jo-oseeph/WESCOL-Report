import React, { useState } from "react";
import LocationFilter, {
  createDefaultLocationSelection,
} from "./LocationFilter.jsx";
import "../styles/ReportViewer.css";

function ReportViewer({ report }) {
  const [showResults, setShowResults] = useState(false);
  const [locationSelection, setLocationSelection] = useState(
    createDefaultLocationSelection()
  );
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [extraValues, setExtraValues] = useState({});

  function handleExtraChange(name, value) {
    setExtraValues((prev) => ({ ...prev, [name]: value }));
  }

  function handleGenerate(event) {
    event.preventDefault();
    setShowResults(true);
  }

  return (
    <div className="report-viewer">
      <div className="report-viewer-header">
        <h2 className="report-viewer-title">{report.name}</h2>
        <p className="report-viewer-description">{report.description}</p>
      </div>

      <form className="report-viewer-filters" onSubmit={handleGenerate}>
        <div className="report-filter-group">
          <span className="report-filter-group-label">Location</span>
          <LocationFilter
            selection={locationSelection}
            onChange={setLocationSelection}
          />
        </div>

        <div className="report-filter-group">
          <span className="report-filter-group-label">Date Range</span>
          <div className="report-date-fields">
            <div className="report-filter-field">
              <label htmlFor="dateFrom">Date From</label>
              <input
                id="dateFrom"
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
              />
            </div>
            <div className="report-filter-field">
              <label htmlFor="dateTo">Date To</label>
              <input
                id="dateTo"
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
              />
            </div>

            {report.parameters.map((param) => (
              <div className="report-filter-field" key={param.name}>
                <label htmlFor={param.name}>{param.label}</label>
                <select
                  id={param.name}
                  value={extraValues[param.name] || ""}
                  onChange={(e) => handleExtraChange(param.name, e.target.value)}
                >
                  {param.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>

        <div className="report-filter-actions">
          <button type="submit" className="report-generate-btn">
            Generate Report
          </button>
        </div>
      </form>

      {showResults && (
        <div className="report-results">
          <div className="report-results-toolbar">
            <span className="report-results-count">
              {report.results.rows.length} record
              {report.results.rows.length === 1 ? "" : "s"} found
            </span>
            <div className="report-results-actions">
              <button type="button" className="report-action-btn">
                Export PDF
              </button>
              <button type="button" className="report-action-btn">
                Export Excel
              </button>
              <button type="button" className="report-action-btn">
                Print
              </button>
            </div>
          </div>

          <div className="report-table-wrap">
            <table className="report-table">
              <thead>
                <tr>
                  {report.results.columns.map((col) => (
                    <th key={col}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {report.results.rows.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReportViewer;
