import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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
import profilePic from "./../assets/Navigation/profile.png";
import Map from "./common/Map";
import PolylinePreview from "./common/PolylinePreview";

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

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUserData(user);
  }, []);

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
                <img src={profilePic} alt="profile-img" />
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
                <label className="static-label">Start Line</label>
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
                <label className="static-label">Finish Line</label>
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
                    <div className="input-icon-wrapper">
                      <DatePicker
                        selected={scheduledDate}
                        onChange={(date) => setScheduledDate(date)}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="Select date"
                        className="custom-input"
                      />
                      <img
                        src={calendarIcon}
                        alt="Calendar"
                        className="icon-inside-input"
                      />
                    </div>
                  </div>

                  <div className="form-group side-label">
                    <label htmlFor="scheduledTime">Time</label>
                    <div className="input-icon-wrapper time-picker-wrapper">
                      <TimePicker
                        onChange={setScheduledTime}
                        value={scheduledTime}
                        clearIcon={null}
                        clockIcon={null}
                        format="HH:mm"
                        disableClock={true}
                      />
                      <img
                        src={clockIcon}
                        alt="Clock"
                        className="icon-inside-input"
                      />
                    </div>
                  </div>

                  {/* Pace */}
                  <div className="form-group side-label">
                    <label htmlFor="pace">Pace</label>
                    <div className="input-with-unit ">
                      <input type="input" id="pace" />
                      <span className="unit-label">km/hr</span>
                    </div>
                  </div>
                  {/* Total Slots */}
                  <div className="form-group side-label">
                    <label htmlFor="slots">Total Slots</label>
                    <select id="slots" className="custom-select">
                      {[...Array(21)].map((_, i) => (
                        <option key={i} value={i + 5}>
                          {i + 5}
                        </option>
                      ))}
                    </select>
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
              <div className="create-session-button">
                <button className="shared-create-button">
                  <img
                    src={createIcon}
                    alt="Create Icon"
                    className="button-icon"
                  />
                  <span>Create Session</span>
                </button>
              </div>
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
    </div>
  );
}
