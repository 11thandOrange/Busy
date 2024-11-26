function checkAppEmbed(themeId) {
    fetch(`/admin/api/2023-10/themes/${themeId}/app-embeds.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': '<ACCESS_TOKEN>',
      },
    })
      .then(response => response.json())
      .then(data => {
        const appEmbeds = data.app_embeds;
        console.log('App Embeds for Active Theme:', appEmbeds);
        const yourAppEmbed = appEmbeds.find(embed => embed.source === 'your-app-source');
  
        if (yourAppEmbed) {
          console.log('Your app embed is active!');
        } else {
          console.log('Your app embed is not active.');
        }
      })
      .catch(error => {
        console.error('Error fetching app embeds:', error);
      });
  }
  