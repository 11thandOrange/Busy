import { Button, Popover, ActionList } from "@shopify/polaris";
import { useState, useCallback, useEffect } from "react";
import "./activeButton.css";
import { useSearchParams } from "react-router-dom";
import { useFetcher } from "@remix-run/react";
import useToast from "../../../hooks/useToast";
import ToastBar from "../Toast";
import { isLoading } from "../../../utils/clientFunctions";

export default function ActiveButton({
  beforeActiveString = "Active",
  afterActivateString = "Activate App",
  deactivateString = "Deactivate App",
  isAppActive = false,
  temp = true,
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
    <Button
      onClick={onActiveClick}
      className="active"
      disclosure={isActive}
      loading={isLoading(fetcher.state)}
    >
      {isLoading(fetcher.state)
        ? ""
        : isActive
          ? beforeActiveString
          : afterActivateString}
    </Button>
  );

  return (
    <div className="bb-sec-btn">
      <ToastBar onDismiss={onDismiss} show={showToast} message={toastMessage} />
      <Popover
        active={popoverActive}
        activator={activator}
        autofocusTarget="first-node"
        onClose={togglePopoverActive}
      >
        <div className="bb-deactive-app-btn">
          <ActionList
            actionRole="menuitem"
            items={[{ content: deactivateString }]}
            onActionAnyItem={() => {
              toggleIsActive();
              togglePopoverActive();
            }}
          />
        </div>
      </Popover>
    </div>
  );
}
