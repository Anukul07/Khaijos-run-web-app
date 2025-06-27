// src/components/Authentication/Authentication.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./../../styles/authentication.css";
import Footer from "../common/Footer";
import Login from "../Login";

const slides = [
  {
    image: "/src/assets/Authentication/Property 1=start.png",
  },
  {
    image: "/src/assets/Authentication/Property 1=mid.png",
  },
  {
    image: "/src/assets/Authentication/Property 1=end.png",
  },
];
const Authentication = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-header">
        <button onClick={() => navigate("/landing")} className="logo-button">
          <img
            src="/src/assets/Landing/Logo.png"
            alt="Khaijos Logo"
            className="logo-img"
          />
        </button>
      </div>

      <div className="auth-container">
        {/* Left side - Auth Box */}
        <div className="auth-left">
          <Login />
        </div>

        {/* Right side - Carousel */}
        <div className="auth-right">
          <img
            key={currentSlide}
            src={slides[currentSlide].image}
            alt="Slide"
            className="carousel-image fade-in"
          />
          <div className="dots">
            {slides.map((_, i) => (
              <span
                key={i}
                className={`dot ${i === currentSlide ? "active" : ""}`}
              ></span>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Authentication;
