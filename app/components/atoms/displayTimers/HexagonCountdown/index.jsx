import React from "react";
import "./style.css";

const HexagonCountdown = ({ days, hours, minutes, seconds, digitsColor }) => {
  return (
    <div className="HexagonCountdown" style={{ color: digitsColor }}>
      <div className="HexagonCountdown-item">
        
        <span className="HexagonCountdown-number">{days}</span>
      </div>

      <div className="HexagonCountdown-item">
        <span className="HexagonCountdown-number">{hours}</span>
      </div>

      <div className="HexagonCountdown-item">
        <span className="HexagonCountdown-number">{minutes}</span>
      </div>

      <div className="HexagonCountdown-item">
        <span className="HexagonCountdown-number">{seconds}</span>
      </div>
    </div>
  );
};

export default HexagonCountdown;
