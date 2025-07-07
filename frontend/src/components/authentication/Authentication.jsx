// src/components/Authentication/Authentication.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./authentication.css";
import Footer from "../common/Footer";
import Login from "./Login";
import Registration from "./Registration";
import AuthenticationModal from "./AuthenticationModal";
import PasswordReset from "./PasswordReset";

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
  // const [showLogin, setShowLogin] = useState(true);
  const [view, setView] = useState("login");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };
  const handleLoginSuccess = () => {
    setModalMessage("🎉 Login successful, redirecting to Homepage...");
    setShowModal(true);
    setTimeout(() => navigate("/homepage"), 2500);
  };
  const handleRegistrationSuccess = () => {
    setModalMessage("🎉 Registration successful, redirecting to login...");
    setShowModal(true);
    setTimeout(() => setShowModal(false), 2000);
  };
  const handleResetComplete = () => {
    setModalMessage("🔐 Password reset successfully. Redirecting to login...");
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
      setView("login");
    }, 2500);
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
          <div className="auth-fade-container" key={view}>
            {view === "login" && (
              <Login
                onSwitch={() => setView("register")}
                onLoginSuccess={handleLoginSuccess}
                onResetClick={() => setView("reset")}
              />
            )}
            {view === "register" && (
              <Registration
                onSwitch={() => setView("login")}
                onRegistrationSuccess={handleRegistrationSuccess}
              />
            )}
            {view === "reset" && (
              <PasswordReset
                onResetComplete={handleResetComplete}
                goToLogin={() => setView("login")}
              />
            )}
          </div>
        </div>

        {/* Right side - Carousel */}
        <div className="auth-right">
          <div className="auth-mesh-bg">
            <div className="mesh mesh1" />
            <div className="mesh mesh2" />
            <div className="mesh mesh3" />
            <div className="mesh mesh4" />
            <div className="mesh mesh5" />
          </div>
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
      {/* Modal placed at the top level of Authentication */}
      <AuthenticationModal show={showModal} message={modalMessage} />
    </div>
  );
};

export default Authentication;
