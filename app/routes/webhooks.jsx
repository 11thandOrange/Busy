import { authenticate } from "../shopify.server";
import db from "../db.server";
import { json } from '@remix-run/node';


export const action = async ({ request }) => {
  const { shop, session, topic } = await authenticate.webhook(request);
  switch (topic) {
    case 'APP_UNINSTALLED':
      if (session) {
        await db.session.deleteMany({ where: { shop } });
        await db.cart_notice.deleteMany({ where: { shop } });
        await db.countdown_timer.deleteMany({ where: { shop } });
        await db.inactive_tab_message.deleteMany({ where: { shop } });
        await db.announcement_bar.deleteMany({ where: { shop } });
        await db.announcement_bar_setting.deleteMany({ where: { shop } });
      }
      break;

    case 'customers/data_request':
     
      break;

    case 'customers/redact':
    
      break;

    case 'shop/redact':
     
      break;

    default:
      
      return json({ error: `Unknown webhook topic: ${topic}` }, { status: 400 });
  }

  // Respond with a 200 status to Shopify to confirm receipt
  return json({ status: 'success' });
};
