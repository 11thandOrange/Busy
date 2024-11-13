

import { Link } from "@remix-run/react";
import { Page, Button, LegacyCard, LegacyTabs, AppProvider } from "@shopify/polaris";
import React from "react";
import "@shopify/polaris/build/esm/styles.css";
import { useState, useCallback } from "react";
function LinkWrapper(props) {
  return (
    // TODO: fix type conflix with LegacyRef and Ref between Remix and Polaris
    <Link to={props.url ?? props.to} ref={props.ref} {...props}>
      {props.children}
    </Link>
  );
}
function Homepage() {
 return <h1>ello i am here</h1>
}

export default Homepage;
