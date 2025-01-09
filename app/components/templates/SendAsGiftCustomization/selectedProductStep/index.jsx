import React, { useEffect } from "react";
import "./style.css";
import { Card, RadioButton, Text } from "@shopify/polaris";
import ProductListingWithSearchBar from "../../../atoms/SearchBarWithBrowse";
import SearchBarWithBrowse from "../../../atoms/SearchBarWithBrowse";
import {
  GIFT_STATUS,
  PRODUCT_SELECTION_TYPE,
} from "../../../../constants/sendAsGiftCustomizationConfig";
import { updateState } from "../../../../utils/clientFunctions";
import Selector from "../../../atoms/Selector";
export const options = [
  { label: "Active", value: GIFT_STATUS.ACTIVE },
  { label: "Inactive", value: GIFT_STATUS.INACTIVE },
];
const SelectedProductStep = ({
  productsList = [],
  settingsState,
  setSettingsState,
  setError = () => {},
  productExists = [],
}) => {
  useEffect(() => {
    if (settingsState.selectedProductList) {
      if (settingsState.selectionType == PRODUCT_SELECTION_TYPE.ANY_PRODUCT) {
        setError((prevState) => ({
          ...prevState,
          noProductError: false,
        }));
      } else {
        setError((prevState) => ({
          ...prevState,
          noProductError: settingsState.selectedProductList.length == 0,
        }));
      }
    }
  }, [settingsState.selectedProductList, settingsState.selectionType]);
  return (
    <div className="selectGiftProducts">
      <Card>
        <Selector
          options={options}
          label="Status"
          helpText="Only one gift will be displayed at the time"
          onSelect={(value) => {
            setSettingsState((prevState) =>
              updateState("status", value, prevState),
            );
          }}
          initialValue={settingsState.status}
        ></Selector>
      </Card>
      <Card>
        <Text variant="headingMd">
          <div className="subTitleText">Select products </div>
        </Text>
        <Text fontWeight="medium">
          The discount will only apply to the selected products.
        </Text>
        <div className="checkGroup_wrapper">
          <RadioButton
            label="Any Product"
            checked={
              settingsState.selectionType == PRODUCT_SELECTION_TYPE.ANY_PRODUCT
            }
            id="Any_Product"
            name="Any_Product"
            onChange={(value) => {
              setSettingsState((prevState) =>
                updateState(
                  "selectionType",
                  PRODUCT_SELECTION_TYPE.ANY_PRODUCT,
                  prevState,
                ),
              );
            }}
          />
          <RadioButton
            label="Specific Products"
            checked={
              settingsState.selectionType ==
              PRODUCT_SELECTION_TYPE.SPECIFIC_PRODUCT
            }
            id="Specific_Products"
            name="Specific_Products"
            onChange={(value) => {
              setSettingsState((prevState) =>
                updateState(
                  "selectionType",
                  PRODUCT_SELECTION_TYPE.SPECIFIC_PRODUCT,
                  prevState,
                ),
              );
            }}
          />
        </div>
        {settingsState.selectionType ==
          PRODUCT_SELECTION_TYPE.SPECIFIC_PRODUCT && (
          <SearchBarWithBrowse
            productsList={productsList}
            productExists={productExists}
            selectedProducts={settingsState.selectedProductList}
            setSelectedProducts={(products) => {
              setSettingsState((prevState) => {
                return updateState("selectedProductList", products, prevState);
              });
            }}
          ></SearchBarWithBrowse>
        )}
      </Card>
    </div>
  );
};

export default SelectedProductStep;
