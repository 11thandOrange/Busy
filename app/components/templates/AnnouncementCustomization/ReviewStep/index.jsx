import { Button, Card, Icon, Text } from "@shopify/polaris";
import React from "react";
import { EditIcon } from "@shopify/polaris-icons";

const ReviewStep = ({
  settingsState,
  enableAppInStore,
  enableApp,
  setSelectedStep,
}) => {
  const editButtonList = [
    { id: 0, title: "Customize Appearance" },
    { id: 1, title: "Enable App" },
    { id: 2, title: "Enable App in Store" },
  ];

  const filteredEditButtonList = editButtonList.filter((btn) => {
    if ((btn.id === 1 && enableApp) || (btn.id === 2 && enableAppInStore)) {
      return false;
    }
    return true;
  });

  const renderEditButton = (btn, index) => (
    <li key={btn.id} className="edit-button-item">
      <Text>{btn.title}</Text>
      <div
        className="edit-button-icon"
        onClick={() => setSelectedStep(index)}
        style={{ cursor: "pointer" }}
      >
        <Icon source={EditIcon} tone="base" />
      </div>
    </li>
  );

  return (
    <div>
      <h3>Review Settings</h3>
      <Card>
        <ul className="edit-button-list">
          {filteredEditButtonList.map((btn, index) =>
            renderEditButton(btn, index),
          )}
        </ul>
        <Text variant="headingMd" style={{ marginTop: "1rem" }}>
          All Done? Save & Publish!
        </Text>
        {enableAppInStore && <Button>Edit placement in Shopify Store?</Button>}
        <Button variant="primary" style={{ marginTop: "0.5rem" }}>
          Save & Publish
        </Button>
      </Card>
    </div>
  );
};

export default ReviewStep;
