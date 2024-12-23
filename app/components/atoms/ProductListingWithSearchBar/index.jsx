import { Button, Frame, Icon, Modal, TextContainer } from "@shopify/polaris";
import { useState, useCallback } from "react";
import CustomTextField from "../CustomTextField";
import { SearchIcon } from "@shopify/polaris-icons";

export default function ProductListingWithSearchBar({
  open = false,
  onClose = () => {},
  modalTitle = "Select products and collections",
  primaryActionContent = "Add",
  secondaryActionContent = "Cancel",
  primaryActionOnClick = () => {},
  secondaryActionOnClick = () => {},
}) {
  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        title={modalTitle}
        primaryAction={{
          content: primaryActionContent,
          onAction: primaryActionOnClick,
        }}
        secondaryActions={[
          {
            content: secondaryActionContent,
            onAction: onClose,
          },
        ]}
      >
        <Modal.Section>
          <CustomTextField
            prefix={<Icon source={SearchIcon} tone="base" />}
            placeholder="Search products or collections"
            onValueChange={() => {}}
          ></CustomTextField>
        </Modal.Section>
      </Modal>
    </div>
  );
}
