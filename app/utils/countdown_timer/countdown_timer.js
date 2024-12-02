import useCountdownProgress from "../../hooks/useCountdownProgress";

export function  getClassicCountdownTimer(timeLeft, countdownTimer) 
{
    let countdownTimerHtml;
    countdownTimerHtml = `<div>
        <span style="color:${countdownTimer.display_setting?.digitsColor}">
            ${timeLeft.days}days <span id="hours">${timeLeft.hours}</span>:<span id="minutes">${timeLeft.minutes}</span>:<span id="seconds">${timeLeft.seconds}</span>
        </span>
    </div>`
    return countdownTimerHtml;
}
export const getHexagonCountdownTimer = (timeLeft, countdownTimer) =>
{
    let countdownTimerHtml;
    countdownTimerHtml = `<div class="HexagonCountdown" style="color:${countdownTimer.display_setting?.digitsColor}">
        <div class="HexagonCountdown-item">
        
        <span class="HexagonCountdown-number" id="days"> ${timeLeft.days}</span>
        <span class="hexaValue">days</span>
        </div>

        <div class="HexagonCountdown-item">
        <span class="HexagonCountdown-number" id="hours">${timeLeft.hours}</span>
        <span class="hexaValue">hours</span>
        </div>

        <div class="HexagonCountdown-item">
        <span class="HexagonCountdown-number" id="minutes">${timeLeft.minutes}</span>
        <span class="hexaValue">minutes</span>
        </div>

        <div class="HexagonCountdown-item">
        <span class="HexagonCountdown-number" id="seconds">${timeLeft.seconds}</span>
        <span class="hexaValue">seconds</span>
        </div>
    </div>`
    return countdownTimerHtml
}
export const getProgressCircleCountdownTimer = (timeLeft, countdownTimer) =>
{
    let countdownTimerHtml;
    countdownTimerHtml = `<div class="progress-container">
    <div class="progress-wrapper">
      <svg width="200" height="200">
        <circle class="circle-background" cx="100" cy="100" r="70"></circle>
        <circle class="circle-progress" id="days-progress" cx="100" cy="100" r="70" style="stroke:${countdownTimer.display_setting.borderColor};"></circle>
      </svg>
      <div class="progress-text" id="days-text" style="color:${countdownTimer.display_setting.digitsColor};">0 days</div>
    </div>

    <div class="progress-wrapper">
      <svg width="200" height="200">
        <circle class="circle-background" cx="100" cy="100" r="70"></circle>
        <circle class="circle-progress" id="hours-progress" cx="100" cy="100" r="70" style="stroke:${countdownTimer.display_setting.borderColor};"></circle>
      </svg>
      <div class="progress-text" id="hours-text" style="color:${countdownTimer.display_setting.digitsColor};">0 hours</div>
    </div>

    <div class="progress-wrapper">
      <svg width="200" height="200">
        <circle class="circle-background" cx="100" cy="100" r="70"></circle>
        <circle class="circle-progress" id="minutes-progress" cx="100" cy="100" r="70" style="stroke:${countdownTimer.display_setting.borderColor};"></circle>
      </svg>
      <div class="progress-text" id="minutes-text" style="color:${countdownTimer.display_setting.digitsColor};">0 minutes</div>
    </div>

    <div class="progress-wrapper">
      <svg width="200" height="200">
        <circle class="circle-background" cx="100" cy="100" r="70"></circle>
        <circle class="circle-progress" id="seconds-progress" cx="100" cy="100" r="70" style="stroke:${countdownTimer.display_setting.borderColor};"></circle>
      </svg>
      <div class="progress-text" id="seconds-text" style="color:${countdownTimer.display_setting.digitsColor};">0 seconds</div>
    </div>
  </div>

    `;
    return countdownTimerHtml;
}
export const getCardCountdownTimer = (timeLeft, countdownTimer) =>
{
    let countdownTimerHtml;
    countdownTimerHtml = `<div class="CardCountdown" style="color: ${countdownTimer.display_setting.digitsColor };">
      <div class="CardCountdown-item">
        <span class="CardCountdown-number" id="days">${timeLeft.days}</span>
        <span class="cardCountdown-title">days</span>
      </div>
      <span class="CardCountdown-divider">:</span>
      <div class="CardCountdown-item">
        <span class="CardCountdown-number" id="hours">${timeLeft.hours}</span>
        <span class="cardCountdown-title">hours</span>
      </div>
      <span class="CardCountdown-divider">:</span>
      <div class="CardCountdown-item">
        <span class="CardCountdown-number" id="minutes">${timeLeft.minutes}</span>
        <span class="cardCountdown-title">minutes</span>
      </div>
      <span class="CardCountdown-divider">:</span>
      <div class="CardCountdown-item">
        <span class="CardCountdown-number" id="seconds">${timeLeft.seconds}</span>
        <span class="cardCountdown-title">seconds</span>
      </div>
    </div>`
    return countdownTimerHtml;
}
export const getModernCountdownTimer = (timeLeft, countdownTimer) =>
{
    let countdownTimerHtml;
    countdownTimerHtml = `<div class="ModernsCountdown" style="color: ${countdownTimer.display_setting.digitsColor };">
      <div class="ModernsCountdown-item">
        <span class="ModernsCountdown-number" id="days">${timeLeft.days}</span>
      
      </div>
      <span class="ModernsCountdown-divider">:</span>
      <div class="ModernsCountdown-item">
        <span class="ModernsCountdown-number" id="hours">${timeLeft.hours}</span>
        
      </div>
      <span class="ModernsCountdown-divider">:</span>
      <div class="ModernsCountdown-item">
        <span class="ModernsCountdown-number" id="minutes">${timeLeft.minutes}</span>
    
      </div>
      <span class="ModernsCountdown-divider">:</span>
      <div class="ModernsCountdown-item">
        <span class="ModernsCountdown-number" id="seconds">${timeLeft.seconds}</span>
       
      </div>
    </div>`
  return countdownTimerHtml;
}
export const  getProgressBarCountdownTimer = (timeLeft, countdownTimer) =>
{
    let countdownTimerHtml;
    countdownTimerHtml = `
    <div id="progressBar">
      <div class="bar"></div>
    </div>
    <div class="ProgressBarCountdown" style="color: ${countdownTimer.display_setting.digitsColor };">
        <div class="ProgressBarCountdown-item">
          <span class="ProgressBarCountdown-number" id="days">${timeLeft.days} <span class="innerTitle">days</span></span>
        </div>
        <span class="ProgressBarCountdown-divider">:</span>
        <div class="ProgressBarCountdown-item">
          <span class="ProgressBarCountdown-number" id="hours">${timeLeft.hours}</span>
        </div>
        <span class="ProgressBarCountdown-divider">:</span>
        <div class="ProgressBarCountdown-item">
          <span class="ProgressBarCountdown-number" id="minutes">${timeLeft.minutes}</span>
        </div>
        <span class="ProgressBarCountdown-divider">:</span>
        <div class="ProgressBarCountdown-item">
          <span class="ProgressBarCountdown-number" id="seconds">${timeLeft.seconds}</span>
        </div>
      </div>`
    return countdownTimerHtml
}
export const getDividerCountdownTimer = (timeLeft, countdownTimer) =>
{
    let countdownTimerHtml;
    countdownTimerHtml = `<div class="countdown" style="color: ${countdownTimer.display_setting.digitsColor };">
      <div class="countdown-item">
        <span class="countdown-number" id="days">${timeLeft.days}</span>
        <span class="countdown-label">days</span>
      </div>
      ${divider()}
      <div class="countdown-item">
        <span class="countdown-number" id="hours">${timeLeft.hours}</span>
        <span class="countdown-label">hours</span>
      </div>
      ${divider()}
      <div class="countdown-item">
        <span class="countdown-number" id="minutes">${timeLeft.minutes}</span>
        <span class="countdown-label">minutes</span>
      </div>
      ${divider()}
      <div class="countdown-item">
        <span class="countdown-number" id="seconds">${timeLeft.seconds}</span>
        <span class="countdown-label">seconds</span>
      </div>
    </div>`;
    return countdownTimerHtml;
}
function divider()
{
    return `<span class="divider">
        /
      </span>`;
}
export const get_random_time = (randomTime) =>
{
  const countdownEndsAt = new Date();
  countdownEndsAt.setSeconds(countdownEndsAt.getSeconds() + randomTime.seconds);
  countdownEndsAt.setMinutes(countdownEndsAt.getMinutes() + randomTime.minutes);
  countdownEndsAt.setHours(countdownEndsAt.getHours() + randomTime.hours);
  countdownEndsAt.setDate(countdownEndsAt.getDate() + randomTime.days); 
  return countdownEndsAt;
}