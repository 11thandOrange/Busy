import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  fetchDateTimeFromString,
  startCountdown,
  updateCountdownMessage,
} from "../../../utils/clientFunctions";
import "./style.css";
import { COUNTDOWN_TIMER_DISPLAY_FORMAT } from "../../../constants/countdownTimerCustomization";
import MinimalistCountdown from "../displayTimers/MinimalistCountdown";
import ModernsCountdown from "../displayTimers/ModernsCountdown";
import HexagonCountdown from "../displayTimers/HexagonCountdown";
import ProgressCircleCountdown from "../displayTimers/ProgressCircleCountdown";
import CardCountdown from "../displayTimers/CardCountdown";
import ProgressBarCountdown from "../displayTimers/ProgressBarCountdown";

const PreviewCardTimer = ({ settingsState }) => {
  const { settings, display } = settingsState;
  const { countDownStartAt, countDownEndsAt } = settings;
  const { title, timerAlignment, titleColor, digitsColor, theme } = display;

  const [timeLeft, setTimeLeft] = useState("0");
  const [isFinished, setIsFinished] = useState(false);

  const countdownMessage = useMemo(() => {
    return countDownStartAt && countDownEndsAt
      ? updateCountdownMessage(countDownStartAt, countDownEndsAt, title)
      : title;
  }, [countDownStartAt, countDownEndsAt, title]);

  const dateTimeObj = useMemo(
    () => fetchDateTimeFromString(timeLeft),
    [timeLeft],
  );

  useEffect(() => {
    const updateCallback = (timeString) => setTimeLeft(timeString);
    const finishCallback = () => {
      setIsFinished(true);
      setTimeLeft("0d 0h 0m 0s");
    };

    let interval = null;
    if (countDownStartAt && countDownEndsAt) {
      setIsFinished(false);
      interval = startCountdown(
        countdownMessage,
        updateCallback,
        finishCallback,
      );
    }

    return () => clearInterval(interval);
  }, [countDownStartAt, countDownEndsAt, countdownMessage]);

  const renderCountdown = useCallback(() => {
    switch (theme) {
      case COUNTDOWN_TIMER_DISPLAY_FORMAT.CLASSIC:
        return (
          <div>
            <span style={{ color: digitsColor }}>
              {`${dateTimeObj.days} days ${dateTimeObj.hours}:${dateTimeObj.minutes}:${dateTimeObj.seconds}`}
            </span>
          </div>
        );

      case COUNTDOWN_TIMER_DISPLAY_FORMAT.HEXAGON_TIMER:
        return (
          <HexagonCountdown
            days={dateTimeObj.days}
            hours={dateTimeObj.hours}
            minutes={dateTimeObj.minutes}
            seconds={dateTimeObj.seconds}
            digitsColor={digitsColor}
          ></HexagonCountdown>
        );

      case COUNTDOWN_TIMER_DISPLAY_FORMAT.PROGRESS_CIRCLES:
        return (
          <ProgressCircleCountdown
            days={dateTimeObj.days}
            hours={dateTimeObj.hours}
            minutes={dateTimeObj.minutes}
            seconds={dateTimeObj.seconds}
            digitsColor={digitsColor}
          ></ProgressCircleCountdown>
        );

      case COUNTDOWN_TIMER_DISPLAY_FORMAT.CARDS:
        return (
          <CardCountdown
            days={dateTimeObj.days}
            hours={dateTimeObj.hours}
            minutes={dateTimeObj.minutes}
            seconds={dateTimeObj.seconds}
            digitsColor={digitsColor}
          ></CardCountdown>
        );

      case COUNTDOWN_TIMER_DISPLAY_FORMAT.MODERNS:
        return (
          <ModernsCountdown
            days={dateTimeObj.days}
            hours={dateTimeObj.hours}
            minutes={dateTimeObj.minutes}
            seconds={dateTimeObj.seconds}
            digitsColor={digitsColor}
          ></ModernsCountdown>
        );

      case COUNTDOWN_TIMER_DISPLAY_FORMAT.PROGRESS_BAR:
        return (
          <ProgressBarCountdown
            days={dateTimeObj.days}
            hours={dateTimeObj.hours}
            minutes={dateTimeObj.minutes}
            seconds={dateTimeObj.seconds}
            digitsColor={digitsColor}
          ></ProgressBarCountdown>
        );

      case COUNTDOWN_TIMER_DISPLAY_FORMAT.MINIMALIST:
        return (
          <MinimalistCountdown
            days={dateTimeObj.days}
            hours={dateTimeObj.hours}
            minutes={dateTimeObj.minutes}
            seconds={dateTimeObj.seconds}
            digitsColor={digitsColor}
          />
        );

      default:
        return null;
    }
  }, [theme, dateTimeObj, digitsColor]);

  return (
    <div
      className={`preview-card-container ${timerAlignment} ${
        theme !== COUNTDOWN_TIMER_DISPLAY_FORMAT.CLASSIC
          ? "align-column"
          : "align-row"
      }`}
    >
      <div style={{ color: titleColor }}>{title}</div>
      {renderCountdown()}
    </div>
  );
};

export default PreviewCardTimer;
