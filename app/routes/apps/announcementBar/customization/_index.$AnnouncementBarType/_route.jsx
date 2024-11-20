import React, { useEffect } from "react";
import AnnouncementCustomization from "../../../../../components/templates/AnnouncementCustomization";

import { useParams } from "@remix-run/react";
import { ROUTES } from "../../../../../utils/constants";

export async function action({ request }) {
  let shop = await getShopName(request);
  let data = await request.formData();
  data = Object.fromEntries(data);
  const name = data.name;
  const status = data.status;
  const general_setting = data.general_setting;
  const theme_style = data.theme_style;
  const theme_setting = data.theme_setting;

  let response;
  const announcement_bar = await db.Announcement_bar.create({
    data: {
      name,
      status,
      general_setting,
      theme_style,
      theme_setting,
      shop,
    },
  });

  response = json({ message: "Announcement Bar Added", announcement_bar });
  return cors(request, response);
}

const Customization = () => {
  const { AnnouncementBarType } = useParams();
  console.log("Inside customization", AnnouncementBarType);

  return (
    <div>
      <AnnouncementCustomization
        announcementBarType={Number(AnnouncementBarType)}
        backActionRoute={ROUTES.ANNOUNCEMENT_OVERVIEW}
      ></AnnouncementCustomization>
    </div>
  );
};

export default Customization;
