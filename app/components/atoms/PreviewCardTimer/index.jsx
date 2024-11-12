import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  fetchDateTimeFromString,
  startCountdown,
  updateCountdownMessage,
} from "../../../utils/clientFunctions";
import "./style.css";
import { COUNTDOWN_TIMER_DISPLAY_FORMAT } from "../../../constants/countdownTimerCustomization";
const PreviewCardTimer = ({ settingsState }) => {
  const { settings, display } = settingsState;
  const { countDownStartAt, countDownEndsAt } = settings;
  const [timeLeft, setTimeLeft] = useState("0");
  const [isFinished, setIsFinished] = useState(false);
  const { title, timerAlignment, titleColor, digitsColor, theme } = display;
  const countdownMessage = useMemo(() => {
    return countDownStartAt && countDownEndsAt
      ? updateCountdownMessage(countDownStartAt, countDownEndsAt, title)
      : title;
  }, [countDownStartAt, countDownEndsAt, title]);

  useEffect(() => {
    const updateCallback = (timeString) => setTimeLeft(timeString);

    const finishCallback = () => {
      setIsFinished(true);
      setTimeLeft("0d 0h 0m 0s");
      console.log("Countdown finished");
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

  const dateTimeArr = useMemo(() => {
    return fetchDateTimeFromString(timeLeft);
  }, [timeLeft]);

  const renderCountdown = useCallback(() => {
    switch (theme) {
      case COUNTDOWN_TIMER_DISPLAY_FORMAT.CLASSIC:
        return (
          <div>
            {dateTimeArr[0] && (
              <span
                style={{ color: digitsColor }}
              >{`${dateTimeArr[0]} days ${dateTimeArr[1]}:${dateTimeArr[2]}:${dateTimeArr[3]}`}</span>
            )}
          </div>
        );

      case COUNTDOWN_TIMER_DISPLAY_FORMAT.HEXAGON_TIMER:
        return <h1>Hexagon timer countdown</h1>;

      case COUNTDOWN_TIMER_DISPLAY_FORMAT.PROGRESS_CIRCLES:
        return <h1>Progress circles countdown</h1>;

      case COUNTDOWN_TIMER_DISPLAY_FORMAT.CARDS:
        return <h1>Cards countdown</h1>;

      case COUNTDOWN_TIMER_DISPLAY_FORMAT.MODERNS:
        return <h1>Moderns countdown</h1>;

      case COUNTDOWN_TIMER_DISPLAY_FORMAT.PROGRESS_BAR:
        return <h1>Progress bar countdown</h1>;

      case COUNTDOWN_TIMER_DISPLAY_FORMAT.MINIMALIST:
        return <h1>Minimalist countdown</h1>;

      default:
        return null;
    }
  }, [theme, title, titleColor, digitsColor, timeLeft]);

  return (
    <div className={`preview-card-container ${timerAlignment}`}>
      <div style={{ color: titleColor }}>{title}</div> {renderCountdown()}
    </div>
  );
};

export default PreviewCardTimer;
