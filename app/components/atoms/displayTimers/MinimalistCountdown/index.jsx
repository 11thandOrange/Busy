import React from "react";
import "./style.css";

const MinimalistCountdown = ({ timeUnits, settingsState }) => {
  const { display } = settingsState;
  const { digitsColor, borderColor } = display;
  console.log("BorderColro", borderColor);

  return (
    <div className="countdown" style={{ color: digitsColor }}>
      {timeUnits.map((unit, index) => (
        <React.Fragment key={unit.label}>
          <div className="countdown-item">
            <span className="countdown-number">{unit.value}</span>
            <span className="countdown-label">{unit.label}</span>
          </div>
          {index < timeUnits.length - 1 && (
            <span className="divider" style={{ backgroundColor: borderColor }}>
              /
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default MinimalistCountdown;
