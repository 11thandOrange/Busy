import React from "react";
import "./style.css";

const ModernsCountdown = ({ days, hours, minutes, seconds, digitsColor }) => {
  return (
    <div className="ModernsCountdown" style={{ color: digitsColor }}>
      <div className="ModernsCountdown-item">
        <span className="ModernsCountdown-number">{days}</span>
      
      </div>
      <span className="ModernsCountdown-divider">:</span>
      <div className="ModernsCountdown-item">
        <span className="ModernsCountdown-number">{hours}</span>
        
      </div>
      <span className="ModernsCountdown-divider">:</span>
      <div className="ModernsCountdown-item">
        <span className="ModernsCountdown-number">{minutes}</span>
    
      </div>
      <span className="ModernsCountdown-divider">:</span>
      <div className="ModernsCountdown-item">
        <span className="ModernsCountdown-number">{seconds}</span>
       
      </div>
    </div>
  );
};

export default ModernsCountdown;
