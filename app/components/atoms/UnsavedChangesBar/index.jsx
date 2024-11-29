import { Frame, ContextualSaveBar } from "@shopify/polaris";
import React from "react";
import { FETCHER_STATE } from "../../../utils/constants";
import { isLoading } from "../../../utils/clientFunctions";
import "./style.css";
const UnsavedChangesBar = ({
  message = "Unsaved changes",
  saveActionButtonClick = () => {},
  discardActionButtonClick = () => {},
  show = true,
  fetcherState = FETCHER_STATE.IDLE,
}) => {
  return (
    <div>
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
