import { Page, Button, LegacyTabs } from "@shopify/polaris";
import React, { useEffect } from "react";

import { useState, useCallback } from "react";
import "./homepage.css";
import ActiveButton from "../../atoms/ActiveButton";
import HomepageDetails from "../../atoms/HomepageDetails";

function Homepage({
  children,
  tabs,
  header = "Tabs",
  onTabChange = () => {},
  selectedTab = 0,
  isAppActive = false,
  handleAppActive = () => {},
  selectedType,
  setSelectedType,
  showPopOver = false,
  showCustomizeBtn = false,
  onCustomizeBtnClick = () => {},
  headerContent = { description: "", points: [] },
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
        primaryAction={<ActiveButton isAppActive={isAppActive}></ActiveButton>}
      >
        <HomepageDetails
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          showPopOver={showPopOver}
          showCustomizeBtn={showCustomizeBtn}
          onCustomizeBtnClick={onCustomizeBtnClick}
          headerContent={headerContent}
        ></HomepageDetails>
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
