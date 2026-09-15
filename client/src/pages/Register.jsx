import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Site.css";

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  idNumber: "",
  password: "",
  confirmPassword: "",
  agreeToTerms: false,
};

function Register() {
  const [form, setForm] = useState(initialForm);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (error) setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!form.agreeToTerms) {
      setError("Please accept the terms and privacy policy.");
      return;
    }

    setError("");
    console.log("register form", form);
  };

  return (
    <div className="auth-shell">
      <div className="auth-card auth-card--compact">
        <div className="auth-header-block">
          <Link className="auth-brand" to="/">
            WESCOL Report
          </Link>
          <span className="home-eyebrow">Get started</span>
          <h1>Register</h1>
        </div>

        <p className="auth-note">Create your account to manage reports and locations.</p>

        <form className="auth-form auth-form--compact" onSubmit={handleSubmit}>
          <div className="auth-inline-grid">
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={form.firstName}
              onChange={handleChange}
              placeholder="First name"
              autoComplete="given-name"
              required
            />
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Last name"
              autoComplete="family-name"
              required
            />
          </div>

          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email address"
            autoComplete="email"
            required
          />

          <input
            id="idNumber"
            name="idNumber"
            type="text"
            value={form.idNumber}
            onChange={handleChange}
            placeholder="ID number"
            autoComplete="off"
            required
          />

          <div className="auth-password-wrap">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              autoComplete="new-password"
              required
            />
            <button
              type="button"
              className="auth-password-toggle"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm password"
            autoComplete="new-password"
            required
          />

          {error ? <p className="auth-error">{error}</p> : null}

          <label className="auth-check auth-check-wide" htmlFor="agreeToTerms">
            <input
              id="agreeToTerms"
              name="agreeToTerms"
              type="checkbox"
              checked={form.agreeToTerms}
              onChange={handleChange}
            />
            <span>I agree to the terms and privacy policy.</span>
          </label>

          <button type="submit" className="home-cta">
            Create account
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
        <Link className="auth-back" to="/">
          Back to home
        </Link>
      </div>
    </div>
  );
}

export default Register;