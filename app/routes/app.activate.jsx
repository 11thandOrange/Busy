import { cors } from 'remix-utils/cors';
import { authenticate } from '../shopify.server';
import db from '../db.server'


  export const loader = async ({ request }) => {
    const {admin, session} = await authenticate.admin(request)
   
    const script_tag = new admin.rest.resources.ScriptTag({session: session});

    script_tag.event = "onload";
    script_tag.src = "https://nightmare-electronics-knit-cams.trycloudflare.com/scripts/script.js";
    await script_tag.save({
    update: true,
    });
    return cors(request, {});
  };
  