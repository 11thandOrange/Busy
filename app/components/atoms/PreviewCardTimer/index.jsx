import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  fetchDateTimeFromString,
  fetchTimeObject,
  startCountdown,
} from "../../../utils/clientFunctions";
import "./style.css";
import { COUNTDOWN_TIMER_DISPLAY_FORMAT } from "../../../constants/countdownTimerCustomization";
import MinimalistCountdown from "../displayTimers/MinimalistCountdown";
import ModernsCountdown from "../displayTimers/ModernsCountdown";
import HexagonCountdown from "../displayTimers/HexagonCountdown";
import ProgressCircleCountdown from "../displayTimers/ProgressCircleCountdown";
import CardCountdown from "../displayTimers/CardCountdown";
import ProgressBarCountdown from "../displayTimers/ProgressBarCountdown";
import ClassicTimer from "../displayTimers/ClassicTimer";

const PreviewCardTimer = ({ settingsState }) => {
  const { settings, display } = settingsState;
  const { countDownStartAt, countDownEndsAt } = settings;
  const { title, timerAlignment, titleColor, digitsColor, theme } = display;

  const [timeLeft, setTimeLeft] = useState({
    remainingDays: 0,
    remainingHours: 0,
    remainingMinutes: 0,
    remainingSeconds: 0,
  });
  const [isFinished, setIsFinished] = useState(false);
 

  const timeObject = useMemo(() => {
    return fetchTimeObject(countDownStartAt, countDownEndsAt);
  }, [countDownStartAt, countDownEndsAt]);

  useEffect(() => {
    const updateCallback = (timeObject) => setTimeLeft(timeObject);
    const finishCallback = () => {
      setIsFinished(true);
      setTimeLeft({
        remainingDays: 0,
        remainingHours: 0,
        remainingMinutes: 0,
        remainingSeconds: 0,
      });
    };

    let interval = null;
    if (countDownStartAt && countDownEndsAt) {
      setIsFinished(false);
      interval = startCountdown(timeObject, updateCallback, finishCallback);
    }

    return () => clearInterval(interval);
  }, [countDownStartAt, countDownEndsAt]);

  const renderCountdown = useCallback(() => {
    const commonProps = {
      days: timeLeft.remainingDays,
      hours: timeLeft.remainingHours,
      minutes: timeLeft.remainingMinutes,
      seconds: timeLeft.remainingSeconds,
      settingsState: settingsState,
    };
    switch (theme) {
      case COUNTDOWN_TIMER_DISPLAY_FORMAT.CLASSIC:
        return (
         <ClassicTimer {...commonProps}></ClassicTimer>
        );

      case COUNTDOWN_TIMER_DISPLAY_FORMAT.HEXAGON_TIMER:
        return <HexagonCountdown {...commonProps}></HexagonCountdown>;

      case COUNTDOWN_TIMER_DISPLAY_FORMAT.PROGRESS_CIRCLES:
        return (
          <ProgressCircleCountdown {...commonProps}></ProgressCircleCountdown>
        );

      case COUNTDOWN_TIMER_DISPLAY_FORMAT.CARDS:
        return <CardCountdown {...commonProps}></CardCountdown>;

      case COUNTDOWN_TIMER_DISPLAY_FORMAT.MODERNS:
        return <ModernsCountdown {...commonProps}></ModernsCountdown>;

      case COUNTDOWN_TIMER_DISPLAY_FORMAT.PROGRESS_BAR:
        return <ProgressBarCountdown {...commonProps}></ProgressBarCountdown>;

      case COUNTDOWN_TIMER_DISPLAY_FORMAT.MINIMALIST:
        return <MinimalistCountdown {...commonProps} />;

      default:
        return null;
    }
  }, [theme, settingsState, timeLeft]);

  console.log("TEST",display.margin.top.value);
  
  return (
    <div
      style={{marginTop:`${display.margin.top.value}${display.margin.top.unit}`,marginBottom:`${display.margin.bottom.value}${display.margin.bottom.unit}`}}
      className={`preview-card-container timer ${timerAlignment} ${
        theme !== COUNTDOWN_TIMER_DISPLAY_FORMAT.CLASSIC
          ? "align-column"
          : "align-row"
      }`}
    >
      <div className="main-countdownt-title" style={{ color: titleColor }}>{title}</div>
      {renderCountdown()}
    </div>
  );
};

export default PreviewCardTimer;
