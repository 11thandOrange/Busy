import { json } from "@remix-run/node";
import db from "../../db.server";
import { cors } from 'remix-utils/cors';
import { check_active } from "../../utils/function";

export async function loader({ request }) {
  const url = new URL(request.url);
  const shop = url.searchParams.get("shop");


  if(!check_active('announcement_bar', shop)) {
    return json({
      html: false
    });
  }

  const announcement_bar = await db.announcement_bar.findMany({
    where: {
      shop: shop,
    },
  });


  const response = json({
    ok: true,
    html: announcement_bar,
  });

  return cors(request, response);

}