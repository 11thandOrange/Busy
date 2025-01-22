import {authenticate} from "../shopify.server";


export const loader = async ({ request }) => {
  const { session, billing } = await authenticate.admin(request);
  const url = new URL(request.url);
  const queryParams = new URLSearchParams(url.search);
  const plan = queryParams.get('plan');
  const returnUrl = `https://admin.shopify.com/store/${session.shop.replace('.myshopify.com', '')}/apps/${process.env.BUSY_BUDDY_HANDLE}/app?status=true&message=Subscription Activated`;
  await billing.require({
    plans: [plan],
    isTest: true,
    onFailure: async () => billing.request({ plan: plan, returnUrl: returnUrl }),
  });
return redirect("/app?status=false&message=No Active Subscription");
};