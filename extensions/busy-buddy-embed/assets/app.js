console.log('Script Added ML3')
const baseUrl = 'https://glow-widescreen-transport-aid.trycloudflare.com';
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

fetch_request(apifullUrl)

function fetch_request(url, app)
{
    fetch(url+'?appId='+app+'&shop='+shopDomain, {
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
          console.log(data)
          if(data?.discount_products)
          { 
            check_product_discount().then(isDiscounted => {
              if(isDiscounted)
              {
                eval(data.script);
              }
            })           
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

const trackClicks = () => {
  document.body.addEventListener('click', function(event) {
    const elementId = event.target.id;
    if (apps.includes(elementId)) {
      sendAnalyticsData(2, { element: elementId, time: new Date().toISOString() });
    }
  });
};
trackImpressionsForDynamicElements(); 
apps.forEach((app) => {
  let app_id = elementIdMap[app]
  fetch_request(apifullUrl, app_id);
  trackClicks(app);
});

function sendAnalyticsData(activity, data) {
  data.element = elementIdMap[data.element];
  fetch(fullUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ activity, data, pageUrl: window.location.href, shop:shopDomain, data })
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
  console.log(startTime)
  console.log(endTime)
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
      console.log('Checking progress...');
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




