import { authenticate } from "../shopify.server";

export const action = async ({ request }) => {
  const { shop, payload, topic } = await authenticate.webhook(request);
  console.log(`Received ${topic} webhook for ${shop}`);

  // Webhook requests can trigger multiple times and after an app has already been uninstalled.
  // If this webhook already ran, the session may have been deleted previously.
  if (session) {
    await db.session.deleteMany({ where: { shop } });
    await db.cart_notice.deleteMany({ where: { shop } });
    await db.countdown_timer.deleteMany({ where: { shop } });
    await db.inactive_tab_message.deleteMany({ where: { shop } });
    await db.announcement_bar.deleteMany({ where: { shop } });
    await db.announcement_bar_setting.deleteMany({ where: { shop } });
  }

  return new Response();
};
