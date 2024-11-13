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

  console.log("updatedState", updatedState);

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
