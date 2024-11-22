import { Frame, ContextualSaveBar } from "@shopify/polaris";
import React from "react";
import { FETCHER_STATE } from "../../../utils/constants";
import { isLoading } from "../../../utils/clientFunctions";

const UnsavedChangesBar = ({
  message = "Unsaved changes",
  saveActionButtonClick = () => {},
  discardActionButtonClick = () => {},
  show = true,
  fetcherState = FETCHER_STATE.IDLE,
}) => {
  return (
    <div>
      {show && (
        <Frame>
          <ContextualSaveBar
            message={message}
            saveAction={{
              onAction: saveActionButtonClick,
              content: "Save",
              loading: isLoading(fetcherState),
            }}
            discardAction={{
              onAction: discardActionButtonClick,
              content: "Discard",
            }}
          />
        </Frame>
      )}
    </div>
  );
};

export default UnsavedChangesBar;
