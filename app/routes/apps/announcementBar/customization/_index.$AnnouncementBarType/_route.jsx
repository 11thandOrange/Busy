import React, { useEffect, useState } from "react";
import AnnouncementCustomization from "../../../../../components/templates/AnnouncementCustomization";

import { useFetcher, useParams, useSearchParams } from "@remix-run/react";
import { FETCHER_STATE, ROUTES } from "../../../../../utils/constants";
import Spinner from "../../../../../components/atoms/Spinner";
import { isLoading } from "../../../../../utils/clientFunctions";

const Customization = () => {
  const { AnnouncementBarType } = useParams();
  const fetcher = useFetcher();
  const [fetchQuery] = useSearchParams();
  const [customizationData, setCustomizationData] = useState(null);
  const [appActivationState, setAppActivationState] = useState(null);
  const [colorTheme, setColorTheme] = useState("light");
  const barId = fetchQuery.get("id");
  useEffect(() => {
    if (barId) {
      fetcher.load(ROUTES.ANNOUNCEMENT_OVERVIEW + "?id=" + barId);
    } else {
      fetcher.load(ROUTES.ANNOUNCEMENT_OVERVIEW);
    }
  }, [barId]);

  useEffect(() => {
    if (fetcher.data) {
      const data = fetcher.data.announcement_customization;

      setColorTheme(fetcher.data.color_theme);
      console.log("fetching app stgate", fetcher.data);

      setAppActivationState({
        enableApp: fetcher.data.app_active,
        enableAppInStore: fetcher.data.app_embed,
        enableAppInStoreURL: fetcher.data.app_embed_url,
      });
      if (data) {
        setCustomizationData({
          id: data.id,
          status: Number(data.status).toString(),
          name: data.name,
          themeStyle: JSON.parse(data.theme_style),
          themeSettings: JSON.parse(data.theme_setting),
          generalSettings: JSON.parse(data.general_setting),
        });
      }
    }
  }, [fetcher.data]);

  return (
    <div>
      <AnnouncementCustomization
        announcementBarType={Number(AnnouncementBarType)}
        backActionRoute={ROUTES.ANNOUNCEMENT_OVERVIEW}
        initialData={customizationData}
        colorTheme={colorTheme}
        appActivationState={appActivationState}
      />
    </div>
  );
};

export default Customization;
