import React from "react";
import { Link } from "react-router-dom";
import "../styles/Site.css";

function Login() {
  return <div className="auth-shell"><div className="auth-card"><Link className="auth-brand" to="/">WEKSCOL Report</Link><span className="home-eyebrow">Welcome back</span><h1>Login</h1><p className="auth-note">Authentication is not connected yet. This is a UI preview.</p><form onSubmit={(event) => event.preventDefault()}><label htmlFor="email">Email address</label><input id="email" type="email" placeholder="you@example.com" /><label htmlFor="password">Password</label><input id="password" type="password" placeholder="Enter your password" /><button type="submit" className="home-cta">Login</button></form><p className="auth-switch">Don&apos;t have an account? <Link to="/register">Register</Link></p><Link className="auth-back" to="/">Back to home</Link></div></div>;
}

export default Login;