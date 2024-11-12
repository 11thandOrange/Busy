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

  return updatedState;
};

export function calculateTimeDifference(startDate, endDate) {
  if (!startDate || !endDate) {
    return "";
  }

  const start = new Date(startDate);
  const end = new Date(endDate);
  const now = new Date();

  if (end < now) {
    return "";
  }

  const timeDifference = end - start;
  if (timeDifference < 0 || timeDifference == 0) {
    return "0d 0h 0m 0s";
  }

  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

export function updateCountdownMessage(startDate, endDate, message) {
  const countdown = calculateTimeDifference(startDate, endDate);

  return countdown;
}

export function startCountdown(timeString, updateCallback, finishCallback) {
  const timeParts = timeString.match(/\d+/g).map(Number);

  let days = timeParts[0] ? parseInt(timeParts[0]) : 0;
  let hours = timeParts[1] ? parseInt(timeParts[1]) : 0;
  let minutes = timeParts[2] ? parseInt(timeParts[2]) : 0;
  let seconds = timeParts[3] ? parseInt(timeParts[3]) : 0;

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

    const timeString = `${remainingDays}d ${remainingHours}h ${remainingMinutes}m ${remainingSeconds}s`;

    updateCallback(timeString); // Update the time display via the update callback
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
