import React from "react";

const DrawerGiftButton = ({ settingsState, onGiftBtnClick = () => {} }) => {
  return (
    <div>
      <button
        style={{ backgroundColor: settingsState.btnColor }}
        onClick={onGiftBtnClick}
      >
        {settingsState.btnText}
      </button>
    </div>
  );
};

export default DrawerGiftButton;
