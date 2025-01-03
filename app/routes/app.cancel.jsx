import {  redirect } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import db from '../db.server'


export const loader = async ({ request }) => {
  try {
  const { billing, session } = await authenticate.admin(request);
  const billingCheck = await billing.check();
  const activeSubscription = billingCheck.appSubscriptions.find(sub => sub.status === 'ACTIVE');
    if (activeSubscription) {
      await billing.cancel({
        subscriptionId: activeSubscription.id,
        isTest: true,
        prorate: true,
       });
       const apps =  await db.merchant.findMany({
        where: {
          shop: session.shop,
          enabled: true,
        }
      });
      if (apps.length > 1) {
        const appToKeepEnabled = apps[0];
        for (const app of apps) {
          if (app.id !== appToKeepEnabled.id) {
            await db.merchant.update({
              where: {
                id: app.id,
              },
              data: {
                enabled: false,
              },
            });
          }
        }
      }
      return redirect("/app?status=true&message=Subscription Cancelled");
      };
    } catch (error) {
      return redirect("/app?status=false&message=No Active Subscripiton");
    }
};