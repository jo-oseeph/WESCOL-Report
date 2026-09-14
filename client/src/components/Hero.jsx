import React, { useEffect, useRef, useState } from "react";
import "../styles/Hero.css";

const heroSlides = [
  {
    url: "https://images.pexels.com/photos/36976807/pexels-photo-36976807.jpeg?auto=compress&cs=tinysrgb&w=1920",
    alt: "Sugarcane fields stretching under a clear sky",
  },
  {
    url: "https://images.pexels.com/photos/33626643/pexels-photo-33626643.jpeg?auto=compress&cs=tinysrgb&w=1920",
    alt: "Aerial view of an industrial sugar factory complex",
  },
  {
    url: "https://images.pexels.com/photos/35778504/pexels-photo-35778504.jpeg?auto=compress&cs=tinysrgb&w=1920",
    alt: "Farm workers loading harvested sugarcane for transport",
  },
];

const initialLogin = { username: "", password: "" };
const initialRegister = { name: "", email: "", username: "", password: "" };

function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [mode, setMode] = useState("login"); // "login" | "register"
  const [login, setLogin] = useState(initialLogin);
  const [register, setRegister] = useState(initialRegister);
  const formRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const switchMode = (next) => {
    if (next === mode) return;
    setMode(next);
  };

  const handleLoginChange = (e) =>
    setLogin((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleRegisterChange = (e) =>
    setRegister((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // TODO: wire up to auth API
    console.log("login", login);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    // TODO: wire up to auth API
    console.log("register", register);
  };

  return (
    <main className="auth-page">
      <section className="auth-visual" aria-hidden="true">
        <div className="auth-slides">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.url}
              className={
                "auth-slide" + (index === activeSlide ? " auth-slide-active" : "")
              }
              style={{ backgroundImage: `url(${slide.url})` }}
            />
          ))}
        </div>
        <div className="auth-visual-overlay" />

        <div className="auth-mark">West Kenya Sugar</div>

        <div className="auth-slide-dots">
          {heroSlides.map((slide, index) => (
            <span
              key={slide.url}
              className={
                "auth-dot" + (index === activeSlide ? " auth-dot-active" : "")
              }
            />
          ))}
        </div>
      </section>

      <section className="auth-panel">
        <div className="auth-panel-inner">
          <div className="auth-header">
            <h1 className="auth-title">
              {mode === "login" ? "Sign in" : "Create account"}
            </h1>
          </div>

          <div key={mode} className="auth-form-wrap" ref={formRef}>
            {mode === "login" ? (
              <form className="auth-form" onSubmit={handleLoginSubmit}>
                <div className="auth-field">
                  <label htmlFor="username">Username</label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    value={login.username}
                    onChange={handleLoginChange}
                    required
                  />
                </div>

                <div className="auth-field">
                  <label htmlFor="password">Password</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    value={login.password}
                    onChange={handleLoginChange}
                    required
                  />
                </div>

                <div className="auth-row">
                  <a className="auth-link-quiet" href="/forgot-password">
                    Forgot password?
                  </a>
                </div>

                <button className="auth-submit" type="submit">
                  Sign in
                </button>
              </form>
            ) : (
              <form className="auth-form" onSubmit={handleRegisterSubmit}>
                <div className="auth-field">
                  <label htmlFor="name">Full name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={register.name}
                    onChange={handleRegisterChange}
                    required
                  />
                </div>

                <div className="auth-field">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={register.email}
                    onChange={handleRegisterChange}
                    required
                  />
                </div>

                <div className="auth-field">
                  <label htmlFor="reg-username">Username</label>
                  <input
                    id="reg-username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    value={register.username}
                    onChange={handleRegisterChange}
                    required
                  />
                </div>

                <div className="auth-field">
                  <label htmlFor="reg-password">Password</label>
                  <input
                    id="reg-password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    value={register.password}
                    onChange={handleRegisterChange}
                    required
                  />
                </div>

                <button className="auth-submit" type="submit">
                  Create account
                </button>
              </form>
            )}
          </div>

          <p className="auth-toggle">
            {mode === "login" ? (
              <>
                No account?{" "}
                <button type="button" onClick={() => switchMode("register")}>
                  Register
                </button>
              </>
            ) : (
              <>
                Have an account?{" "}
                <button type="button" onClick={() => switchMode("login")}>
                  Sign in
                </button>
              </>
            )}
          </p>
        </div>
      </section>
    </main>
  );
}

export default Hero;