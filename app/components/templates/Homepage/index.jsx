import { Page, Button, LegacyTabs } from "@shopify/polaris";
import React, { useEffect } from "react";

import { useState, useCallback } from "react";
import "./homepage.css";
import ActiveButton from "../../atoms/ActiveButton";

function Homepage({
  children,
  tabs,
  header = "Tabs",
  onTabChange = () => {},
  selectedTab = 0,
}) {
  const handleTabChange = useCallback((selectedTabIndex) => {
    onTabChange(selectedTabIndex);
  }, []);

  useEffect(() => {
    onTabChange(selectedTab);
  }, []);

  return (
    <div className="bb-tabs-content">
      <Page
        backAction={{ content: "Settings", url: "/apps" }}
        title={header}
        primaryAction={<ActiveButton></ActiveButton>}
      >
        <LegacyTabs
          tabs={tabs}
          selected={selectedTab}
          onSelect={handleTabChange}
        />

        {children}
      </Page>
    </div>
  );
}

export default Homepage;
