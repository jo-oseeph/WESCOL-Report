import React, { useState } from "react";
import LandingPage from "./pages/LandingPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";

function App() {
  const [view, setView] = useState("landing"); // "landing" | "dashboard"

  if (view === "dashboard") {
    return <Dashboard />;
  }

  return <LandingPage onEnter={() => setView("dashboard")} />;
}

export default App;
