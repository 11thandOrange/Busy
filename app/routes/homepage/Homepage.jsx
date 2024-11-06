

import { Link } from "@remix-run/react";
import { Page, Button, LegacyCard, LegacyTabs, AppProvider } from "@shopify/polaris";
import React from "react";
import "@shopify/polaris/build/esm/styles.css";
import { useState, useCallback } from "react";
import "./homepage.css"
function LinkWrapper(props) {
  return (
    // TODO: fix type conflix with LegacyRef and Ref between Remix and Polaris
    <Link to={props.url ?? props.to} ref={props.ref} {...props}>
      {props.children}
    </Link>
  );
}
function Homepage({tabs,header}) {
  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    []
  );

 

  return (
    <div>
      <AppProvider
      linkComponent={LinkWrapper}
      i18n={{
        Polaris: {
          Page: {
            Header: {
              rollupButton: 'Actions',
            },
          },
        },
      }}
    >
      <Page
        backAction={{ content: "Settings", url: "#" }}
        title={header}
        primaryAction={<Button >Activate</Button>}
      >
     
        <LegacyTabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
       
        </LegacyTabs>
        {tabs[selected].component}
      </Page>
      
      </AppProvider>
    </div>
  );
}

export default Homepage;
