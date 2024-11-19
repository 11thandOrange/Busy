import {
  calculateProgressPercentage,
  calculateTimeDifferenceInSeconds,
  calculateTotalSeconds,
} from "../utils/clientFunctions";
import { useMemo } from "react";

const useCountdownProgress = (
  countDownStartAt,
  countDownEndsAt,
  { days, hours, minutes, seconds },
) => {
  const totalTime = useMemo(() => {
    return calculateTimeDifferenceInSeconds(countDownStartAt, countDownEndsAt);
  }, [countDownStartAt, countDownEndsAt]);

  const currentTime = useMemo(() => {
    return calculateTotalSeconds({ days, hours, minutes, seconds });
  }, [days, hours, minutes, seconds]);

  const progress = useMemo(() => {
    return calculateProgressPercentage(totalTime, currentTime);
  }, [totalTime, currentTime]);

  const daysProgress = useMemo(() => {
    const totalDays = 30; // Total days
    return totalDays ? (days / totalDays) * 100 : 0;
  }, [totalTime, days]);

  const hoursProgress = useMemo(() => {
    return (hours / 24) * 100;
  }, [hours]);

  const minutesProgress = useMemo(() => {
    return (minutes / 60) * 100;
  }, [minutes]);

  const secondsProgress = useMemo(() => {
    return (seconds / 60) * 100;
  }, [seconds]);

  return {
    totalTime,
    currentTime,
    progress,
    daysProgress,
    hoursProgress,
    minutesProgress,
    secondsProgress,
  };
};

export default useCountdownProgress;
