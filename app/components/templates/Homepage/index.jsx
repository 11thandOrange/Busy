


import { Page, Button, LegacyTabs } from "@shopify/polaris";
import React from "react";

import { useState, useCallback } from "react";
import "./homepage.css"

function Homepage({tabs,header}) {
  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    []
  );

 

  return (
    <div>
    
      <Page
        backAction={{ content: "Settings", url: "#" }}
        title={header}
        primaryAction={<Button >Activate</Button>}
      >
     
        <LegacyTabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
       
        </LegacyTabs>
        {tabs[selected].component}
      </Page>
      
    
    </div>
  );
}

export default Homepage;
