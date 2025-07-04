import { useState, useEffect } from "react";
import axios from "axios";
import Footer from "./common/Footer";
import Navigation from "./common/Navigation";
import CreateSession from "./CreateSession";
import "../styles/homepage.css";
import createIcon from "../assets/Homepage/create-button-icon.svg";
import NepalTimer from "./common/NepalTimer";
import HomepageMap from "./common/HomepageMap";
import ConfirmationModal from "./common/ConfirmationModal";
import { RiRunLine } from "react-icons/ri";

export default function Homepage() {
  const [showCreateSession, setShowCreateSession] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [joinedSessions, setJoinedSessions] = useState([]);
  const [availableSessions, setAvailableSessions] = useState([]);
  const [confirmationState, setConfirmationState] = useState({
    show: false,
    type: "", // "join" or "cancel"
    session: null,
    success: false,
    successMessage: "",
    icon: null,
  });

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) return;

        const [joinedRes, availableRes] = await Promise.all([
          axios.post("http://localhost:5000/api/sessions/joined", {
            userId: user._id,
          }),
          axios.post("http://localhost:5000/api/sessions/available", {
            userId: user._id,
          }),
        ]);

        const joined = joinedRes.data;
        const available = availableRes.data;

        setJoinedSessions(joined);
        setAvailableSessions(available);

        if (joined.length > 0) {
          setSelectedCard(`joined-${joined[0]._id}`);
        } else if (available.length > 0) {
          setSelectedCard(`available-${available[0]._id}`);
        }
      } catch (error) {
        console.error("Failed to fetch sessions:", error);
      }
    };

    fetchSessions();
  }, []);

  const getShortAddress = (address) => {
    if (!address) return "";
    const parts = address.split(",");
    return parts.slice(0, 2).join(",").trim();
  };

  const getNepaliDate = (utcDate) => {
    const date = new Date(utcDate);
    const offsetMs = (5 * 60 + 45) * 60 * 1000;
    const nepaliDate = new Date(date.getTime() + offsetMs);
    return nepaliDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const selectedSession = selectedCard?.startsWith("joined-")
    ? joinedSessions.find((s) => `joined-${s._id}` === selectedCard)
    : availableSessions.find((s) => `available-${s._id}` === selectedCard);

  const handleConfirmAction = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!confirmationState.session || !user) return;

    const { type, session } = confirmationState;

    try {
      if (type === "cancel") {
        await axios.post(
          `http://localhost:5000/api/sessions/cancel/${session._id}`,
          {
            userId: user._id,
          }
        );
        setConfirmationState((prev) => ({
          ...prev,
          success: true,
          successMessage: "You have successfully cancelled the session.",
          icon: null,
        }));
      } else if (type === "join") {
        await axios.post(
          `http://localhost:5000/api/sessions/join/${session._id}`,
          {
            userId: user._id,
          }
        );
        setConfirmationState((prev) => ({
          ...prev,
          success: true,
          successMessage:
            "You have successfully joined the running session. Happy running!",
          icon: <RiRunLine />,
        }));
      }

      setTimeout(() => {
        setConfirmationState({
          show: false,
          type: "",
          session: null,
          success: false,
          successMessage: "",
          icon: null,
        });
        window.location.reload(); // Refresh state
      }, 2500);
    } catch (err) {
      console.error("Action failed:", err);
    }
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
                      const creatorLabel = isTrainer ? "Trainer" : "Runner";

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
                            <NepalTimer
                              scheduledDateTime={session.scheduledDateTime}
                            />
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
                            Finish Line: {getShortAddress(session.endAddress)}
                          </p>
                          <p>Distance to Cover: {session.distanceKm} km</p>
                          <p>Pace: {session.pace}</p>
                          <p
                            id="session-action"
                            onClick={(e) => {
                              e.stopPropagation();
                              setConfirmationState({
                                show: true,
                                type: "cancel",
                                session,
                                success: false,
                                successMessage: "",
                                icon: null,
                              });
                            }}
                          >
                            Cancel Session
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Upcoming Sessions */}
                <div className="upcoming-section">
                  <p className="section-title">Upcoming Sessions</p>
                  <div className="upcoming-cards">
                    {availableSessions.map((session) => {
                      const isTrainer = session.creator.role === "trainer";
                      const cardId = `available-${session._id}`;
                      const creatorLabel = isTrainer ? "Trainer" : "Runner";

                      return (
                        <div
                          key={cardId}
                          className={`session-card ${
                            selectedCard === cardId ? "selected" : ""
                          }`}
                          onClick={() => setSelectedCard(cardId)}
                        >
                          <p className="scheduled-date">
                            Scheduled on:{" "}
                            {getNepaliDate(session.scheduledDateTime)}
                          </p>

                          {isTrainer && (
                            <div className="trainer-tag-upcoming">Trainer</div>
                          )}

                          <p className="creator-name">
                            {creatorLabel}: {session.creator.name}
                          </p>
                          <p>
                            Start Line: {getShortAddress(session.startAddress)}
                          </p>
                          <p>
                            Finish Line: {getShortAddress(session.endAddress)}
                          </p>
                          <p>Distance: {session.distanceKm} km</p>
                          <p>Pace: {session.pace}</p>
                          <p id="trainer-detail">Trainer Details</p>
                          <button
                            className="join-session-button"
                            onClick={() => {
                              setConfirmationState({
                                show: true,
                                type: "join",
                                session,
                                success: false,
                                successMessage: "",
                                icon: null,
                              });
                            }}
                          >
                            Join Session
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="homepage-map">
              {selectedSession && (
                <HomepageMap
                  startCoords={[
                    selectedSession?.startLocation?.lat,
                    selectedSession?.startLocation?.lng,
                  ]}
                  endCoords={[
                    selectedSession?.endLocation?.lat,
                    selectedSession?.endLocation?.lng,
                  ]}
                  routePath={selectedSession?.routePath}
                />
              )}
            </div>
          </div>
        </div>
      ) : (
        <CreateSession onCancel={() => setShowCreateSession(false)} />
      )}

      <Footer />

      {/* Shared Confirmation Modal */}
      <ConfirmationModal
        show={confirmationState.show}
        onConfirm={handleConfirmAction}
        onCancel={() =>
          setConfirmationState({
            show: false,
            type: "",
            session: null,
            success: false,
            successMessage: "",
            icon: null,
          })
        }
        message={
          confirmationState.type === "cancel"
            ? "Are you sure you want to cancel the session?"
            : "Are you sure you want to join the session?"
        }
        success={confirmationState.success}
        successMessage={confirmationState.successMessage}
        icon={confirmationState.icon}
      />
    </div>
  );
}
