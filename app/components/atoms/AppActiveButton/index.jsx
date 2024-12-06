import React, { useState, useEffect, useCallback } from "react";
import { Popover, ActionList } from "@shopify/polaris";
import "./style.css";

import { useSearchParams } from "react-router-dom";
import { useFetcher } from "@remix-run/react";
import useToast from "../../../hooks/useToast";
import ToastBar from "../Toast";
import { isLoading } from "../../../utils/clientFunctions";

import ToggleSlider from "../ToggleSlider";

export default function AppActiveButton({
  beforeActiveString = "Active",
  afterActivateString = "Activate App",
  deactivateString = "Deactivate App",
  isAppActive = false,
  temp = true,
  appName = "App Name",
}) {
  const fetcher = useFetcher();
  const [popoverActive, setPopoverActive] = useState(false);
  const [isActive, setIsActive] = useState(isAppActive);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("appId");
  const { showToast, onDismiss } = useToast(fetcher);
  const [toastMessage, setToastMessage] = useState("");

  const handleActive = (activeState) => {
    if (temp) {
      fetcher.submit(
        { isActive: activeState ? "true" : "false", appId: id },
        { method: "POST", action: "/app/activate" },
      );
    }
  };

  useEffect(() => {
    setIsActive(isAppActive);
  }, [isAppActive]);

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data) {
      if (fetcher.data.success) {
        setIsActive(fetcher.data.isActive);
        setToastMessage(
          fetcher.data.isActive ? "App Activated" : "App Deactivated",
        );
      } else {
        setToastMessage(fetcher.data.message);
      }
    }
  }, [fetcher]);

  const togglePopoverActive = useCallback(() => {
    setPopoverActive((prev) => !prev);
  }, []);

  const toggleIsActive = useCallback(() => {
    handleActive(!isActive);
  }, [isActive]);

  const onActiveClick = () => {
    if (!isActive) toggleIsActive();
    else togglePopoverActive();
  };

  const activator = (
    <div className="activBtn">
      <ToggleSlider
        isActive={isActive}
        onClick={onActiveClick}
        isLoading={isLoading(fetcher.state)}
      />
    </div>
  );

  return (
    <div className="bb-sec-btn">
      <ToastBar
        onDismiss={onDismiss}
        show={showToast}
        message={toastMessage}
        isError={!fetcher?.data?.success}
      />
      <Popover
        active={popoverActive}
        activator={activator}
        autofocusTarget="first-node"
        onClose={togglePopoverActive}
      >
        <div className="bb-deactive-app-btn">
          <div>
            <p>Are you sure ?</p>
            <ActionList
              actionRole="menuitem"
              items={[{ content: deactivateString }]}
              onActionAnyItem={() => {
                toggleIsActive();
                togglePopoverActive();
              }}
            />
          </div>
          <p>{`${appName} will be unavailable to customers`}</p>
        </div>
      </Popover>
    </div>
  );
}
