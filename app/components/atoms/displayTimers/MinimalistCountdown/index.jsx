import React from "react";
import "./style.css";

const MinimalistCountdown = ({
  days,
  hours,
  minutes,
  seconds,
  digitsColor,
}) => {
  return (
    <div className="countdown" style={{ color: digitsColor }}>
      <div className="countdown-item">
        <span className="countdown-number">{days}</span>
        <span className="countdown-label">days</span>
      </div>
      <span className="divider">/</span>
      <div className="countdown-item">
        <span className="countdown-number">{hours}</span>
        <span className="countdown-label">hours</span>
      </div>
      <span className="divider">/</span>
      <div className="countdown-item">
        <span className="countdown-number">{minutes}</span>
        <span className="countdown-label">minutes</span>
      </div>
      <span className="divider">/</span>
      <div className="countdown-item">
        <span className="countdown-number">{seconds}</span>
        <span className="countdown-label">seconds</span>
      </div>
    </div>
  );
};

export default MinimalistCountdown;
