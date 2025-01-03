import { check_app_active, getAnnouncementBar, getCartNotice, getCountdownTimer, getInactiveTabMessage, getSendAsGift } from "../utils/function";
import { json } from "@remix-run/node";
import { cors } from "remix-utils/cors";


export const loader = async ({ request }) => {
  let response = {};
  const url = new URL(request.url);
  const appId = parseInt(url.searchParams.get('appId'));
  const shop = url.searchParams.get('shop');
  const timestamp = url.searchParams.get('timezone');
  if(!(await check_app_active(appId, shop)))
  {
    return cors(request, json(response))
  }
  if(appId==1)
  {
    response = await getAnnouncementBar(shop, timestamp);    
  }
  else if(appId == 2)
  {
    response = await getInactiveTabMessage(shop)
  }    
  else if(appId == 3)
  {
    response = await getCartNotice(shop)
  }    
  else if(appId == 4)
  {
    response = await getCountdownTimer(shop)
  } 
  else if(appId == 5)
  {
    response = await getSendAsGift(shop)
  }   
  return cors(request, json(response));  
}