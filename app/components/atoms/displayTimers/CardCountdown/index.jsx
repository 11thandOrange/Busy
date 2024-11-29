import React from "react";
import "./style.css";

const CardCountdown = ({ timeUnits, settingsState }) => {
  const { display } = settingsState;
  const { digitsColor, backgroundColor } = display;

  return (
    <div className="CardCountdown" style={{ color: digitsColor }}>
      {timeUnits.map((unit, index) => (
        <React.Fragment key={unit.label}>
          <div className="CardCountdown-item">
            <span
              className="CardCountdown-number"
              style={{ backgroundColor: backgroundColor }}
            >
              {unit.value}
            </span>
            <span
              className="cardCountdown-title"
              style={{ backgroundColor: backgroundColor  }}
            >
              {unit.label}
            </span>
          </div>
          {index < timeUnits.length - 1 && (
            <span className="CardCountdown-divider">:</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default CardCountdown;
