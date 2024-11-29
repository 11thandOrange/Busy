import React, { useEffect, useState } from "react";
import { hasChanges } from "../../../utils/clientFunctions";
import DiscardChangesConfirmationPopup from "../../atoms/DiscardChangesConfirmationPopup";
import UnsavedChangesBar from "../../atoms/UnsavedChangesBar";
import { useFetcher } from "@remix-run/react";
import { FETCHER_STATE } from "../../../utils/constants";

const ManageDataChange = ({
  newState,
  prevState,
  handleSaveChanges,
  handleDiscardChanges,
  fetcherState = FETCHER_STATE.IDLE,
  isError = false,
}) => {
  const [hasChanged, setHasChanged] = useState(false);
  const [onDiscardChanges, setOnDiscardChanges] = useState(false);

  useEffect(() => {
    setHasChanged(hasChanges(prevState, newState));
  }, [newState, prevState]);
  console.log("Inside is error", isError);

  return (
    <>
      <UnsavedChangesBar
        saveActionButtonClick={() => {
          handleSaveChanges();
        }}
        discardActionButtonClick={() => {
          setOnDiscardChanges(true);
        }}
        show={hasChanged && !isError}
        fetcherState={fetcherState}
      />

      <DiscardChangesConfirmationPopup
        active={onDiscardChanges}
        toggleModal={() => setOnDiscardChanges(false)}
        primaryActionClick={() => {
          setOnDiscardChanges(false);
          handleDiscardChanges();
        }}
      />
    </>
  );
};

export default ManageDataChange;
