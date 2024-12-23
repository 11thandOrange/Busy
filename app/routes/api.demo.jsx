import { authenticate } from "../shopify.server";
import { json } from "@remix-run/node";
import { cors } from "remix-utils/cors";
import { getSendAsGift } from "../utils/function";


export const loader = async ({ request }) => {
    const {session} = await authenticate.admin(request);
    const gift  = await getSendAsGift(session.shop)
    
  return cors(request, json(gift));  
}
