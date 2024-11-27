import { storefront_api } from "./function";

export const getActiveTheme = async(shop) =>{
  const themes = await storefront_api(shop, `https://${shop}/admin/api/2024-01/themes.json`, 'GET');
  const activeTheme = themes.data.themes.find((theme)=> theme.role=='main')
  return checkAppEmbed(activeTheme.id, shop)
  
}

export const checkAppEmbed = async (themeId, shop) => {
  try {
    const response = await fetch(`https://${shop}/admin/api/2024-01/themes/${themeId}/assets.json?asset[key]=config/settings_data.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': 'shpua_a8212e47580b654d96268a94e258339f',
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch theme assets: ${response.statusText}`);
    }
    const data = await response.json();
    let current = JSON.parse(data.asset.value)
    let disable = Object.values(current.current.blocks).find((block)=>block.type=='shopify://apps/busybuddy/blocks/star_rating/'+process.env.SHOPIFY_BUSYBUDDY_EMBED_ID)
    return  (disable.disabled) ;

  } catch (error) {
    console.error('Error fetching app embeds:', error);
    return { error: error.message };
  }
}