import { Card, Checkbox } from "@shopify/polaris";
import React from "react";

const EnableGiftReceiptStep = () => {
  return (
    <div>
      <Card>
        <Checkbox label="Send with gift receipt" checked={true}></Checkbox>
        <Checkbox
          label="Send with NO Invoice or receipt"
          checked={false}
        ></Checkbox>
      </Card>
    </div>
  );
};

export default EnableGiftReceiptStep;
