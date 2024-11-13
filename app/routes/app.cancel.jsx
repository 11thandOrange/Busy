import {  redirect } from "@remix-run/node";
import { authenticate } from "../shopify.server";


export const loader = async ({ request }) => {
  const { billing } = await authenticate.admin(request);
  const billingCheck = await billing.check();
  const activeSubscription = billingCheck.appSubscriptions.find(sub => sub.status === 'ACTIVE');
    if (activeSubscription) {
      await billing.cancel({
        subscriptionId: activeSubscription.id,
        isTest: true,
        prorate: true,
       });
       return redirect("/app");
      };
   return redirect("/app");
};