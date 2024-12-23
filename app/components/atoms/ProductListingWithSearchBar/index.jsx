import { Button, Checkbox, Icon, Modal } from "@shopify/polaris";
import { useState } from "react";
import CustomTextField from "../CustomTextField";
import { SearchIcon } from "@shopify/polaris-icons";
import "./style.css";
export default function ProductListingWithSearchBar({
  open = false,
  onClose = () => {},
  modalTitle = "Select products and collections",
  primaryActionContent = "Add",
  secondaryActionContent = "Cancel",
  primaryActionOnClick = () => {},
  secondaryActionOnClick = () => {},
  productsList = [],
}) {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const closePopup = () => {
    setSelectedProducts([]);
    setSearchQuery("");
    onClose();
  };

  const handleCheckboxChange = (productId) => {
    setSelectedProducts((prevSelected) => {
      if (prevSelected.includes(productId)) {
        return prevSelected.filter((id) => id !== productId);
      } else {
        return [...prevSelected, productId];
      }
    });
  };

  const handlePrimaryAction = () => {
    primaryActionOnClick(selectedProducts);
    onClose();
  };

  const handleSearchChange = (value) => {
    setSearchQuery(value.toLowerCase());
  };

  const filteredProducts = productsList.filter((product) =>
    product.title.toLowerCase().includes(searchQuery),
  );

  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        title={modalTitle}
        primaryAction={{
          content: primaryActionContent,
          onAction: handlePrimaryAction,
        }}
        secondaryActions={[
          {
            content: secondaryActionContent,
            onAction: closePopup,
          },
        ]}
      >
        <Modal.Section>
          <CustomTextField
            prefix={<Icon source={SearchIcon} tone="base" />}
            placeholder="Search products or collections"
            onValueChange={handleSearchChange}
            value={searchQuery}
          />
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-item">
              <Checkbox
                className="product-checkbox"
                checked={selectedProducts.includes(product.id)}
                onChange={() => handleCheckboxChange(product.id)}
              />
              <img
                src={product?.media?.edges[0]?.node?.preview?.image?.url || ""}
                alt={product?.title || "Product Image"}
              />
              <span>{product.title}</span>
            </div>
          ))}
        </Modal.Section>
      </Modal>
    </div>
  );
}
