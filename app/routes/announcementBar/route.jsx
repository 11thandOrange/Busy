import React from "react";
import Settings from "../../components/templates/AnnouncementCustomization";
import { ANNOUNCEMENT_BAR_TYPES } from "../../constants/announcementBarConfig";
import db from "../../db.server";
import { cors } from 'remix-utils/cors';
import { getShopName } from "../../utils/function";

export async function loader({ request }) {
  const shop = await getShopName(request)
  let announcement_bars = await db.announcement_bar.findMany({
    where:{
      shop: shop
    },
    select:{
      id: true,
      name: true,       
      status : true,
      general_setting: true,
      theme_style: true,
      theme_setting: true
    }
  });
  return cors(request, announcement_bars);
}

export async function action({ request }) {

  let shop = await getShopName(request)
  let data = await request.formData();
  data = Object.fromEntries(data);
  const name = data.name;
  const _action = data._action;


  let response;

  switch (_action) {
    case "CREATE":
      const announcement_bar = await db.Announcement_bar.create({
        data: {
          name,
          shop,
        },
      });

      response = json({ message: "Announcement Bar Added", method: _action });
      return cors(request, response);

    case "DELETE":
      await db.Announcement_bar.deleteMany({
        where: {
          id: data.announcement_bar_id,
          shop: shop
        },
      });
      response = json({ success: true });
      return cors(request, response);
    default:
      return new Response("Method Not Allowed", { status: 405 });
  }

}

const route = () => {
  return (
    <div>
      <AnnouncementCustomization
        announcementBarType={ANNOUNCEMENT_BAR_TYPES.TEXT}
      ></AnnouncementCustomization>
    </div>
  );
};

export default route;
