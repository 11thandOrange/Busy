import { Checkbox } from "@shopify/polaris";
import React from "react";

const InlineGiftButton = ({settingsState,onGiftBtnClick=()=>{}}) => {
  return (
    <div>
      <Checkbox
        label={settingsState.btnText}
        onChange={onGiftBtnClick}
      ></Checkbox>
    </div>
  );
};

export default InlineGiftButton;
