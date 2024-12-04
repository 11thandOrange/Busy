import db from '../db.server'
import { authenticate } from '../shopify.server';
import { check_subscription as check_app_subscription} from '../utils/function';
import { cors } from 'remix-utils/cors';
import { json } from '@remix-run/node';
 
  export const action = async ({ request }) => {
    const {session} = await authenticate.admin(request)
    const shop = session.shop;
    let data = await request.formData();
    data = Object.fromEntries(data);
    const appId = parseInt(data.appId);
    const enable = JSON.parse(data.isActive);
    if(enable)
    {
      const check_subscription = await check_app_subscription(request);
      const apps =  await db.merchant.findMany({
          where: {
            shop: shop,
            enabled: true,
          }
        });
      if(!check_subscription.hasSubscription && apps.length == 1)
      {
        return  json({"message":"Upgrade Plan", "success":false})
      }
    }
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
        return (json({"success":true, updatedApp}));
      } else {
        const newMerchant = await db.merchant.create({
          data: {
            appId: appId,
            shop: shop,
            enabled: enable,
          },
        });
        return (json({"success": true, newMerchant}));
      }
    } catch (error) {
      throw new Error("Failed to update or create merchant");
    }
  };