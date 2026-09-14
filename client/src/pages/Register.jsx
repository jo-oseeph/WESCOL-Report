import React from "react";
import { Link } from "react-router-dom";
import "../styles/Site.css";

function Register() {
  return <div className="auth-shell"><div className="auth-card"><Link className="auth-brand" to="/">WEKSCOL Report</Link><span className="home-eyebrow">Get started</span><h1>Register</h1><p className="auth-note">Account creation is not connected yet. This is a UI preview.</p><form onSubmit={(event) => event.preventDefault()}><label htmlFor="name">Full name</label><input id="name" type="text" placeholder="Your name" /><label htmlFor="email">Email address</label><input id="email" type="email" placeholder="you@example.com" /><label htmlFor="password">Password</label><input id="password" type="password" placeholder="Create a password" /><button type="submit" className="home-cta">Create account</button></form><p className="auth-switch">Already have an account? <Link to="/login">Login</Link></p><Link className="auth-back" to="/">Back to home</Link></div></div>;
}

export default Register;