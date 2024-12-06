import { Button, Frame, Modal, TextContainer } from "@shopify/polaris";
import { useState, useCallback } from "react";

export function SliderModal({
  active,
  toggleModal = () => {},
  toRender = <></>,
}) {
  return (
    <div style={{ height: "500px" }}>
      <Frame>
        <Modal open={active} onClose={toggleModal}>
          <Modal.Section>{toRender}</Modal.Section>
        </Modal>
      </Frame>
    </div>
  );
}
