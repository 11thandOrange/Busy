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
        <div className="circle-progress-wrapper">
          <span className="ProgressCircleCountdown-number">{days}</span>
          <span className="">days</span>
        </div>
      </div>
      <span className="ProgressCircleCountdown-divider">:</span>
      <div className="ProgressCircleCountdown-item">
        <CircularProgressBar progress={hoursProgress} color={borderColor} />        
        <div className="circle-progress-wrapper">
          <span className="ProgressCircleCountdown-number">{hours}</span>
          <span className="">hours</span>
        </div>
      </div>
      <span className="ProgressCircleCountdown-divider">:</span>
      <div className="ProgressCircleCountdown-item">
        <CircularProgressBar progress={minutesProgress} color={borderColor} />        
        <div className="circle-progress-wrapper">
          <span className="ProgressCircleCountdown-number">{minutes}</span>
          <span className="">minutes</span>
        </div>
      </div>
      <span className="ProgressCircleCountdown-divider">:</span>
      <div className="ProgressCircleCountdown-item">
        <CircularProgressBar progress={secondsProgress} color={borderColor} />        
        <div className="circle-progress-wrapper">
          <span className="ProgressCircleCountdown-number">{seconds}</span>
          <span className="">seconds</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressCircleCountdown;
