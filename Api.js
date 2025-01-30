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

  function handleAddGift() {
    let giftWrapProduct = `${gift.id}`
    let bodyData = { updates: { [giftWrapProduct]: 1 } };
    const giftWrapSelected = document.querySelector('#giftWrapCheckbox').checked;
    const giftMessage = document.querySelector('#giftMessageText').value;
    const recipientSelected = document.querySelector('#giftRecipientCheckbox').checked;
    const giftEmailSelected = document.querySelector('#giftEmailCheckbox').checked;

    const attributes = {};
    let note;
    if(gift.notes == true)
    {
      note = `Gift Message : ${giftMessage} Gift Reciept: ${recipientSelected} Gift Email: ${giftEmailSelected}`
      bodyData.note = note;
    }
    else
    {
      if (giftMessage.trim() !== "") {
          attributes["Gift Message"] = giftMessage;
      }
      if (recipientSelected) {
          attributes["Gift Recipient"] = "Yes";
      }
      if (giftEmailSelected) {
          attributes["Gift Email"] = "Yes";
      }
      if (Object.keys(attributes).length > 0) {
        bodyData.attributes = attributes;
      }
    }
    
    fetch('/cart/update.js', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyData),
    })
    .then(response => response.json())
    .then(data => {
        console.log("Cart updated successfully:", data);
    })
    .catch(error => {
        console.error('Error updating cart:', error);
    });

}


fetch('/products/' + window.location.pathname.split('/').pop() + '.js')
    .then(response => response.json())
    .then(product => {
      console.log(product)
        console.log("Product ID from API:", product.id);
    })
    .catch(error => {
        console.error("Error fetching product data:", error);
    });




    fetch('/cart/update.js', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ updates: { ["8456493269128"]: 1 } }),
  })
  .then(response => response.json())
  .then(data => {
      console.log("Cart updated successfully:", data);
  })
  .catch(error => {
      console.error('Error updating cart:', error);
  });