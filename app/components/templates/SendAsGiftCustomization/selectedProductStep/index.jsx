import React from "react";
import "./style.css";
import { Card, RadioButton, Text } from "@shopify/polaris";
const SelectedProductStep = () => {
  return (
    <div>
      <Card>
        <Text FontWeight="bold">Select products</Text>
        <Text fontWeight="medium">
          The discount will only apply to the selected products.
        </Text>
        <>
          <RadioButton
            label="Any Product"
            checked={true}
            id="Any_Product"
            name="Any_Product"
            onChange={(value) => {}}
          />
          <RadioButton
            label="Specific Products"
            checked={true}
            id="Specific_Products"
            name="Specific_Products"
            onChange={(value) => {}}
          />
        </>
      </Card>
    </div>
  );
};

export default SelectedProductStep;
