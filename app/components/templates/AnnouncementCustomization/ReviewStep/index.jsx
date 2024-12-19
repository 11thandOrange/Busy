import { Button, Card, Icon, Text } from "@shopify/polaris";
import React from "react";
import { EditIcon } from "@shopify/polaris-icons";
const ReviewStep = ({ settingsState ,enableAppInStore}) => {
  console.log("settings state in review", settingsState);

  return (
    <div>
      <h3>Review Settings</h3>
      <Card>
        <div
          onClick={() => {
            console.log("Edit Settings");
          }}
        >
          <Icon source={EditIcon} tone="base" />
        </div>
        <Text variant="headingMd">All Done? Save & Publish!</Text>
       {enableAppInStore &&<Button>Edit placement in Shopify Store?</Button>} 
        <Button variant="primary">Save & Publish</Button>
      </Card>
    </div>
  );
};

export default ReviewStep;
