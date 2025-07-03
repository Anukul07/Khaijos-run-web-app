import { useState, useEffect } from "react";
import axios from "axios";
import Footer from "./common/Footer";
import Navigation from "./common/Navigation";
import CreateSession from "./CreateSession";
import "../styles/homepage.css";
import createIcon from "../assets/Homepage/create-button-icon.svg";

export default function Homepage() {
  const [showCreateSession, setShowCreateSession] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [joinedSessions, setJoinedSessions] = useState([]);

  useEffect(() => {
    const fetchJoinedSessions = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) return;

        const response = await axios.post(
          "http://localhost:5000/api/sessions/joined",
          { userId: user._id }
        );

        setJoinedSessions(response.data);
      } catch (error) {
        console.error("Failed to fetch joined sessions:", error);
      }
    };

    fetchJoinedSessions();
  }, []);

  const getTimeDifference = (scheduledDateTime) => {
    const eventTime = new Date(scheduledDateTime).getTime();
    const now = new Date().getTime() + 5.75 * 60 * 60 * 1000; // Nepal time adjustment
    const diff = eventTime - now;

    if (diff <= 0) return "Started";

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return `${hours}h ${minutes}m ${seconds}s`;
  };
  const getShortAddress = (address) => {
    if (!address) return "";
    const parts = address.split(",");
    return parts.slice(0, 2).join(",").trim();
  };

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
            <div className="sessions">
              <div className="sessions-panel">
                {/* Joined Sessions */}
                <div className="joined-section">
                  <p className="section-title">Joined Sessions</p>
                  <div className="joined-cards">
                    {joinedSessions.map((session) => {
                      const isTrainer = session.creator.role === "trainer";
                      const cardId = `joined-${session._id}`;
                      const creatorLabel = isTrainer
                        ? "Trainer Name"
                        : "Runner Name";

                      return (
                        <div
                          key={cardId}
                          className={`session-card ${
                            selectedCard === cardId ? "selected" : ""
                          }`}
                          onClick={() => setSelectedCard(cardId)}
                        >
                          <div className="timer-row">
                            <span className="timer-label">Run Starts in</span>
                            <div className="timer-box">
                              {getTimeDifference(session.scheduledDateTime)}
                            </div>
                          </div>

                          {isTrainer && (
                            <div className="trainer-tag">Trainer</div>
                          )}

                          <p className="creator-name">
                            {creatorLabel}: {session.creator.name}
                          </p>
                          <p>
                            Start Line: {getShortAddress(session.startAddress)}
                          </p>
                          <p>
                            Finish Line:{getShortAddress(session.endAddress)}
                          </p>
                          <p>Distance to Cover: {session.distanceKm} km</p>
                          <p>Pace: {session.pace}</p>
                          <p id="session-action">Cancel Session</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Upcoming Sessions Placeholder */}
                <div className="upcoming-section">
                  <p className="section-title">Upcoming Sessions</p>
                  <div className="upcoming-cards">
                    <p>Coming Soon...</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="homepage-map">map here</div>
          </div>
        </div>
      ) : (
        <CreateSession onCancel={() => setShowCreateSession(false)} />
      )}
      <Footer />
    </div>
  );
}
