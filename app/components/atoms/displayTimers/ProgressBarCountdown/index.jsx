import React, { useCallback, useMemo } from "react";
import "./style.css";
import { ProgressBar } from "@shopify/polaris";
import {
  calculateProgressPercentage,
  calculateTimeDifferenceInSeconds,
  calculateTotalSeconds,
} from "../../../../utils/clientFunctions";
import useCountdownProgress from "../../../../hooks/useCountdownProgress";

const ProgressBarCountdown = ({
  days,
  hours,
  minutes,
  seconds,

  settingsState,
}) => {
  const { display, settings } = settingsState;
  const { countDownStartAt, countDownEndsAt } = settings;
  const { digitsColor, backgroundColor } = display;
  const { progress } = useCountdownProgress(countDownStartAt, countDownEndsAt, {
    days,
    hours,
    minutes,
    seconds,
  });
  return (
    <div>
      <ProgressBar
        // style={{ backgroundColor: backgroundColor }}
        progress={progress}
        size="small"
      />
      <div className="ProgressBarCountdown" style={{ color: digitsColor }}>
        <div className="ProgressBarCountdown-item">
          <span className="ProgressBarCountdown-number">{days}</span>
        </div>
        <span className="ProgressBarCountdown-divider">:</span>
        <div className="ProgressBarCountdown-item">
          <span className="ProgressBarCountdown-number">{hours}</span>
        </div>
        <span className="ProgressBarCountdown-divider">:</span>
        <div className="ProgressBarCountdown-item">
          <span className="ProgressBarCountdown-number">{minutes}</span>
        </div>
        <span className="ProgressBarCountdown-divider">:</span>
        <div className="ProgressBarCountdown-item">
          <span className="ProgressBarCountdown-number">{seconds}</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressBarCountdown;
