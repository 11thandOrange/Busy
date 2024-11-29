import { authenticate } from "../../shopify.server";
import db from '../../db.server'

export async function loader({ request }) {
    const {session} = await authenticate.admin(request)
    const shop = session.shop;
    let cartNotice = await db.Cart_notice.findFirst({
      where: {
        shop: shop,
      },
    });
  
    if (!cartNotice) {
      cartNotice = {};
    }
    return json(cartNotice);
  }
  
  export async function action({ request }) {
    let cartNotice = await request.formData();
    cartNotice = Object.fromEntries(cartNotice);
    const shop = await getShopName(request);
    await db.Cart_notice.upsert({
      where: { shop: shop },
      update: {
        primary_message: cartNotice.primary_message,
        secondary_message: cartNotice.secondary_message,
        show_countdown: cartNotice.show_countdown,
        countdown_timer: cartNotice.countdown_timer,
        fire_icon: cartNotice.fire_icon,
        general_setting: cartNotice.general_setting,
        shop: shop,
      },
      create: {
        primary_message: cartNotice.primary_message,
        secondary_message: cartNotice.secondary_message,
        show_countdown: cartNotice.show_countdown,
        countdown_timer: cartNotice.countdown_timer,
        fire_icon: cartNotice.fire_icon,
        general_setting: cartNotice.general_setting,
        shop: shop,
      },
    });
  
    return json(cartNotice);
  }