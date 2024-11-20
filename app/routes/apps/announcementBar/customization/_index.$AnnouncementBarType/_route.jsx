import React, { useEffect } from "react";
import AnnouncementCustomization from "../../../../../components/templates/AnnouncementCustomization";

import { useParams } from "@remix-run/react";
import { ROUTES } from "../../../../../utils/constants";



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
