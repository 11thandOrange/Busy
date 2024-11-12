import React from "react";
import Settings from "../../components/templates/AnnouncementCustomization";
import { ANNOUNCEMENT_BAR_TYPES } from "../../constants/announcementBarConfig";

const route = () => {
  return (
    <div>
      <Settings
        announcementBarType={ANNOUNCEMENT_BAR_TYPES.COUNTDOWN_TIMER}
      ></Settings>
    </div>
  );
};

export default route;
