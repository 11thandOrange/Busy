import React from "react";
import "./style.css";
import { Card, RadioButton, Text } from "@shopify/polaris";
import ProductListingWithSearchBar from "../../../atoms/SearchBarWithBrowse";
import SearchBarWithBrowse from "../../../atoms/SearchBarWithBrowse";
import { PRODUCT_SELECTION_TYPE } from "../../../../constants/sendAsGiftCustomizationConfig";
import { updateState } from "../../../../utils/clientFunctions";
const SelectedProductStep = ({
  productsList = [],
  settingsState,
  setSettingsState,
}) => {
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
            checked={
              settingsState.productType == PRODUCT_SELECTION_TYPE.ANY_PRODUCT
            }
            id="Any_Product"
            name="Any_Product"
            onChange={(value) => {
              setSettingsState((prevState) =>
                updateState(
                  "productType",
                  PRODUCT_SELECTION_TYPE.ANY_PRODUCT,
                  prevState,
                ),
              );
            }}
          />
          <RadioButton
            label="Specific Products"
            checked={
              settingsState.productType ==
              PRODUCT_SELECTION_TYPE.SPECIFIC_PRODUCT
            }
            id="Specific_Products"
            name="Specific_Products"
            onChange={(value) => {
              setSettingsState((prevState) =>
                updateState(
                  "productType",
                  PRODUCT_SELECTION_TYPE.SPECIFIC_PRODUCT,
                  prevState,
                ),
              );
            }}
          />
        </>
        {settingsState.productType ==
          PRODUCT_SELECTION_TYPE.SPECIFIC_PRODUCT && (
          <SearchBarWithBrowse
            productsList={productsList}
            selectedProducts={settingsState.selectedProductList}
            setSelectedProducts={(products) => {
              setSettingsState((prevState) =>
                updateState("selectedProductList", products, prevState),
              );
            }}
           
          ></SearchBarWithBrowse>
        )}
      </Card>
    </div>
  );
};

export default SelectedProductStep;
