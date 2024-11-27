import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
    const {admin, session} = await authenticate.admin(request)
    const script_tag = new admin.rest.resources.ScriptTag({session: session});
    script_tag.event = "onload";
    script_tag.src = process.env.SHOPIFY_APP_URL+"/scripts/script.js";
    await script_tag.save({
    update: true,
    });
    return cors(request, {});
  };