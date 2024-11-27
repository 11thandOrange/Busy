import db from '../db.server'
import { authenticate } from '../shopify.server';
 
  export const action = async ({ request }) => {
    const {session} = await authenticate.admin(request)
    const shop = session.shop;
    let data = await request.formData();
    data = Object.fromEntries(data);
    const appId = parseInt(data.appId);
    const enable = JSON.parse(data.isActive);

    try {
      const existingMerchant = await db.merchant.findFirst({
        where: {
          appId: appId,
          shop: shop,
        },
      });
  
      if (existingMerchant) {
        console.log(appId)
        console.log(enable)
        const updatedApp = await db.merchant.update({
          where: {
            id: existingMerchant.id,
          },
          data: {
            enabled: enable,
          },
        });
        return updatedApp;
      } else {
        const newMerchant = await db.merchant.create({
          data: {
            appId: appId,
            shop: shop,
            enabled: enable,
          },
        });
        return newMerchant;
      }
    } catch (error) {
      throw new Error("Failed to update or create merchant");
    }
  };
  