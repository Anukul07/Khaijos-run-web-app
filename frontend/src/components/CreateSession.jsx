import React, { useState, useEffect } from "react";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import createSession from "../assets/Homepage/create-session.svg";
import createIcon from "../assets/Homepage/create-button-icon.svg";
import "../styles/createSession.css";
import runningIcon from "../assets/Homepage/create-session/fa-solid_running.svg";
import medalIcon from "../assets/Homepage/create-session/simple-icons_sessionize.svg";
import calendarIcon from "../assets/Homepage/create-session/solar_calendar-bold.svg";
import clockIcon from "../assets/Homepage/create-session/ri_time-fill.svg";
import emailIcon from "../assets/Homepage/create-session/ic_baseline-email.svg";
import profilePlaceHolder from "./../assets/Navigation/profile.jpg";
import Map from "./common/Map";
import PolylinePreview from "./common/PolylinePreview";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function CreateSession({ onCancel }) {
  const [scheduledDate, setScheduledDate] = useState(null);
  const [scheduledTime, setScheduledTime] = useState(null);
  const [activeSelection, setActiveSelection] = useState(null);
  const [startCoords, setStartCoords] = useState(null);
  const [endCoords, setEndCoords] = useState(null);
  const [distance, setDistance] = useState(null);
  const [startAddress, setStartAddress] = useState(
    "Select a start point on map"
  );
  const [endAddress, setEndAddress] = useState("Select a finish line on map");
  const [routePath, setRoutePath] = useState([]);
  const [userData, setUserData] = useState(null);
  const [pace, setPace] = useState("");
  const [totalSlots, setTotalSlots] = useState(25);
  const [validationError, setValidationError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [profileImage, setProfileImage] = useState(profilePlaceHolder);
  function convertTo24Hour(timeStr) {
    const [time, modifier] = timeStr.split(" ");
    let [hours, minutes] = time.split(":");
    if (modifier === "PM" && hours !== "12") hours = String(+hours + 12);
    if (modifier === "AM" && hours === "12") hours = "00";
    return `${hours}:${minutes}`;
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUserData(user);

    if (user && user.photo) {
      setProfileImage(`/profiles/${user.photo}`);
    } else {
      setProfileImage(profilePlaceHolder);
    }
  }, []);
  useEffect(() => {
    if (showSuccessModal) {
      document.body.style.overflow = "hidden";

      const timer = setTimeout(() => {
        window.location.reload();
      }, 3000);

      return () => clearTimeout(timer);
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showSuccessModal]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUserData(user);
  }, []);
  const handleCreateSession = async () => {
    if (
      !startCoords ||
      !endCoords ||
      !scheduledDate ||
      !scheduledTime ||
      !pace ||
      !routePath.length ||
      !distance
    ) {
      setValidationError("❌ Please fill in all session details.");
      return;
    }

    const scheduledDateTime = new Date(
      `${scheduledDate.toISOString().split("T")[0]}T${scheduledTime}`
    );

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await axios.post("http://localhost:5000/api/sessions", {
        userId: user._id,
        startLocation: {
          lat: startCoords[0],
          lng: startCoords[1],
        },
        endLocation: {
          lat: endCoords[0],
          lng: endCoords[1],
        },
        startAddress,
        endAddress,
        scheduledDateTime,
        pace,
        routePath,
        totalSlots,
        distanceKm: Number(distance),
      });

      setShowSuccessModal(true);
    } catch (error) {
      console.error("Failed to create session:", error);
      alert("❌ Failed to create session.");
    }
  };

  return (
    <div className="create-session-wrapper">
      <div className="create-session-top">
        <button className="run-session-button" onClick={onCancel}>
          <img src={createSession} alt="Run Icon" className="run-button-icon" />
          <span>Run Session</span>
        </button>
      </div>

      <div className="create-session-main">
        <div className="create-session-form">
          <div className="details-card">
            <p className="details-card-p">
              {userData?.role === "trainer"
                ? "Trainer Details"
                : "Runner Details"}
            </p>

            <div className="details">
              <div className="details-box">
                <p>
                  <span>
                    <img
                      src={runningIcon}
                      alt="Running Icon"
                      className="details-icon"
                    />
                  </span>
                  {userData?.name || "Full Name"}
                </p>

                <p>
                  <span>
                    <img
                      src={medalIcon}
                      alt="Medal Icon"
                      className="details-icon"
                    />
                  </span>
                  Sessions Completed
                </p>

                {userData?.role === "trainer" && (
                  <p>
                    <span>
                      <img
                        src={medalIcon}
                        alt="Accolade Icon"
                        className="details-icon"
                      />
                    </span>
                    Total Accolades
                  </p>
                )}

                <p>
                  <span>
                    <img
                      src={emailIcon}
                      alt="Email Icon"
                      className="details-icon"
                    />
                  </span>
                  {userData?.email || "Email"}
                </p>
              </div>

              <div className="details-img">
                <img src={profileImage} alt="profile-img" />
              </div>
            </div>
          </div>
          <div className="form-card">
            <div className="form-card-top">
              <p>Session Details</p>
            </div>
            <div className="form-card-btm">
              {/* Start Line */}
              <div className="form-group readonly-with-button">
                <label id="static-label">Start Line</label>
                <div className="input-button-wrapper">
                  <input type="text" value={startAddress} readOnly />
                  <button
                    className="select-btn"
                    onClick={() => setActiveSelection("start")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="18"
                      viewBox="0 0 24 24"
                      width="18"
                      fill="white"
                    >
                      <path
                        d="M12 2C8.13 2 5 5.13 5 9c0 4.5 7 13 7 13s7-8.5 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 
                  0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 
                  2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                      />
                    </svg>
                    <span>Select</span>
                  </button>
                </div>
              </div>

              {/* Finish Line */}
              <div className="form-group readonly-with-button">
                <label id="static-label">Finish Line</label>
                <div className="input-button-wrapper">
                  <input type="text" value={endAddress} readOnly />
                  <button
                    className="select-btn"
                    onClick={() => setActiveSelection("end")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="18"
                      viewBox="0 0 24 24"
                      width="18"
                      fill="white"
                    >
                      <path
                        d="M12 2C8.13 2 5 5.13 5 9c0 4.5 7 13 7 13s7-8.5 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 
                  0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 
                  2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                      />
                    </svg>
                    <span>Select</span>
                  </button>
                </div>
              </div>

              {/* 2-column layout */}
              <div className="form-row split">
                <div className="input-column">
                  {/* Scheduled On */}
                  <div className="form-group side-label">
                    <label htmlFor="scheduledDate">Scheduled On</label>
                    <div className="input-shadow-wrapper">
                      <input
                        type="date"
                        id="scheduledDate"
                        value={
                          scheduledDate
                            ? scheduledDate.toISOString().split("T")[0]
                            : ""
                        }
                        onChange={(e) =>
                          setScheduledDate(new Date(e.target.value))
                        }
                        min={new Date().toISOString().split("T")[0]}
                        className="custom-shadow-input"
                      />
                    </div>
                  </div>

                  {/* Time */}
                  <div className="form-group side-label">
                    <label htmlFor="scheduledTime">Time</label>
                    <div className="input-shadow-wrapper">
                      <select
                        id="scheduledTime"
                        value={scheduledTime || ""}
                        onChange={(e) => setScheduledTime(e.target.value)}
                        className="custom-shadow-input custom-select-time"
                      >
                        <option value="" disabled hidden>
                          Select Time
                        </option>
                        {[
                          "05:00 AM",
                          "05:30 AM",
                          "06:00 AM",
                          "06:30 AM",
                          "07:00 AM",
                          "07:30 AM",
                          "08:00 AM",
                          "08:30 AM",
                          "09:00 AM",
                          "09:30 AM",
                          "10:00 AM",
                          "04:00 PM",
                          "04:30 PM",
                          "05:00 PM",
                          "05:30 PM",
                          "06:00 PM",
                          "06:30 PM",
                          "07:00 PM",
                        ].map((time) => (
                          <option key={time} value={convertTo24Hour(time)}>
                            {time}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Pace */}
                  <div className="form-group side-label">
                    <label htmlFor="pace">Pace</label>
                    <div className="input-shadow-wrapper input-with-unit-wrapper">
                      <input
                        type="text"
                        id="pace"
                        placeholder="Enter pace"
                        value={pace}
                        onChange={(e) =>
                          setPace(e.target.value.replace(/[^0-9.]/g, ""))
                        }
                        className="custom-shadow-input with-unit"
                      />
                      <span className="unit-label-inside">km/hr</span>
                    </div>
                  </div>

                  {/* Total Slots */}
                  <div className="form-group side-label">
                    <label htmlFor="slots">Total Slots</label>
                    <div className="input-shadow-wrapper">
                      <select
                        id="slots"
                        value={totalSlots}
                        onChange={(e) =>
                          setTotalSlots(parseInt(e.target.value))
                        }
                        className="custom-shadow-input custom-select-time"
                      >
                        <option value="" disabled hidden>
                          Select Slots
                        </option>
                        {[...Array(21)].map((_, i) => (
                          <option key={i} value={i + 5}>
                            {i + 5}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Distance Preview Box */}
                <div className="distance-box">
                  <div className="polyline-preview">
                    {/* Replace with dynamic SVG preview later */}
                    <PolylinePreview routePath={routePath} />
                  </div>
                  <p className="distance-label">Total Distance Covered</p>
                  <div className="distance-pill">
                    {distance ? `${distance} km` : "-- km"}
                  </div>
                </div>
              </div>
              <div
                className="create-session-button"
                onClick={handleCreateSession}
              >
                <button className="shared-create-button">
                  <img
                    src={createIcon}
                    alt="Create Icon"
                    className="button-icon"
                  />
                  <span>Create Session</span>
                </button>
              </div>
              {validationError && (
                <p className="form-error-message">{validationError}</p>
              )}
            </div>
          </div>
        </div>
        <Map
          activeSelection={activeSelection}
          setActiveSelection={setActiveSelection}
          startCoords={startCoords}
          setStartCoords={setStartCoords}
          endCoords={endCoords}
          setEndCoords={setEndCoords}
          setDistance={setDistance}
          setStartAddress={setStartAddress} // 👈 new
          setEndAddress={setEndAddress}
          setRoutePath={setRoutePath}
          routePath={routePath}
        />
      </div>
      {showSuccessModal && (
        <div className="success-modal-overlay">
          <div className="success-modal-box">
            <p className="success-message">Session created successfully</p>
            <div className="success-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
                height="28"
                viewBox="0 0 24 24"
                width="28"
              >
                <circle cx="12" cy="12" r="12" fill="#22c55e" />
                <path
                  d="M9.5 13.5l1.5 1.5 3.5-4"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
