import { FETCHER_STATE } from "./constants";

export const updateSettingsState = (path, value, state) => {
  const keys = Array.isArray(path) ? path : path.split(".");

  let updatedState = { ...state };
  let current = updatedState;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];

    if (!current[key] || typeof current[key] !== "object") {
      current[key] = isNaN(keys[i + 1]) ? {} : [];
    }

    current[key] = { ...current[key] };
    current = current[key];
  }

  current[keys[keys.length - 1]] = value;

  // console.log("updatedState", updatedState);

  return updatedState;
};

export function calculateTimeDifferenceInSeconds(startDate, endDate) {
  if (!startDate || !endDate) {
    return 0;
  }

  const start = new Date(startDate);
  const end = new Date(endDate);
  const now = new Date();

  if (end < now) {
    return 0;
  }

  const timeDifference = Math.floor((end - start) / 1000);
  return timeDifference >= 0 ? timeDifference : 0;
}

export function convertSecondsToTimeObject(totalSeconds) {
  const days = Math.floor(totalSeconds / (60 * 60 * 24));
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  return { days, hours, minutes, seconds };
}

export function fetchTimeObject(startDate, endDate) {
  const countdown = calculateTimeDifferenceInSeconds(startDate, endDate);
  const timeObject = convertSecondsToTimeObject(countdown);
  return timeObject;
}

export function startCountdown(timeObject, updateCallback, finishCallback) {
  const { days, hours, minutes, seconds } = timeObject;

  let totalSeconds =
    days * 24 * 60 * 60 + hours * 60 * 60 + minutes * 60 + seconds;

  function updateTimer() {
    if (totalSeconds <= 0) {
      clearInterval(timerInterval);
      finishCallback(); // Trigger finish callback when the timer reaches zero
      return;
    }

    totalSeconds--;

    const remainingDays = Math.floor(totalSeconds / (24 * 60 * 60));
    const remainingHours = Math.floor(
      (totalSeconds % (24 * 60 * 60)) / (60 * 60),
    );
    const remainingMinutes = Math.floor((totalSeconds % (60 * 60)) / 60);
    const remainingSeconds = totalSeconds % 60;

    const remainingTimeObject = {
      remainingDays,
      remainingHours,
      remainingMinutes,
      remainingSeconds,
    };

    updateCallback(remainingTimeObject); // Update the time display via the update callback
  }

  const timerInterval = setInterval(updateTimer, 1000);
  return timerInterval; // Return the interval ID for cleanup if needed
}

export function replaceString(inputString, value) {
  // Regular expression to match any string inside two # symbols
  const regex = /#([^#]+)#/g;

  // Replace the matched string with the value
  return inputString.replace(regex, value);
}

export const isEndDateValid = (endDate) => {
  const endData = new Date(endDate);
  const now = new Date();

  if (endData < now) {
    return false;
  }

  return true;
};
export const fetchDateTimeFromString = (timeString) => {
  if (timeString === "0" || timeString === "0d 0h 0m 0s") {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  const [days, hours, minutes, seconds] = timeString.match(/\d+/g).map(Number);

  return {
    days,
    hours,
    minutes,
    seconds,
  };
};

export function calculateTotalSeconds({
  days = 0,
  hours = 0,
  minutes = 0,
  seconds = 0,
}) {
  const secondsInDay = days * 24 * 60 * 60;
  const secondsInHour = hours * 60 * 60;
  const secondsInMinute = minutes * 60;

  return secondsInDay + secondsInHour + secondsInMinute + seconds;
}

export function calculateRemainingPercentage(totalSeconds, currentSeconds) {
  // Calculate the percentage of remaining time
  const percentage = (currentSeconds / totalSeconds) * 100;
  return percentage.toFixed(2); // return percentage with 2 decimal places
}

export function calculateProgressPercentage(totalSeconds, currentSeconds) {
  if (totalSeconds == 0) {
    return 0;
  }
  const percentage = (currentSeconds / totalSeconds) * 100;
  return percentage;
}

export function hasChanges(prevChanges, newChanges) {
  return !deepEqual(prevChanges, newChanges);
}

function deepEqual(obj1, obj2) {
  if (obj1 === obj2) return true;
  if (
    typeof obj1 !== "object" ||
    obj1 === null ||
    typeof obj2 !== "object" ||
    obj2 === null
  ) {
    return false;
  }
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }
  return true;
}

export function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

//2024-11-20T05:32:32.897Z to Nov 20 at 5:32am
export const formatDateAndTime = (isoDate) => {
  const date = new Date(isoDate);
  const month = date.toLocaleString("en-US", { month: "short" });
  const day = date.getDate();
  const hours = date.getHours() % 12 || 12;
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const amPm = date.getHours() >= 12 ? "pm" : "am";
  return `${month} ${day} at ${hours}:${minutes}${amPm}`;
};

export const isLoading = (fetchState) => {
  return (
    (fetchState === FETCHER_STATE.LOADING) ||
    (fetchState === FETCHER_STATE.SUBMITTING)
  );
};
