import { Checkbox, Icon, Text } from "@shopify/polaris";
import React from "react";
import { GiftCardFilledIcon } from "@shopify/polaris-icons";
const InlineGiftButton = ({ settingsState, onGiftBtnClick = () => {} }) => {
  return (
    <div onClick={onGiftBtnClick}>
      <Checkbox></Checkbox>
      <Icon source={GiftCardFilledIcon} tone="base" />
      <Text variant="headingSm">
        {settingsState?.btnText?.length > 0
          ? settingsState?.btnText
          : "Add a Gift"}
      </Text>
    </div>
  );
};

export default InlineGiftButton;
