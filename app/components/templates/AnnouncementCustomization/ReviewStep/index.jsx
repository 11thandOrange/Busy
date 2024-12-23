import { Button, Card, Icon, Text } from "@shopify/polaris";
import React, { useCallback } from "react";
import { EditIcon } from "@shopify/polaris-icons";
import { isLoading } from "../../../../utils/clientFunctions";

const ReviewStep = ({
  settingsState,
  fetcherState,
  enableAppInStore,
  enableApp,
  setSelectedStep,
  editButtonsList = [],
  onSaveAndPublish = () => {},
}) => {
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
          {editButtonsList.map((btn, index) => renderEditButton(btn, index))}
        </ul>
        <Text variant="headingMd" style={{ marginTop: "1rem" }}>
          All Done? Save & Publish!
        </Text>
        {enableAppInStore && <Button>Edit placement in Shopify Store?</Button>}
        <Button
          variant="primary"
          style={{ marginTop: "0.5rem" }}
          onClick={onSaveAndPublish}
          loading={isLoading(fetcherState)}
        >
          Save & Publish
        </Button>
      </Card>
    </div>
  );
};

export default ReviewStep;
