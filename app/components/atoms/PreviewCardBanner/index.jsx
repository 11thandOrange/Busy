import React, { useEffect, useState, useMemo } from "react";
import "./style.css";
import {
  ANNOUNCEMENT_BAR_TYPES,
  ThemeStyleGridType,
} from "../../../constants/announcementBarConfig";
import {
  calculateTimeDifference,
  startCountdown,
  updateCountdownMessage,
} from "../../../utils/clientFunctions";

const PreviewCardBanner = ({ settingsState, announcementBarType }) => {
  const { themeSettings, generalSettings, themeStyle } = settingsState;
  const {
    buttonColor,
    buttonTextColor,
    buttonText,
    message,
    countDownStartAt,
    countDownEndsAt,
  } = generalSettings;
  const [timeLeft, setTimeLeft] = useState("");
  const [isFinished, setIsFinished] = useState(false);
  const bannerStyle = useMemo(() => {
    return themeStyle.type === ThemeStyleGridType.COLOR
      ? { backgroundColor: themeSettings.backgroundColor }
      : { backgroundImage: `url(${themeStyle.image})` };
  }, [themeStyle, themeSettings]);

  const countdownMessage = useMemo(() => {
    if (countDownStartAt && countDownEndsAt) {
      return updateCountdownMessage(countDownStartAt, countDownEndsAt, message);
    }
    return message;
  }, [countDownStartAt, countDownEndsAt, message]);

  const buttonStyles = {
    backgroundColor: buttonColor,
    color: buttonTextColor,
  };
  useEffect(() => {
    if (!countdownMessage) {
      return;
    }
    // Callback to update the remaining time
    const updateCallback = (timeString) => {
      console.log("timer", timeString);

      setTimeLeft(timeString);
    };

    // Callback when the timer finishes
    const finishCallback = () => {
      setIsFinished(true);
      setTimeLeft("0d 0h 0m 0s");
    };
    let interval = null;

    if (countDownStartAt && countDownEndsAt) {
      // Start the countdown with both callbacks
      interval = startCountdown(
        countdownMessage,
        updateCallback,
        finishCallback,
      );
    }

    // Cleanup on component unmount
    return () => clearInterval(interval);
  }, [countDownStartAt, countDownEndsAt]);
  return (
    <div
      className={`ribbon-banner ${themeSettings.status}`}
      style={bannerStyle}
    >
      <p style={{ color: themeSettings.textColor }}>{timeLeft}</p>

      {announcementBarType === ANNOUNCEMENT_BAR_TYPES.EMAIL_CAPTURE && (
        <div>
          <input
            type="email"
            placeholder="Enter your email"
            className="email-input"
          />
          <button className="banner-button" style={buttonStyles}>
            {buttonText}
          </button>
        </div>
      )}
    </div>
  );
};

export default PreviewCardBanner;
