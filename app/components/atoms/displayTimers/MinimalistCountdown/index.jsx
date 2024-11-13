import React, { useCallback } from "react";
import "./style.css";

const MinimalistCountdown = ({
  days,
  hours,
  minutes,
  seconds,
  settingsState,
}) => {
  const { display } = settingsState;
  const { digitsColor, borderColor } = display;

  const divider = useCallback(() => {
    

    return (
      <span className="divider" style={{ color: borderColor }}>
        /
      </span>
    );
  }, [borderColor]);
  return (
    <div className="countdown" style={{ color: digitsColor }}>
      <div className="countdown-item">
        <span className="countdown-number">{days}</span>
        <span className="countdown-label">days</span>
      </div>
      {divider()}
      <div className="countdown-item">
        <span className="countdown-number">{hours}</span>
        <span className="countdown-label">hours</span>
      </div>
      {divider()}
      <div className="countdown-item">
        <span className="countdown-number">{minutes}</span>
        <span className="countdown-label">minutes</span>
      </div>
      {divider()}
      <div className="countdown-item">
        <span className="countdown-number">{seconds}</span>
        <span className="countdown-label">seconds</span>
      </div>
    </div>
  );
};

export default MinimalistCountdown;
