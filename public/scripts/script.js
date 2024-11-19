const baseUrl = 'https://guatemala-facts-ab-supplies.trycloudflare.com';
const dynamicSegment = '/app/activate';
const fullUrl = `${baseUrl}/${dynamicSegment}`;
const apifullUrl = `${baseUrl}/app/api`;
const shopDomain = 'quickstart-d7cce324.myshopify.com';

const elementIdMap = {
  'announcement-bar': 1,
  'inactive-tab-message': 2,
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
var apps = ['announcement-bar', 'inactive-tab-message'];

const trackImpression = (elementId) => {
  const observer = new MutationObserver((mutationsList) => {
    const element = document.getElementById(elementId);
    
    if (element) {
      observer.disconnect();
      
      const elementObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            observer.disconnect();
          }
        });
      }, { threshold: 0.5 });

      elementObserver.observe(element);
      sendAnalyticsData(2, { element: elementId, time: new Date().toISOString() });
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
};

const trackClicks = (elementId) => {
  const observer = new MutationObserver((mutationsList) => {
    const element = document.getElementById(elementId);

    if (element) {
      observer.disconnect();

      element.addEventListener('click', function() {
        sendAnalyticsData(1, { element: elementId, time: new Date().toISOString() });
      });
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
};

apps.forEach((app) => {
  app = elementIdMap[app]
  fetch_request(apifullUrl, app);
  trackImpression(app);
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

function addCssLink(cssUrl) {
  // Create a <link> element
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = cssUrl;

  // Append the <link> element to the <head> of the document
  document.head.appendChild(link);
}
addCssLink('https://guatemala-facts-ab-supplies.trycloudflare.com/styles/style.css')