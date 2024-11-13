import { cors } from 'remix-utils/cors';
import { authenticate } from '../shopify.server';
  
  export const loader = async ({ request }) => {
    const {admin, session} = await authenticate.admin(request)
    await admin.rest.resources.ScriptTag.delete({
        session: session,
        id: 216374313120,
      });
    const script_tag = new admin.rest.resources.ScriptTag({session: session});

    script_tag.event = "onload";
    script_tag.src = "https://existing-grammar-discount-williams.trycloudflare.com/scripts/script.js";
    await script_tag.save({
    update: true,
    });
    console.log(request)
    
    return cors(request, {});
  };
