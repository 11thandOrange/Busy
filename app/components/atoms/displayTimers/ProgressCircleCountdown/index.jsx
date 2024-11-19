import React from "react";
import "./style.css";
import CircularProgressBar from "../../CircularProgressBar";
import useCountdownProgress from "../../../../hooks/useCountdownProgress";

const ProgressCircleCountdown = ({
  days,
  hours,
  minutes,
  seconds,
  settingsState,
}) => {
  const { display, settings } = settingsState;
  const { countDownStartAt, countDownEndsAt } = settings;
  const { digitsColor, borderColor } = display;
  const { daysProgress, hoursProgress, minutesProgress, secondsProgress } =
    useCountdownProgress(countDownStartAt, countDownEndsAt, {
      days,
      hours,
      minutes,
      seconds,
    });

  return (
    <div className="ProgressCircleCountdown" style={{ color: digitsColor }}>
      <div className="ProgressCircleCountdown-item">
        <CircularProgressBar progress={daysProgress} color={borderColor} />
        <span className="ProgressCircleCountdown-number">{days}</span>
      </div>
      <span className="ProgressCircleCountdown-divider">:</span>
      <div className="ProgressCircleCountdown-item">
        <CircularProgressBar progress={hoursProgress} color={borderColor} />
        <span className="ProgressCircleCountdown-number">{hours}</span>
      </div>
      <span className="ProgressCircleCountdown-divider">:</span>
      <div className="ProgressCircleCountdown-item">
        <CircularProgressBar progress={minutesProgress} color={borderColor} />
        <span className="ProgressCircleCountdown-number">{minutes}</span>
      </div>
      <span className="ProgressCircleCountdown-divider">:</span>
      <div className="ProgressCircleCountdown-item">
        <CircularProgressBar progress={secondsProgress} color={borderColor} />
        <span className="ProgressCircleCountdown-number">{seconds}</span>
      </div>
    </div>
  );
};

export default ProgressCircleCountdown;
