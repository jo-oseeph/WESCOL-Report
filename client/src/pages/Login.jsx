import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Site.css";

const initialForm = {
  email: "",
  password: "",
  remember: true,
};

function Login() {
  const [form, setForm] = useState(initialForm);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("login form", form);
  };

  return (
    <div className="auth-shell">
      <div className="auth-card auth-card--compact">
        <div className="auth-header-block">
          <Link className="auth-brand" to="/">
            WESCOL Report
          </Link>
          <span className="home-eyebrow">Welcome back</span>
          <h1>Login</h1>
        </div>

        <p className="auth-note">Sign in to continue to your reports dashboard.</p>

        <form className="auth-form auth-form--compact" onSubmit={handleSubmit}>
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

          <div className="auth-password-wrap">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              autoComplete="current-password"
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

          <div className="auth-row auth-row-split">
            <label className="auth-check" htmlFor="remember">
              <input
                id="remember"
                name="remember"
                type="checkbox"
                checked={form.remember}
                onChange={handleChange}
              />
              <span>Remember me</span>
            </label>
            <Link className="auth-link-quiet" to="/">
              Forgot password?
            </Link>
          </div>

          <button type="submit" className="home-cta">
            Login
          </button>
        </form>

        <p className="auth-switch">
          Don&apos;t have an account? <Link to="/register">Register</Link>
        </p>
        <Link className="auth-back" to="/">
          Back to home
        </Link>
      </div>
    </div>
  );
}

export default Login;