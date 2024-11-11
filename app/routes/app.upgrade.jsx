import { authenticate } from "../shopify.server";


export const loader = async ({ request }) => {
  const { billing,  } = await authenticate.admin(request);
  console.log(billing)
  let plan = 'Starter Subscription';
  let  shop  = 'quickstart.myshopify.com';
  let myShop = shop.replace(".myshopify.com", "");

  await billing.require({
    plans: [plan],
    isTest: true,
    onFailure: async () => billing.request({
      plan: plan
    }),
  });
  // App logic

  return null;
};