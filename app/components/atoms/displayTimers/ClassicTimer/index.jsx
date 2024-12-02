import React from "react";
import "./style.css";

const ClassicTimer = ({ timeUnits, settingsState }) => {
  return (
    <div>
      <span style={{ color: settingsState.display.digitsColor }}>
        {timeUnits.map((unit, index) => (
          <React.Fragment key={unit.label}>
            {unit.value}
            {unit.label && <span className="unit-label">{unit.label[0]}</span>}
            {index < timeUnits.length - 1 && <span className="divider">:</span>}
          </React.Fragment>
        ))}
      </span>
    </div>
  );
};

export default ClassicTimer;
