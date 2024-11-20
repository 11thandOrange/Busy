import { check_app_active, getAnnouncementBar, getCartNotice, getCountdownTimer, getInactiveTabMessage } from "../utils/function";
import { json } from "@remix-run/node";


export const loader = async ({ request }) => {
  let response = {};
  const url = new URL(request.url);
  const appId = parseInt(url.searchParams.get('appId'));
  const shop = url.searchParams.get('shop');
  //  Check App is Active Or Not
  if(!(await check_app_active(appId, shop)))
  {
    return json(response)
  }
  if(appId==1)
  {
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