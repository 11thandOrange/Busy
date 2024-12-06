import React, { useEffect, useState } from "react";
import { hasChanges } from "../../../utils/clientFunctions";
import DiscardChangesConfirmationPopup from "../../atoms/DiscardChangesConfirmationPopup";
import UnsavedChangesBar from "../../atoms/UnsavedChangesBar";
import { FETCHER_STATE } from "../../../utils/constants";

const ManageDataChange = ({
  newState,
  prevState,
  handleSaveChanges,
  handleDiscardChanges,
  fetcherState = FETCHER_STATE.IDLE,
  isError = false,
  showDiscardPopup = false,
  showBarInitially = false,
}) => {
  const [hasChanged, setHasChanged] = useState(false);
  const [onDiscardChanges, setOnDiscardChanges] = useState(false);

  useEffect(() => {
    setHasChanged(hasChanges(prevState, newState));
  }, [newState, prevState]);


  const shouldShowBar = showBarInitially || (hasChanged && !isError);

  return (
    <>
      {shouldShowBar && (
        <UnsavedChangesBar
          saveActionButtonClick={() => {
            handleSaveChanges();
          }}
          discardActionButtonClick={() => {
            setOnDiscardChanges(true);
          }}
          
          show={showBarInitially ? hasChanged && !isError : true}
          fetcherState={fetcherState}
        />
      )}

      <DiscardChangesConfirmationPopup
        active={onDiscardChanges || showDiscardPopup}
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
