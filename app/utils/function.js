import db from '../db.server'
import { authenticate, STARTER_MONTHLY_PLAN, PRO_MONTHLY_PLAN, ENTERPRISE_MONTHLY_PLAN } from "../shopify.server";


export const getShopName = async(request) => {
  let parsedUrl;
  if(request.method=='GET')
  {
    parsedUrl = new URL(request.url);
  }
  else
  {
    parsedUrl = new URL(request.headers.get('referer'));
  }
  const shop = parsedUrl.searchParams.get("shop");
  if (shop) {
    return shop;
  }
  return '';
}
export const getCategories = async() =>{
  try{
    const categories = await db.Category.findMany({
      select: {
        id: true,
        content: true,
      },
    });
    return categories;
  }catch(error)
  {
    return [];
  }
}
export const check_app_active = async (appId, shop) => {
    try {
      const setting = await db.merchant.findFirst({
        where: {
          appId: appId,
          shop: shop,
          enabled: true,
        },
      });
  
      return setting !== null;
    } catch (error) {
      console.error('Error checking setting:', error);
      return false;
    }
  };

export const check_subscription = async () =>
{
  const { billing, session } = await authenticate.admin(request);
  const billingCheck = await billing.check({ plans: [STARTER_MONTHLY_PLAN, PRO_MONTHLY_PLAN, ENTERPRISE_MONTHLY_PLAN] });
  if (!billingCheck.appSubscriptions || billingCheck.appSubscriptions.length === 0) {
    console.log('No subscription found');
    return {
      hasSubscription: false,
    };
  }
  const subscription = billingCheck.appSubscriptions[0];
  console.log('Subscription found:', subscription);

  return {
    hasSubscription: true,
    subscription,
  };
}

export const markWidgetAsFavorite = async(shop, widgetId) => {
  try {
    const existingFavorite = await db.fav_widget.findUnique({
      where: {
        widgetId_shop:{
          shop: shop,
          widgetId: widgetId,
        }
      },
    });

    if (existingFavorite) {
      await db.fav_widget.delete({
        where: {
          widgetId_shop: {
            shop: shop,
            widgetId: widgetId,
          },
        },
      });
      return false;
    }

    const favorite = await db.fav_widget.create({
      data: {
        shop: shop,
        widgetId: widgetId,
      },
    });

    return favorite;
  } catch (error) {
    console.error(error);
    return false;
  }
}
export const createEvent = async(data) => {
  await db.analytics.create({
    data:{
      eventId: data.eventId,
    }
  });
}
export const getEventTypes = async(appId) =>{
  const eventTypes = await db.app.findFirst({
    where: {
      appId: appId,
      shop: shop,
    },
    include:{
      event:true
    }
  });
  return eventTypes;
}