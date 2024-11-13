import {Frame, ContextualSaveBar} from '@shopify/polaris';
import React from 'react';

const UnsavedChangesBar = ({message='Unsaved changes', saveActionButtonClick = () => {}, discardActionButtonClick = () => {}}) => {
  return (
    <div style={{height: '250px'}}>
      <Frame>
        <ContextualSaveBar
          message={message}
          saveAction={{
            onAction: saveActionButtonClick,
            content:"Save"
          }}
          discardAction={{
            onAction: discardActionButtonClick,
            content:"Discard"
          }}
        />
      </Frame>
    </div>
  );
}


export default UnsavedChangesBar;