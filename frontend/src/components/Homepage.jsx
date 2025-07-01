import { useState } from "react";
import Footer from "./common/Footer";
import Navigation from "./common/Navigation";
import CreateSession from "./CreateSession";
import "../styles/homepage.css";
import createIcon from "../assets/Homepage/create-button-icon.svg";

export default function Homepage() {
  const [showCreateSession, setShowCreateSession] = useState(false);
  return (
    <div className="homepage-container">
      <Navigation />
      {!showCreateSession ? (
        <div className="main-content">
          <div className="top-area">
            <button onClick={() => setShowCreateSession(true)}>
              <img src={createIcon} alt="Create Icon" className="button-icon" />
              <span>Create Session</span>
            </button>
          </div>
          <div className="main-area">
            <div className="sessions">sessions here</div>
            <div className="map">map here</div>
          </div>
        </div>
      ) : (
        <CreateSession onCancel={() => setShowCreateSession(false)} />
      )}
      <Footer />
    </div>
  );
}
