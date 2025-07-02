import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCopyright,
  FaFacebookF,
  FaInstagram,
  FaSnapchatGhost,
  FaTwitter,
} from "react-icons/fa";
import "../styles/Landing.css";
import img1 from "../assets/Landing/carousel/image-1.png";
import img2 from "../assets/Landing/carousel/image-2.png";
import img3 from "../assets/Landing/carousel/image-3.png";
import img4 from "../assets/Landing/carousel/image-4.png";

const slides = [
  {
    img: img1,
    h1: "Run with your team",
    p: `With Khaijos, you can open your running session and wait for friends to
        join your slots. Set your start line and finish line, run together in
        comfort and motivation, and—most importantly—with health in mind.`,
  },
  {
    img: img2,
    h1: "Running with trainers",
    p: `Khaijos trainers are experienced and have collected accolades 
    that sets them in the class of their own in terms of running. 
    They will guide you with running postures, energy efficiency techniques, diet and so much more. `,
  },
  {
    img: img3,
    h1: "Shop running gears",
    p: `The shopping site of Khaijos is filled with running gears of different brands. 
    These gears help you to boost your performance, get motivation through aesthetics and above all,
     get the best quality brands that suits your running needs.`,
  },
  {
    img: img4,
    h1: "Thrive in your community",
    p: `The best part of Khaijos is the community that you shall build. 
    The networking, the communication and the comfort that you will build will set you best in the community. 
    Its all about meeting like-minded people with similar goal in mind.`,
  },
];
export default function Landing() {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const total = slides.length;
  const next1 = (index + 1) % total;
  const next2 = (index + 2) % total;
  return (
    <div className="page">
      <header>
        <nav className="navigation">
          <button className="logo-button">
            <img
              src="/src/assets/Landing/Logo.png"
              alt="Khaijos Logo"
              className="logo-image"
            />
          </button>
        </nav>
      </header>
      <main>
        <div className="top-header">
          <h1>MOVEMENT THAT INSPIRES YOU TO KEEP MOVING</h1>
          <p>JOIN OUR TEAM TODAY OR LOG IN</p>
          <button onClick={() => navigate("/authentication")}>
            <span>LOGIN / REGISTER</span>
          </button>
        </div>
        <div className="image-carousel">
          <div className="copy">
            <h1>{slides[index].h1}</h1>
            <p>{slides[index].p}</p>
          </div>

          {/* ─── Middle: spotlight image ───────────────────────────────────── */}
          <div className="spotlight-wrapper">
            <img
              src={slides[index].img}
              alt={slides[index].h1}
              className="spotlight"
            />
          </div>

          <div className="previews-wrapper">
            {/* ─── Right: two preview images (second one half-visible) ───────── */}
            <div className="previews">
              {[next1, next2].map((i, idx) => (
                <div
                  key={i}
                  className={`preview ${idx === 1 ? "half-cut" : ""}`}
                  onClick={() => setIndex(i)}
                >
                  <img src={slides[i].img} alt={slides[i].h1} />
                </div>
              ))}
            </div>

            {/* ─── Dots navigation (below on small screens, absolute on large) ─ */}
            <div className="dots">
              {slides.map((_, i) => (
                <button
                  key={i}
                  className={`dot ${i === index ? "active" : ""}`}
                  onClick={() => setIndex(i)}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
      <footer>
        <div className="left-section">
          <FaCopyright
            style={{
              marginRight: "0.5rem",
              fontSize: "1.3em",
              verticalAlign: "middle",
            }}
          />
          <p>Khaijos, 2025</p>
        </div>

        <div className="mid-section">
          <a href="#">Subscribe to Newsletter</a>
          <a href="#">Privacy / Policy</a>
          <a href="#">Help</a>
        </div>

        <div className="right-section">
          <p>Socials</p>
          <div className="social-icons">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="icon-button"
              aria-label="facebook"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://snapchat.com"
              target="_blank"
              rel="noopener noreferrer"
              className="icon-button"
              aria-label="snapchat"
            >
              <FaSnapchatGhost />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="icon-button"
              aria-label="instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="icon-button"
              aria-label="twitter"
            >
              <FaTwitter />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
