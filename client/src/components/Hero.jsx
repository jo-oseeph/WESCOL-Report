import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { reportCategories } from "../data/reportsData";
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

function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const totalReports = reportCategories.reduce(
    (total, category) => total + category.subcategories.reduce(
      (categoryTotal, subcategory) => categoryTotal + subcategory.reports.length,
      0
    ),
    0
  );
  const totalSubcategories = reportCategories.reduce(
    (total, category) => total + category.subcategories.length,
    0
  );

  return (
    <main className="home-hero">
      <div className="hero-slides" aria-hidden="true">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.url}
            className={
              "hero-slide" + (index === activeSlide ? " hero-slide-active" : "")
            }
            style={{ backgroundImage: `url(${slide.url})` }}
          />
        ))}
      </div>
      <div className="hero-overlay" aria-hidden="true" />

      <div className="home-welcome">
        <h1 className="home-heading">Make better decisions with organized reports.</h1>
        <p className="home-text">
          Access clear, reliable operational and management reports for
          West Kenya Sugar Company from one central platform.
        </p>

        <div className="home-stats" aria-label="Report statistics">
          <div className="home-stat"><strong>{totalReports}</strong><span>Total Reports</span></div>
          <div className="home-stat"><strong>{reportCategories.length}</strong><span>Total Categories</span></div>
          <div className="home-stat"><strong>{totalSubcategories}</strong><span>Total Subcategories</span></div>
        </div>

        <div className="home-actions">
          <Link className="home-cta" to="/login">Login to continue</Link>
          <Link className="home-secondary-cta" to="/register">Create an account</Link>
        </div>
      </div>

      <div className="hero-slide-dots" aria-hidden="true">
        {heroSlides.map((slide, index) => (
          <span
            key={slide.url}
            className={"hero-dot" + (index === activeSlide ? " hero-dot-active" : "")}
          />
        ))}
      </div>
    </main>
  );
}

export default Hero;