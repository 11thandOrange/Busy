import { Card, Checkbox } from "@shopify/polaris";
import React from "react";
import { updateState } from "../../../../utils/clientFunctions";

const EnableGiftReceiptStep = ({ settingsState, setSettingsState }) => {
  return (
    <div>
      <Card>
        <Checkbox
          label="Send with gift receipt"
          checked={settingsState.sendWithGiftReceipt}
          onChange={(value) => {
            setSettingsState((prevState) =>
              updateState("sendWithGiftReceipt", value, prevState),
            );
          }}
        ></Checkbox>
        <Checkbox
          label="Send with NO Invoice or receipt"
          checked={settingsState.sendWithNoInvoice}
          onChange={(value) => {
            setSettingsState((prevState) =>
              updateState("sendWithNoInvoice", value, prevState),
            );
          }}
        ></Checkbox>
      </Card>
    </div>
  );
};

export default EnableGiftReceiptStep;
