import { storefront_api } from "./function";

export const getActiveTheme = async(shop) =>{
  const themes = await storefront_api(shop, `https://${shop}/admin/api/2024-01/themes.json`, 'GET');
  const activeTheme = themes.data.themes.find((theme)=> theme.role=='main')
  return activeTheme;
  
}

export const checkAppEmbed = async (themeId, session) => {
  try {
    const response = await fetch(`https://${session.shop}/admin/api/2024-01/themes/${themeId}/assets.json?asset[key]=config/settings_data.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': session.accessToken,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch theme assets: ${response.statusText}`);
    }

    const data = await response.json();
    if (!data || !data.asset || !data.asset.value) {
      throw new Error('Asset value is missing in the response.');
    }

    // Parse the JSON value inside the asset
    let current;
    try {
      current = JSON.parse(data.asset.value);
    } catch (jsonError) {
      throw new Error('Error parsing JSON from asset value: ' + jsonError.message);
    }

    // Check if the embed block exists and is disabled
    const blockId = `shopify://apps/busybuddy/blocks/star_rating/${process.env.SHOPIFY_BUSYBUDDY_EMBED_ID}`;
    const disable = Object.values(current.current.blocks).find(block => block.type === blockId);

    if (disable) {
      return disable.disabled;
    } else {
      throw new Error('Embed block not found.');
    }

  } catch (error) {
    // Log detailed error and return error message
    console.error('Error fetching app embeds:', error);
    return { error: error.message };
  }
};


export const getAppEmbedStatus = async (session) => {
  const activeTheme = await getActiveTheme(session.shop);
  return await checkAppEmbed(activeTheme.id, session);
}

export const getAppEmbedUrl = async (session) => {
  const activeTheme = await getActiveTheme(session.shop);
  let url = `https://${session.shop}/admin/themes/${activeTheme.id}/editor?context=apps}`;
  return url;
}