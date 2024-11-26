import React from "react";
import "./style.css";

const HexagonCountdown = ({ days, hours, minutes, seconds, settingsState }) => {
  const { display } = settingsState;
  const { digitsColor } = display;
  return (
    <div className="HexagonCountdown" style={{ color: digitsColor }}>
      <div className="HexagonCountdown-item">
        
        <span className="HexagonCountdown-number">{days}</span>
        <span className="hexaValue">days</span>
      </div>

      <div className="HexagonCountdown-item">
        <span className="HexagonCountdown-number">{hours}</span>
        <span className="hexaValue">hours</span>
      </div>

      <div className="HexagonCountdown-item">
        <span className="HexagonCountdown-number">{minutes}</span>
        <span className="hexaValue">minutes</span>
      </div>

      <div className="HexagonCountdown-item">
        <span className="HexagonCountdown-number">{seconds}</span>
        <span className="hexaValue">seconds</span>
      </div>
    </div>
  );
};

export default HexagonCountdown;
