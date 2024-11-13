import React, { useEffect, useState, useMemo } from "react";
import "./style.css";
import {
  ANNOUNCEMENT_BAR_TYPES,
  ThemeStyleGridType,
} from "../../../constants/announcementCustomizationConfig";
import {
  fetchTimeObject,
  replaceString,
  startCountdown,
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

  const [timeLeft, setTimeLeft] = useState({
    remainingDays: 0,
    remainingHours: 0,
    remainingMinutes: 0,
    remainingSeconds: 0,
  });
  const [isFinished, setIsFinished] = useState(false);
  const [emailValue, setEmailValue] = useState("");

  const bannerStyle = useMemo(
    () => ({
      backgroundColor:
        themeStyle.type === ThemeStyleGridType.COLOR
          ? themeSettings.backgroundColor
          : null,
      backgroundImage:
        themeStyle.type !== ThemeStyleGridType.COLOR
          ? `url(${themeStyle.image})`
          : null,
      display: isFinished ? "none" : "block",
    }),
    [themeStyle, themeSettings, isFinished],
  );

  // Generate the countdown message dynamically
  const timeObject = useMemo(() => {
    return fetchTimeObject(countDownStartAt, countDownEndsAt);
  }, [countDownStartAt, countDownEndsAt]);

  const buttonStyles = {
    backgroundColor: buttonColor,
    color: buttonTextColor,
  };

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
      console.log("Countdown finished");
    };

    let interval = null;
    if (countDownStartAt && countDownEndsAt) {
      setIsFinished(false);
      interval = startCountdown(timeObject, updateCallback, finishCallback);
    }

    return () => clearInterval(interval);
  }, [countDownStartAt, countDownEndsAt]);
  const timeObjectString = (timeLeft) => {
    return `${timeLeft.remainingDays} days, ${timeLeft.remainingHours} hours, ${timeLeft.remainingMinutes} minutes, ${timeLeft.remainingSeconds} seconds`;
  };
  return (
    <div
      className={`ribbon-banner ${themeSettings.status}`}
      style={bannerStyle}
    >
      <p style={{ color: themeSettings.textColor }}>
        {replaceString(generalSettings.message, timeObjectString(timeLeft))}
      </p>

      {announcementBarType === ANNOUNCEMENT_BAR_TYPES.EMAIL_CAPTURE && (
        <div>
          <input
            type="email"
            placeholder="Enter your email"
            className="email-input"
            onChange={(e) => setEmailValue(e.target.value)}
            value={emailValue}
          />
          <button
            className="banner-button"
            onClick={() => console.log(emailValue)}
            style={buttonStyles}
          >
            {buttonText}
          </button>
        </div>
      )}
    </div>
  );
};

export default PreviewCardBanner;
