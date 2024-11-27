console.log('Script Added')
const baseUrl = 'https://cb-shelter-scsi-convicted.trycloudflare.com';
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
            eval(data.script);
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

const trackClicks = (elementId) => {
  const observer = new MutationObserver((mutationsList) => {
    const element = document.getElementById(elementId);

    if (element) {
      observer.disconnect();

      element.addEventListener('click', function() {
        sendAnalyticsData(2, { element: elementId, time: new Date().toISOString() });
      });
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
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