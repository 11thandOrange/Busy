import {authenticate} from "../shopify.server";


export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const queryParams = new URLSearchParams(url.search);
  const plan = queryParams.get('plan');
  const { billing, session } = await authenticate.admin(request);
 
  await billing.require({
    plans: [plan],
    isTest: true,
    onFailure: async () => billing.request({ plan: plan }),
  });

  return null;
};