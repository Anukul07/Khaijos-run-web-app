import "../styles/sessions.css";
import Footer from "./common/Footer";
import Navigation from "./common/Navigation";
import PolylinePreview from "./common/PolylinePreview";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Sessions() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user")) || {};

  useEffect(() => {
    const fetchCreatedSessions = async () => {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/sessions/getCreated",
          {
            userId: user._id,
          }
        );

        const sorted = res.data.sort((a, b) => {
          const aIsActive = a.status === "upcoming" && a.enabled;
          const bIsActive = b.status === "upcoming" && b.enabled;
          if (aIsActive === bIsActive) {
            return (
              new Date(a.scheduledDateTime) - new Date(b.scheduledDateTime)
            );
          }
          return aIsActive ? -1 : 1;
        });

        setSessions(sorted);
      } catch (err) {
        console.error("Error fetching created sessions:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user._id) {
      fetchCreatedSessions();
    }
  }, [user._id]);

  const markSessionComplete = async (sessionId) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/sessions/markCompleted/${sessionId}`
      );
      setSessions((prev) =>
        prev.map((s) =>
          s._id === sessionId ? { ...s, status: "completed" } : s
        )
      );
    } catch (err) {
      console.error("Failed to mark session complete", err);
    }
  };

  const disableSession = async (sessionId) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/sessions/disable/${sessionId}`
      );
      setSessions((prev) =>
        prev.map((s) => (s._id === sessionId ? { ...s, enabled: false } : s))
      );
    } catch (err) {
      console.error("Failed to disable session", err);
    }
  };

  return (
    <div className="session-container">
      <Navigation />
      <div className="session-box">
        <div className="session-content-box">
          <h2>Your Sessions</h2>

          {loading ? (
            <p>Loading...</p>
          ) : sessions.length === 0 ? (
            <p>You have not created any sessions just yet.</p>
          ) : (
            sessions.map((session) => (
              <div
                key={session._id}
                className={`session-card ${
                  !session.enabled
                    ? "disabled"
                    : session.status === "completed"
                    ? "completed"
                    : ""
                }`}
              >
                <div className="session-card-left">
                  <p>
                    <strong>Start line:</strong> {session.startAddress}
                  </p>
                  <p>
                    <strong>Finish line:</strong> {session.endAddress}
                  </p>
                  <p>
                    <strong>Pace:</strong> {session.pace}km/hr
                  </p>
                  <p>
                    <strong>Scheduled on:</strong>{" "}
                    {new Date(session.scheduledDateTime).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Time:</strong>{" "}
                    {new Date(session.scheduledDateTime).toLocaleTimeString(
                      [],
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  </p>
                </div>

                <div className="session-card-middle">
                  {session.status === "completed" ? (
                    <span className="session-status-label">Completed</span>
                  ) : session.enabled === false ? (
                    <span className="session-status-label">Disabled</span>
                  ) : (
                    <>
                      <button
                        className="session-action-button"
                        onClick={() => markSessionComplete(session._id)}
                      >
                        Complete
                      </button>
                      <button
                        className="session-action-button"
                        onClick={() => disableSession(session._id)}
                      >
                        Disable
                      </button>
                    </>
                  )}
                </div>

                <div className="session-card-right">
                  <PolylinePreview routePath={session.routePath} />
                  <p>
                    <strong>{session.distanceKm} Km</strong>
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
