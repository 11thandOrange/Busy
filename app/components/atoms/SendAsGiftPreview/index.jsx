import React from "react";
import "./style.css";
const SendAsGiftPreview = ({ settingsState }) => {
  const imgURL = useMemo(() => {
    // return (
    //   window.URL.createObjectURL(settingsState.giftWrapImage)
    // );
  }, [settingsState.giftWrapImage]);

  return (
    <div>
      <div>
        <div>{settingsState.giftWrapTitle}</div>
        <div>${settingsState.giftWrapPrice}</div>
        <img src={"" || ""}></img>
      </div>
    </div>
  );
};

export default SendAsGiftPreview;
