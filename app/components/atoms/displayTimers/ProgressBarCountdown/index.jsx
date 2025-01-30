import React from "react";
import "./style.css";
import { ProgressBar } from "@shopify/polaris";
import useCountdownProgress from "../../../../hooks/useCountdownProgress";
import LinearProgressBar from "../../LinearProgressBar";

const ProgressBarCountdown = ({ timeUnits, settingsState }) => {
  const { display, settings } = settingsState;
  const { countDownStartAt, countDownEndsAt } = settings;
  const { digitsColor, backgroundColor } = display;

  const { progress } = useCountdownProgress(countDownStartAt, countDownEndsAt, {
    days: timeUnits.find((unit) => unit.label === "days")?.value,
    hours: timeUnits.find((unit) => unit.label === "hours")?.value,
    minutes: timeUnits.find((unit) => unit.label === "minutes")?.value,
    seconds: timeUnits.find((unit) => unit.label === "seconds")?.value,
  });

  return (
    <div>
      <LinearProgressBar
        progress={progress}
        color={backgroundColor}
      ></LinearProgressBar>
      <div className="ProgressBarCountdown" style={{ color: digitsColor }}>
        {timeUnits.map((unit, index) => (
          <React.Fragment key={unit.label}>
            <div className="ProgressBarCountdown-item">
              <span className="ProgressBarCountdown-number">
                {unit.value} <span className="innerTitle">{unit.label}</span>
              </span>
            </div>
            {index < timeUnits.length - 1 && (
              <span className="ProgressBarCountdown-divider">:</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProgressBarCountdown;
