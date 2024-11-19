import React, { useEffect, useState } from 'react'
import { hasChanges } from '../../../utils/clientFunctions';
import DiscardChangesConfirmationPopup from '../../atoms/DiscardChangesConfirmationPopup';
import UnsavedChangesBar from '../../atoms/UnsavedChangesBar';

const ManageDataChange = ({newState, prevState, handleSaveChanges, handleDiscardChanges}) => {
    const [hasChanged, setHasChanged] = useState(false);
    const [onDiscardChanges, setOnDiscardChanges] = useState(false);
    console.log('insie the component')
    useEffect(() => {
      setHasChanged(hasChanges(prevState, newState));
    }, [newState, prevState]);
  
    return <>
        <UnsavedChangesBar
            saveActionButtonClick={handleSaveChanges}
            discardActionButtonClick={() => {
                setOnDiscardChanges(true);
            }}
            show={hasChanged}
        />

        <DiscardChangesConfirmationPopup
            active={onDiscardChanges}
            toggleModal={() => setOnDiscardChanges(false)}
            primaryActionClick={() => {
                handleDiscardChanges()
                setOnDiscardChanges(false);
            }}
        />
    </>;
}

export default ManageDataChange