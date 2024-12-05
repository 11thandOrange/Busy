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
  const [colorTheme, setColorTheme] = useState("light");

  const barId = fetchQuery.get("id");
  useEffect(() => {
    if (barId) {
      console.log(barId, "test");
      fetcher.load(ROUTES.ANNOUNCEMENT_OVERVIEW + "?id=" + barId);
    } else {
      fetcher.load(ROUTES.ANNOUNCEMENT_OVERVIEW);
    }
  }, [barId]);

  useEffect(() => {
    if (fetcher.data) {
      console.log(fetcher.data, "fetcher");
      const data = fetcher.data.announcement_customization;

      setColorTheme(fetcher.data.color_theme);
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
      />
    </div>
  );
};

export default Customization;
