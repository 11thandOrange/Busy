import { Button, Frame, Modal, TextContainer } from "@shopify/polaris";
import { useState, useCallback } from "react";
import "./style.css"
export function SliderModal({
  active,
  toggleModal = () => {},
  toRender = <></>,
}) {
  return (
    <div >
      {/* <Frame> */}
        <Modal open={active} onClose={toggleModal} className="ftgvghvjhvj">
          <Modal.Section><div className="slider-modal">{toRender}</div></Modal.Section>
        </Modal>
      {/* </Frame> */}
    </div>
  );
}
