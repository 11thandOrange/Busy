import {authenticate} from "../shopify.server";


export const loader = async ({ request }) => {
  const { billing } = await authenticate.admin(request);
  const url = new URL(request.url);
  const queryParams = new URLSearchParams(url.search);
  const plan = queryParams.get('plan');
 
  await billing.require({
    plans: [plan],
    isTest: true,
    onFailure: async () => billing.request({ plan: plan }),
  });

  return null;
};