fetch('/cart/add.js', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      items: [
        {
          id: 43013686296712,  // Replace with valid variant ID
          quantity: 1,
          properties: {
            "Gift Wrap": "Premium Gift Wrap"
          }
        }
      ]
    }),
  })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
fetch('/cart/update.js', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        attributes: {
            "Beautiful Gift Wrap": 'Check Up'
        },
        note: 'Please Wrap Your Gift With Love',
        updates: {
            [43013686296712]: 1
        }
    }),
  })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));

    fetch('/products/' + window.location.pathname.split('/').pop() + '.js')
  .then(response => response.json())
  .then(product => {
    console.log("Product ID from API:", product.id);
  })
  .catch(error => {
    console.error("Error fetching product data:", error);
  });

  function handleAddGift()
  {
    
  }