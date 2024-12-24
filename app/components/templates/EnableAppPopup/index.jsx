import React, { useState } from "react";
import { Button, Card, Icon } from "@shopify/polaris";
import { XIcon } from "@shopify/polaris-icons";
import "./style.css";

const EnableAppPopup = ({ show = false, enableAppUrl = "" }) => {
  const [isVisible, setIsVisible] = useState(show);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null; // Hide the component if `isVisible` is false

  return (
    <div className="enable-app-popup">
      <Card className="popup-card">
        <div className="popup-header">
          <p className="popup-title">Busy Buddy Won't Show On Your Store Yet!</p>
          <div className="close-button" onClick={handleClose}>
            <Icon source={XIcon} color="subdued" />
          </div>
        </div>
        <div className="popup-content">
          <p>Complete the installation and your app will show on your store.</p>
          <Button onClick={() => window.open(enableAppUrl, "_blank")} primary>
            Enable in your theme Editor
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default EnableAppPopup;
