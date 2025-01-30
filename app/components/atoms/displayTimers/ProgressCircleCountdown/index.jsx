import React from "react";
import "./style.css";
import CircularProgressBar from "../../CircularProgressBar";
import useCountdownProgress from "../../../../hooks/useCountdownProgress";

const ProgressCircleCountdown = ({ timeUnits, settingsState }) => {
  const { display, settings } = settingsState;
  const { countDownStartAt, countDownEndsAt } = settings;
  const { digitsColor, borderColor } = display;
  const { daysProgress, hoursProgress, minutesProgress, secondsProgress } =
    useCountdownProgress(countDownStartAt, countDownEndsAt, {
      days: timeUnits.find((unit) => unit.label === "days")?.value,
      hours: timeUnits.find((unit) => unit.label === "hours")?.value,
      minutes: timeUnits.find((unit) => unit.label === "minutes")?.value,
      seconds: timeUnits.find((unit) => unit.label === "seconds")?.value,
    });

  const progressUnits = {
    days: daysProgress,
    hours: hoursProgress,
    minutes: minutesProgress,
    seconds: secondsProgress,
  };
  return (
    <div className="ProgressCircleCountdown" style={{ color: digitsColor }}>
      {timeUnits.map((unit, index) => (
        <React.Fragment key={unit.label}>
          <div className="ProgressCircleCountdown-item">
            <CircularProgressBar
              progress={progressUnits[unit.label]}
              color={borderColor}
            />
            <div
              className="circle-progress-wrapper"
              style={{ color: digitsColor }}
            >
              <span className="ProgressCircleCountdown-number">
                {unit.value}
              </span>
              <span className="">{unit.label}</span>
            </div>
          </div>
          {index < timeUnits.length - 1 && (
            <span className="ProgressCircleCountdown-divider">:</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ProgressCircleCountdown;
