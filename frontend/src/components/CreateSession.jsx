import createSession from "../assets/Homepage/create-session.svg";
import "../styles/createSession.css";
import runningIcon from "../assets/Homepage/create-session/fa-solid_running.svg";
import medalIcon from "../assets/Homepage/create-session/simple-icons_sessionize.svg";
import emailIcon from "../assets/Homepage/create-session/ic_baseline-email.svg";
import profilePic from "./../assets/Navigation/profile.png";

export default function CreateSession({ onCancel }) {
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
            <p className="details-card-p">Runner Details</p>
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
                  Full Name
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
                <p>
                  <span>
                    <img
                      src={emailIcon}
                      alt="Email Icon"
                      className="details-icon"
                    />
                  </span>
                  Email
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
            <div className="form-card-btm">form-card</div>
          </div>
        </div>
        <div className="create-session-map">
          <p>Map area (Right)</p>
        </div>
      </div>
    </div>
  );
}
