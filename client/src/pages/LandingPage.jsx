import { Link } from "react-router-dom";
import "../styles/LandingPage.css";

function LandingPage({ onEnter }) {
  return (
    <div className="landing">
      <header className="landing-header">
        <div className="landing-brand">
          <div className="landing-logo">WK</div>
          <div className="landing-brand-text">
            <span className="landing-org">West Kenya Sugar Company</span>
            <span className="landing-product">WEKSCOL Report</span>
          </div>
        </div>
      </header>

      <main className="landing-main">
        <div className="landing-content">
          <span className="landing-tag">Organizational Reporting Platform</span>
          <h1 className="landing-heading">
            One platform for every departmental report
          </h1>
          <p className="landing-description">
            WEKSCOL Report gives Agriculture, Transport, Finance, Factory and
            HR a single place to access the reports relevant to their role
            &mdash; consistent, organized and easy to navigate.
          </p>
         <Link className="landing-cta" to="/dashboard">Access Reporting Dashboard</Link>
        </div>
      </main>

      <footer className="landing-footer">
        <p>&copy; {new Date().getFullYear()} West Kenya Sugar Company. Internal use only.</p>
      </footer>
    </div>
  );
}

export default LandingPage;
