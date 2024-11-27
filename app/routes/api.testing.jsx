import { authenticate } from "../shopify.server";
import { check_app_active, getAnnouncementBar, getCartNotice, getCountdownTimer, getInactiveTabMessage } from "../utils/function";
import { json } from "@remix-run/node";


export const loader = async ({ request }) => {
    const {session} = await authenticate.admin(request);
    const shop = session.shop;
    const appId = 1;
    let response;
    console.log('new')
  if(!(await check_app_active(appId, shop)))
  {
    console.log('back')
    return json(response)
  }
  if(appId==1)
  {
    console.log('run')
    response = await getAnnouncementBar(shop);
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
  return json(response);  
}