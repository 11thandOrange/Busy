  import { json } from "@remix-run/node";
  import db from '../db.server';
import { authenticate } from "../shopify.server";
  
  export async function loader({ request}) {
   const {session} = await authenticate.admin(request);
    let countdown_timer = await db.countdown_timer.findFirst({
      where: {
        shop: shop,
      },
    });
  
    if (!countdown_timer) {
      countdown_timer = {};
    }
    return json(countdown_timer);
  }
  
  
  export async function action({ request }) {
    const {session} = await authenticate.admin(request)
    let countdown_timer = await request.formData();
    countdown_timer = Object.fromEntries(countdown_timer);
    await db.countdown_timer.upsert({
      where: { shop: session.shop },
      update: {
        general_setting: countdown_timer.general_setting,
        display_setting: countdown_timer.display_setting,
        position: countdown_timer.position,
        countdown_timer_type: countdown_timer.countdown_timer_type,
        shop: shop
      },
      create: {
        general_setting: countdown_timer.general_setting,
        display_setting: countdown_timer.display_setting,
        position: countdown_timer.position,
        countdown_timer_type: countdown_timer.countdown_timer_type,
        shop: shop
      }
    });
    return json(countdown_timer);
  }