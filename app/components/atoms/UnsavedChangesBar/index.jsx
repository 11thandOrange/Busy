import { Frame, ContextualSaveBar } from "@shopify/polaris";
import React from "react";
import { FETCHER_STATE } from "../../../utils/constants";
import { isLoading } from "../../../utils/clientFunctions";
import "./style.css";
const UnsavedChangesBar = ({
  message = "Save Or Discard Your Changes!",
  saveActionButtonClick = () => {},
  discardActionButtonClick = () => {},
  show = true,
  fetcherState = FETCHER_STATE.IDLE,
}) => {
  return (
    <div className="unsaved-changes-bar">
      <Frame>
        <ContextualSaveBar
          message={message}
          saveAction={{
            onAction: saveActionButtonClick,
            content: "Save",
            loading: isLoading(fetcherState),
            disabled: !show,
          }}
          discardAction={{
            onAction: discardActionButtonClick,
            content: "Discard",
            disabled: isLoading(fetcherState),
          }}
        />
      </Frame>
    </div>
  );
};

export default UnsavedChangesBar;
