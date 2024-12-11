const baseUrl = 'https://busybuddy.projectlabs.in';
const dynamicSegment = 'app/analytics';
const fullUrl = `${baseUrl}/${dynamicSegment}`;
const apifullUrl = `${baseUrl}/app/api`;
const shopDomain = window.location.hostname;
const elementIdMap = {
  'busyBuddyAnnouncementBar': 1,
  'busyBuddyInactiveTabMessage': 2,
  'busyBuddyCartNotice': 3,
  'busyBuddyCountdownTimer': 4,
};

function fetch_request(url, app)
{
    fetch(url+'?appId='+app+'&shop='+shopDomain+'&timezone='+Intl.DateTimeFormat().resolvedOptions().timeZone, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          if(app==4 && data.countdownTimer)
            {
              if(data?.discount_products)
                { 
                  check_product_discount().then(isDiscounted => {
                    if(isDiscounted)
                    {
                      getCountdownTimer(JSON.stringify(data.countdownTimer))
                    }
                  })           
                }
                else
                {

                  getCountdownTimer(JSON.stringify(data.countdownTimer))
                }
            }            
            else
            {
              eval(data.script)
            }          
        })
        .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
        });
}
var apps = ['busyBuddyAnnouncementBar', 'busyBuddyInactiveTabMessage', 'busyBuddyCartNotice', 'busyBuddyCountdownTimer'];

const trackImpressionsForDynamicElements = () => {
  const observer = new MutationObserver((mutationsList) => {
    mutationsList.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (node.nodeType === 1 && apps.includes(node.id)) {
          if (!node.dataset.tracked) {
            node.dataset.tracked = 'true';

          
            const elementObserver = new IntersectionObserver((entries, observer) => {
              entries.forEach(entry => {
                if (entry.isIntersecting) {
                  trackClicks(entry.target.id);
                  sendAnalyticsData(1, { element: entry.target.id, time: new Date().toISOString() });
                  observer.disconnect();
                }
              });
            }, { threshold: 0.5 });
            elementObserver.observe(node);
          }
        }
      });
    });
  });
  observer.observe(document.body, { childList: true, subtree: true });
};

const trackClicks = (elementId) => {
  const elements = document.querySelectorAll('#'+elementId);
  elements.forEach(function(element) {
    element.addEventListener('click', function() {
      sendAnalyticsData(2, { element: elementId, time: new Date().toISOString() });
    });
  }); 
};
trackImpressionsForDynamicElements(); 
apps.forEach((app) => {
  let app_id = elementIdMap[app]
  fetch_request(apifullUrl, app_id);
});

function sendAnalyticsData(activity, data) {
  data.element = elementIdMap[data.element];
  fetch(fullUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ activity, data, pageUrl: window.location.href, shop:shopDomain })
  });
}
function get_product_id()
{
  var currentPath = window.location.pathname;
  var productHandle = currentPath.split('/').pop();
  fetch(`/products/${productHandle}.js`)
    .then(response => response.json())
    .then(data => {
      var productId = data.id;
      return productId;
    })
    .catch(error => {
      console.error('Error fetching product data:', error);
    });
}
function check_product_discount() {
  var currentPath = window.location.pathname;
  var productHandle = currentPath.split('/').pop();
  return fetch(`/products/${productHandle}.js`)
    .then(response => response.json())
    .then(data => {
      return data.compare_at_price && (data.compare_at_price != data.price) ? true : false;
    })
    .catch(error => {
      console.error('Error fetching product data:', error);
      return false;
    });
}

function getTimeDifference(startAt, endsAt) {
  const difference = endsAt - startAt;
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, difference };
}

function get_cart(callback) {
  fetch('/cart.js')
    .then(response => response.json())
    .then(cart => {
      callback(cart);
    })
    .catch(error => {
      console.error('Error fetching cart data:', error);
      callback(0);
    });
}
function get_cart_total(callback) {
  fetch('/cart.js')
    .then(response => response.json())
    .then(cart => {
      const totalPrice = cart.total_price ? (cart.total_price / 100) : 0;
      callback(totalPrice);
    })
    .catch(error => {
      console.error('Error fetching cart data:', error);
      callback(0);
    });
}
function startCountdown(countdownStartAt, countdownEndsAt, element) {
  const startTime = new Date(countdownStartAt);
  const endTime = new Date(countdownEndsAt);
  const currentTime = new Date();
  const timetotal = endTime - startTime;
  const timeleft = endTime - currentTime;
  progress(timeleft, timetotal, element);
}

function progress(timeleft, timetotal, element) {
  var progressBarWidth = (timeleft * element.offsetWidth) / timetotal;
  element.querySelector('.bar').style.transition = "width 1s linear";
  element.querySelector('.bar').style.width = progressBarWidth + 'px';
  element.querySelector('.bar').style.display = 'block';
  if (timeleft > 0) {
    setTimeout(function() {
      progress(timeleft - 1000, timetotal, element);
    }, 1000);
  }
  else
  {
    document.getElementById('busyBuddyCountdownTimer').remove();
  }
}

const circleLength = 440;
function updateProgress(countdownStart, countdownEnd) {
  const daysProgress = document.getElementById('days-progress');
  const hoursProgress = document.getElementById('hours-progress');
  const minutesProgress = document.getElementById('minutes-progress');
  const secondsProgress = document.getElementById('seconds-progress');

  const daysText = document.getElementById('days-text');
  const hoursText = document.getElementById('hours-text');
  const minutesText = document.getElementById('minutes-text');
  const secondsText = document.getElementById('seconds-text');
  const totalDuration = countdownEnd - countdownStart;
  const currentTime = Date.now();
  const timeLeft = countdownEnd - currentTime;

  if (timeLeft <= 0) {
    clearInterval(timerInterval);
    updateCircle(daysProgress, daysText, 0, totalDuration / (1000 * 60 * 60 * 24));
    updateCircle(hoursProgress, hoursText, 0, 24);
    updateCircle(minutesProgress, minutesText, 0, 60);
    updateCircle(secondsProgress, secondsText, 0, 60);
    document.getElementById('busyBuddyCountdownTimer').remove();
    return;
  }

  const daysLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hoursLeft = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const secondsLeft = Math.floor((timeLeft % (1000 * 60)) / 1000);

  updateCircle(daysProgress, daysText, daysLeft, totalDuration / (1000 * 60 * 60 * 24), 'days');
  updateCircle(hoursProgress, hoursText, hoursLeft, 24, 'hours');
  updateCircle(minutesProgress, minutesText, minutesLeft, 60, 'minutes');
  updateCircle(secondsProgress, secondsText, secondsLeft, 60, 'seconds');
}

function updateCircle(progressCircle, textElement, remainingTime, totalTime, title) {
  const progress = (remainingTime / totalTime) * circleLength;
  progressCircle.style.transition = 'none';
  progressCircle.style.strokeDashoffset = circleLength - progress;
  textElement.textContent = remainingTime+' '+title;
  setTimeout(() => {
    progressCircle.style.transition = 'stroke-dashoffset 1s ease';
  }, 50);
}

document.body.addEventListener('click', function(event) {
  if (event.target && event.target.id === 'busyBuddySmartBarButton') {
    const emailInput = document.getElementById('busyBuddySmartBarInput');
    const email = emailInput.value;
  
    if (validateEmail(email)) {
      const formData = {
        email: email,
        shop:window.location.host
      };

      fetch(baseUrl + '/app/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      .then(response => response.json())
      .then(data => {
        document.getElementById('busyBuddySmartBarContainer').innerHTML = data.message
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    } else {
      document.querySelector('.bundle-invalid-email').textContent = 'Please enter a valid email address.';
    }
  }
});

function validateEmail(email) {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(email);
}
function formatDate(date) {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const hh = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
}
function get_current_timestamp()
{
  return Date.now();
}

function get_local_date()
{
  let localTime = new Date();
  return formatDate(new Date(localTime))
}
function getCountdownTimer(countdownTimer)
{
  countdownTimer = JSON.parse(countdownTimer)
  let countdownTimerHtml = '';
  if (countdownTimer) {
    countdownTimer.general_setting = JSON.parse(countdownTimer.general_setting);
    countdownTimer.display_setting = JSON.parse(countdownTimer.display_setting);
    if(countdownTimer.general_setting.status == 'EVERGREEN')
    {
      const randomTimeObject = pickRandomTime(countdownTimer.general_setting.minExpTime, countdownTimer.general_setting.maxExpTime);
      countdownTimer.general_setting.countDownStartAt = get_local_date();
      countdownTimer.general_setting.countDownEndsAt = get_random_time(randomTimeObject);
    }
    if (new Date(countdownTimer.general_setting.countDownStartAt).getTime() <= get_current_timestamp() ) 
    {
        const timeLeft = getTimeDifference(get_current_timestamp(), new Date(countdownTimer.general_setting.countDownEndsAt).getTime());
        console.log(timeLeft)
        countdownTimerHtml += `
          <div style="margin-top:${countdownTimer.display_setting.marginTop}${countdownTimer.display_setting.marginTopUnit}; margin-bottom:${countdownTimer.display_setting.marginBottom}${countdownTimer.display_setting.marginBottomUnit};"
            class="busyBuddyCountdownTimer preview-card-container timer ${countdownTimer.display_setting.timerAlignment} ${
            countdownTimer.display_setting.theme !== 1 ? "align-column" : "align-row"}">
            <div class="main-countdown-title" style="color:${countdownTimer.display_setting.titleColor};">
              ${countdownTimer.display_setting.title}
            </div>
        `;
        
        switch (countdownTimer.display_setting.theme) {
          case 'CLASSIC':
            countdownTimerHtml += getClassicCountdownTimer(timeLeft, countdownTimer);
            break;
          case 'HEXAGON_TIMER':
            countdownTimerHtml += getHexagonCountdownTimer(timeLeft, countdownTimer);
            break;
          case 'PROGRESS_CIRCLES':
            console.log(countdownTimer, 'circle')
            countdownTimerHtml += getProgressCircleCountdownTimer(timeLeft, countdownTimer);
            break;
          case 'CARDS':
            countdownTimerHtml += getCardCountdownTimer(timeLeft, countdownTimer);
            break;
          case 'MODERNS':
            console.log('teset done ')
            countdownTimerHtml += getModernCountdownTimer(timeLeft, countdownTimer);
            break;
          case 'PROGRESS_BAR':
            countdownTimerHtml += getProgressBarCountdownTimer(timeLeft, countdownTimer);
            break;
          case 'MINIMALIST':
            countdownTimerHtml += getDividerCountdownTimer(timeLeft, countdownTimer);
            break;
          default:
            break;
        }

        countdownTimerHtml += '</div>';
        const form = document.querySelector('.product-form');

    if (form) {
      const htmlToInsert = `<div id="busyBuddyCountdownTimer" class="busyBuddyCountdownTimer">${countdownTimerHtml}</div>`;
      form.insertAdjacentHTML('beforebegin', htmlToInsert);

      const countdownStartTime = new Date(countdownTimer.general_setting.countDownStartAt).getTime();
      const countdownEndTime = new Date(countdownTimer.general_setting.countDownEndsAt).getTime();

      if (countdownTimer.display_setting.theme === 'PROGRESS_CIRCLES') {
        updateProgress(countdownStartTime, countdownEndTime);
        const timerInterval = setInterval(() => {
          updateProgress(countdownStartTime, countdownEndTime);
        }, 1000);
      } else if (countdownTimer.display_setting.theme === 'PROGRESS_BAR') {
        startCountdown(countdownTimer.general_setting.countDownStartAt, countdownTimer.general_setting.countDownEndsAt, document.getElementById('progressBar'));

        countdownTimerInterval = setInterval(function() {
          updateCountdownNew(countdownTimer);
        }, 1000);
      } else {
        countdownTimerInterval = setInterval(function() {
          updateCountdownNew(countdownTimer);
        }, 1000);
      }
    }
      }
    }
}
let countdownTimerInterval;

function updateCountdownNew(countdownTimer) {
  const now = get_current_timestamp();
  const endTime = new Date(countdownTimer.general_setting.countDownEndsAt).getTime();
  const difference = getTimeDifference(now, endTime);

  document.getElementById('seconds').textContent = difference.seconds;
  document.getElementById('minutes').textContent = difference.minutes;
  document.getElementById('hours').textContent = difference.hours;
  document.getElementById('days').textContent = difference.days;
  if (difference.difference <= 0) {
    const countdownElement = document.getElementById('busyBuddyCountdownTimer');
    if (countdownElement) {
      countdownElement.remove();
    }
    clearInterval(countdownTimerInterval);
  }
}

 function  getClassicCountdownTimer(timeLeft, countdownTimer) 
{
    let countdownTimerHtml;
    countdownTimerHtml = `<div>
        <span style="color:${countdownTimer.display_setting?.digitsColor}">
            <span id="days">${timeLeft.days}</span>d <span id="hours">${timeLeft.hours}</span>h <span id="minutes">${timeLeft.minutes}</span>m <span id="seconds">${timeLeft.seconds}</span>s
        </span>
    </div>`
    return countdownTimerHtml;
}
 const getHexagonCountdownTimer = (timeLeft, countdownTimer) =>
{
    let countdownTimerHtml;
    countdownTimerHtml = `<div class="HexagonCountdown" style="color:${countdownTimer.display_setting?.digitsColor};border-color:${countdownTimer.display_setting?.borderColor};">
        <div class="HexagonCountdown-item">
        
        <span class="HexagonCountdown-number"><div class="borderColor" style="background: ${countdownTimer.display_setting.borderColor};">${timeLeft.days}</div><spann id="days">${timeLeft.days}</span></span>
        <span class="hexaValue">days</span>
        </div>

        <div class="HexagonCountdown-item">
        <span class="HexagonCountdown-number"><div class="borderColor" style="background: ${countdownTimer.display_setting.borderColor};">${timeLeft.hours}</div><span id="hours">${timeLeft.hours}</span></span>
        <span class="hexaValue">hours</span>
        </div>

        <div class="HexagonCountdown-item">
        <span class="HexagonCountdown-number"><div class="borderColor" style="background: ${countdownTimer.display_setting.borderColor};">${timeLeft.minutes}</div><span id="minutes">${timeLeft.minutes}</span></span>
        <span class="hexaValue">minutes</span>
        </div>

        <div class="HexagonCountdown-item">
        <span class="HexagonCountdown-number"><div class="borderColor" style="background: ${countdownTimer.display_setting.borderColor};">${timeLeft.seconds}</div><span id="seconds">${timeLeft.seconds}</span></span>
        <span class="hexaValue">seconds</span>
        </div>
    </div>`
    return countdownTimerHtml
}
 const getProgressCircleCountdownTimer = (timeLeft, countdownTimer) =>
  {
      let countdownTimerHtml;
      countdownTimerHtml = `<div class="progress-container">
      <div class="progress-wrapper">
        <svg width="100" height="100" viewBox="0 0 200 200">
      <circle class="circle-background" cx="100" cy="100" r="70"></circle>
      <circle class="circle-progress" id="days-progress" cx="100" cy="100" r="70" style="stroke:${countdownTimer.display_setting.borderColor};"></circle>
  </svg>
        <div class="progress-text" id="days-text" style="color:${countdownTimer.display_setting.digitsColor};">0 days</div>
      </div>
  
      <div class="progress-wrapper">
         <svg width="100" height="100" viewBox="0 0 200 200">
      <circle class="circle-background" cx="100" cy="100" r="70"></circle>
      <circle class="circle-progress" id="hours-progress" cx="100" cy="100" r="70" style="stroke:${countdownTimer.display_setting.borderColor};"></circle>
  </svg>
        <div class="progress-text" id="hours-text" style="color:${countdownTimer.display_setting.digitsColor};">0 hours</div>
      </div>
  
      <div class="progress-wrapper">
         <svg width="100" height="100" viewBox="0 0 200 200">
      <circle class="circle-background" cx="100" cy="100" r="70"></circle>
      <circle class="circle-progress" id="minutes-progress" cx="100" cy="100" r="70" style="stroke:${countdownTimer.display_setting.borderColor};"></circle>
  </svg>
        <div class="progress-text" id="minutes-text" style="color:${countdownTimer.display_setting.digitsColor};">0 minutes</div>
      </div>
  
      <div class="progress-wrapper">
        <svg width="100" height="100" viewBox="0 0 200 200">
      <circle class="circle-background" cx="100" cy="100" r="70"></circle>
      <circle class="circle-progress" id="seconds-progress" cx="100" cy="100" r="70" style="stroke:${countdownTimer.display_setting.borderColor};"></circle>
  </svg> ̰
        <div class="progress-text" id="seconds-text" style="color:${countdownTimer.display_setting.digitsColor};">0 seconds</div>
      </div>
    </div>
  
      `;
      return countdownTimerHtml;
  }
 const getCardCountdownTimer = (timeLeft, countdownTimer) =>
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
 const getModernCountdownTimer = (timeLeft, countdownTimer) =>
{
    let countdownTimerHtml;
    countdownTimerHtml = `<div class="ModernsCountdown" style="color: ${countdownTimer.display_setting.digitsColor };">
      <div class="ModernsCountdown-item" style="background: linear-gradient(${countdownTimer.display_setting.gradientStartColor}, ${countdownTimer.display_setting.gradientEndColor});">
        <span class="ModernsCountdown-number" id="days">${timeLeft.days}</span>
      
      </div>
      <span class="ModernsCountdown-divider">:</span>
      <div class="ModernsCountdown-item"  style="background: linear-gradient(${countdownTimer.display_setting.gradientStartColor}, ${countdownTimer.display_setting.gradientEndColor});">
        <span class="ModernsCountdown-number" id="hours">${timeLeft.hours}</span>
        
      </div>
      <span class="ModernsCountdown-divider">:</span>
      <div class="ModernsCountdown-item"  style="background: linear-gradient(${countdownTimer.display_setting.gradientStartColor}, ${countdownTimer.display_setting.gradientEndColor});">
        <span class="ModernsCountdown-number" id="minutes">${timeLeft.minutes}</span>
    
      </div>
      <span class="ModernsCountdown-divider">:</span>
      <div class="ModernsCountdown-item"  style="background: linear-gradient(${countdownTimer.display_setting.gradientStartColor}, ${countdownTimer.display_setting.gradientEndColor});">
        <span class="ModernsCountdown-number" id="seconds">${timeLeft.seconds}</span>
       
      </div>
    </div>`
  return countdownTimerHtml;
}
 const  getProgressBarCountdownTimer = (timeLeft, countdownTimer) =>
{
    let countdownTimerHtml;
    countdownTimerHtml = `
    <div id="progressBar">
      <div class="bar" style="background-color:${countdownTimer.display_setting.backgroundColor}"></div>
    </div>
    <div class="ProgressBarCountdown" style="color: ${countdownTimer.display_setting.digitsColor };">
        <div class="ProgressBarCountdown-item">
          <span class="ProgressBarCountdown-number"><span id="days">${timeLeft.days}</span> <span class="innerTitle">days</span></span>
        </div>
        <span class="ProgressBarCountdown-divider">:</span>
        <div class="ProgressBarCountdown-item">
          <span class="ProgressBarCountdown-number"><span id="hours">${timeLeft.hours}</span> <span class="innerTitle">hours</span></span>
        </div>
        <span class="ProgressBarCountdown-divider">:</span>
        <div class="ProgressBarCountdown-item">
          <span class="ProgressBarCountdown-number"><span id="minutes">${timeLeft.minutes}</span> <span class="innerTitle">minutes</span></span>
        </div>
        <span class="ProgressBarCountdown-divider">:</span>
        <div class="ProgressBarCountdown-item">
          <span class="ProgressBarCountdown-number"><span id="seconds">${timeLeft.seconds}</span> <span class="innerTitle">seconds</span></span>
        </div>
      </div>`
    return countdownTimerHtml
}
 const getDividerCountdownTimer = (timeLeft, countdownTimer) =>
{
    let countdownTimerHtml;
    countdownTimerHtml = `<div class="countdown" style="color: ${countdownTimer.display_setting.digitsColor };">
      <div class="countdown-item">
        <span class="countdown-number" id="days">${timeLeft.days}</span>
        <span class="countdown-label">days</span>
      </div>
      ${divider(countdownTimer)}
      <div class="countdown-item">
        <span class="countdown-number" id="hours">${timeLeft.hours}</span>
        <span class="countdown-label">hours</span>
      </div>
      ${divider(countdownTimer)}
      <div class="countdown-item">
        <span class="countdown-number" id="minutes">${timeLeft.minutes}</span>
        <span class="countdown-label">minutes</span>
      </div>
      ${divider(countdownTimer)}
      <div class="countdown-item">
        <span class="countdown-number" id="seconds">${timeLeft.seconds}</span>
        <span class="countdown-label">seconds</span>
      </div>
    </div>`;
    return countdownTimerHtml;
}
function divider(countdownTimer)
{
    return `<span class="divider" style="background-color: ${countdownTimer.display_setting.borderColor };">
        /
      </span>`;
}
 
const get_random_time = (randomTime) =>
{
  const countdownEndsAt = new Date();
  countdownEndsAt.setSeconds(countdownEndsAt.getSeconds() + randomTime.seconds);
  countdownEndsAt.setMinutes(countdownEndsAt.getMinutes() + randomTime.minutes);
  countdownEndsAt.setHours(countdownEndsAt.getHours() + randomTime.hours);
  countdownEndsAt.setDate(countdownEndsAt.getDate() + randomTime.days); 
  return countdownEndsAt;
}
 
const pickRandomTime = (minExp, maxExp) => {
    const currentTime = new Date();
    const currentMinutes = currentTime.getMinutes() + currentTime.getHours() * 60 + currentTime.getDate() * 24 * 60;
    const minTotalMinutes = minExp.days * 24 * 60 + minExp.hours * 60 + minExp.minutes;
    const maxTotalMinutes = maxExp.days * 24 * 60 + maxExp.hours * 60 + maxExp.minutes;
  
    if (minTotalMinutes < currentMinutes) {
      minExp = { days: currentTime.getDate(), hours: currentTime.getHours(), minutes: currentTime.getMinutes() };
    }
  
    if (minTotalMinutes > maxTotalMinutes) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }
  
    const randomMinutes =
      Math.floor(Math.random() * (maxTotalMinutes - minTotalMinutes + 1)) +
      minTotalMinutes;
  
    const days = Math.floor(randomMinutes / (24 * 60));
    const hours = Math.floor((randomMinutes % (24 * 60)) / 60);
    const minutes = randomMinutes % 60;
  
    return {
      days,
      hours,
      minutes,
      seconds: 0,
    };
  };
function get_local_time()
{
 
  let localDate = new Date();
  const year = localDate.getFullYear();
  const month = localDate.getMonth();
  const day = localDate.getDate();
  const hours = localDate.getHours();
  const minutes = localDate.getMinutes();
  const seconds = localDate.getSeconds();
  const milliseconds = localDate.getMilliseconds();

  return new Date(Date.UTC(year, month, day, hours, minutes, seconds, milliseconds)).getTime();

}