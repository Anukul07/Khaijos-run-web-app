import useNepalCountdown from "../../utils/useNepalCountdown";
import "./../../styles/nepalTimer.css";

export default function NepalTimer({ scheduledDateTime }) {
  const timeLeft = useNepalCountdown(scheduledDateTime);

  return (
    <div
      className={`dynamic-timer-box ${timeLeft === "Started" ? "started" : ""}`}
    >
      {timeLeft}
    </div>
  );
}
