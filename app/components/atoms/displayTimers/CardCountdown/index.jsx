import React from "react";
import "./style.css";

const CardCountdown = ({ days, hours, minutes, seconds, digitsColor }) => {
  return (
    <div className="CardCountdown" style={{ color: digitsColor }}>
      <div className="CardCountdown-item">
        <span className="CardCountdown-number">{days}</span>
      
      </div>
      <span className="CardCountdown-divider">:</span>
      <div className="CardCountdown-item">
        <span className="CardCountdown-number">{hours}</span>
        
      </div>
      <span className="CardCountdown-divider">:</span>
      <div className="CardCountdown-item">
        <span className="CardCountdown-number">{minutes}</span>
    
      </div>
      <span className="CardCountdown-divider">:</span>
      <div className="CardCountdown-item">
        <span className="CardCountdown-number">{seconds}</span>
       
      </div>
    </div>
  );
};

export default CardCountdown;
