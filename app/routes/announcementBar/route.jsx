import React from "react";
import AnnouncementCustomization from "../../components/templates/AnnouncementCustomization";
import { ANNOUNCEMENT_BAR_TYPES } from "../../constants/announcementCustomizationConfig";

const route = () => {
  return (
    <div>
      <AnnouncementCustomization
        announcementBarType={ANNOUNCEMENT_BAR_TYPES.COUNTDOWN_TIMER}
      ></AnnouncementCustomization>
    </div>
  );
};

export default route;
