import React, { useEffect } from "react";
import AnnouncementCustomization from "../../../../../components/templates/AnnouncementCustomization";

import { useParams } from "@remix-run/react";
const Customization = () => {
  const { AnnouncementBarType } = useParams();

  return (
    <div>
     
      <AnnouncementCustomization
        announcementBarType={Number(AnnouncementBarType)}
      ></AnnouncementCustomization>
    </div>
  );
};

export default Customization;
