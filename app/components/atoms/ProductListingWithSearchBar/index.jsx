import { Button, Checkbox, Icon, Modal } from "@shopify/polaris";
import { useEffect, useState } from "react";
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
  checkedProducts = [],
}) {
  const [selectedProducts, setSelectedProducts] = useState([]);
  useEffect(() => {
    setSelectedProducts(checkedProducts);
  }, [checkedProducts]);
  const [searchQuery, setSearchQuery] = useState("");

  const closePopup = () => {
    setSelectedProducts([]);
    setSearchQuery("");
    onClose();
  };

  const handleCheckboxChange = (product) => {
    setSelectedProducts((prevSelected) => {
      const exists = prevSelected?.some(
        (selected) => selected.id === product.id,
      );
      if (exists) {
        return prevSelected.filter((selected) => selected.id !== product.id);
      } else {
        return [...prevSelected, product];
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
          <div className="product-list-container">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className={`product-item ${product.disable ? "disabled-product" : ""}`}
              >
                <Checkbox
                  className="product-checkbox"
                  checked={selectedProducts?.some(
                    (selected) => selected.id === product.id,
                  )}
                  onChange={() => handleCheckboxChange(product)}
                />
                <img
                  src={
                    product?.media?.edges[0]?.node?.preview?.image?.url || ""
                  }
                  alt={product?.title || "Product Image"}
                />
                <span>{product.title}</span>
              </div>
            ))}
          </div>
        </Modal.Section>
      </Modal>
    </div>
  );
}
