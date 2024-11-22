import { cors } from 'remix-utils/cors';
import { authenticate } from '../shopify.server';
import db from '../db.server'


  export const loader = async ({ request }) => {
    const {admin, session} = await authenticate.admin(request)
   
    const script_tag = new admin.rest.resources.ScriptTag({session: session});

    script_tag.event = "onload";
    script_tag.src = "https://reading-levy-mass-won.trycloudflare.com/scripts/script.js";
    await script_tag.save({
    update: true,
    });
    return cors(request, {});
  };
  export const action = async ({ request }) => {
    const { session } = await authenticate.admin(request);
    let data = await request.formData();
    data = Object.fromEntries(data);
    const appId = parseInt(data.appId);
    const enable = JSON.parse(data.isActive);
    try {
      const existingMerchant = await db.merchant.findFirst({
        where: {
          appId: appId,
          shop: session.shop,
        },
      });
  
      if (existingMerchant) {
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
        console.log('test')
        const newMerchant = await db.merchant.create({
          data: {
            appId: appId,
            shop: session.shop,
            enabled: enable,
          },
        });
        return newMerchant;
      }
    } catch (error) {
      throw new Error("Failed to update or create merchant", error);
    }
  };
  