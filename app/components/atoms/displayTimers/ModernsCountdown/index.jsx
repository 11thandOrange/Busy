import React from "react";
import "./style.css";

const ModernsCountdown = ({ timeUnits, settingsState }) => {
  const { display } = settingsState;
  const { digitsColor,gradientStartColor,gradientEndColor } = display;

  return (
    <div className="ModernsCountdown" style={{
      color: digitsColor,
    }}>
      {timeUnits.map((unit, index) => (
        <React.Fragment key={unit.label}>
          <div className="ModernsCountdown-item"  style={{ background: `linear-gradient(${gradientStartColor}, ${gradientEndColor})` }}>
            <span className="ModernsCountdown-number">{unit.value}</span>
          </div>
          {index < timeUnits.length - 1 && (
            <span className="ModernsCountdown-divider">:</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ModernsCountdown;
