import { Frame, Toast } from "@shopify/polaris";

function ToastBar({
  message = "Success",
  duration = 2000,
  show,
  onDismiss,
  isError = false,
}) {
  return show ? (
    <Frame>
      <Toast
        content={message}
        onDismiss={onDismiss}
        error={isError}
        duration={duration}
      />{" "}
    </Frame>
  ) : null;
}

export default ToastBar;
