import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Home from "./pages/Home.jsx";
import Overview from "./pages/Overview.jsx";
import Reports from "./pages/Reports.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route path="/dashboard" element={<Dashboard />}>
        <Route index element={<Home />} />
        <Route path="overview" element={<Overview />} />
        <Route path="reports" element={<Reports />} />
        <Route
          path="reports/:categoryId/:subcategoryId/:reportId"
          element={<Reports />}
        />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;