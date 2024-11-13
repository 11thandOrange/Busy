import React from "react";
import "./style.css";

const ProgressCircleCountdown = ({ days, hours, minutes, seconds, settingsState }) => {
    const { display } = settingsState;
    const { digitsColor } = display;
  return (
    <div className="ProgressCircleCountdown" style={{ color: digitsColor }}>
      <div className="ProgressCircleCountdown-item">
        <span className="ProgressCircleCountdown-number">{days}</span>
      
      </div>
      <span className="ProgressCircleCountdown-divider">:</span>
      <div className="ProgressCircleCountdown-item">
        <span className="ProgressCircleCountdown-number">{hours}</span>
        
      </div>
      <span className="ProgressCircleCountdown-divider">:</span>
      <div className="ProgressCircleCountdown-item">
        <span className="ProgressCircleCountdown-number">{minutes}</span>
    
      </div>
      <span className="ProgressCircleCountdown-divider">:</span>
      <div className="ProgressCircleCountdown-item">
        <span className="ProgressCircleCountdown-number">{seconds}</span>
       
      </div>
    </div>
  );
};

export default ProgressCircleCountdown;
