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
}) => {
  const [hasChanged, setHasChanged] = useState(false);
  const [onDiscardChanges, setOnDiscardChanges] = useState(false);

  useEffect(() => {
    setHasChanged(hasChanges(prevState, newState));
  }, [newState, prevState]);


  return (
    <>
      <UnsavedChangesBar
        saveActionButtonClick={handleSaveChanges}
        discardActionButtonClick={() => {
          setOnDiscardChanges(true);
        }}
        show={hasChanged}
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
