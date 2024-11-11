import { authenticate } from "../shopify.server";


export const loader = async ({ request }) => {
  const { billing, session } = await authenticate.admin(request);
 
  // App logic

  return null;
};