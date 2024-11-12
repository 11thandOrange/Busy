import React from "react";
import "./style.css";

const ProgressBarCountdown = ({
  days,
  hours,
  minutes,
  seconds,
  digitsColor,
}) => {
  return (
    <div className="ProgressBarCountdown" style={{ color: digitsColor }}>
      <div className="ProgressBarCountdown-item">
        <span className="ProgressBarCountdown-number">{days}</span>
      </div>
      <span className="ProgressBarCountdown-divider">:</span>
      <div className="ProgressBarCountdown-item">
        <span className="ProgressBarCountdown-number">{hours}</span>
      </div>
      <span className="ProgressBarCountdown-divider">:</span>
      <div className="ProgressBarCountdown-item">
        <span className="ProgressBarCountdown-number">{minutes}</span>
      </div>
      <span className="ProgressBarCountdown-divider">:</span>
      <div className="ProgressBarCountdown-item">
        <span className="ProgressBarCountdown-number">{seconds}</span>
      </div>
    </div>
  );
};

export default ProgressBarCountdown;
