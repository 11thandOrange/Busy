import React, { useEffect, useState } from "react";
import CustomTextField from "../CustomTextField";
import { SearchIcon, DeleteIcon } from "@shopify/polaris-icons";
import { Button, Icon, Text } from "@shopify/polaris";
import "./style.css";
import ProductListingWithSearchBar from "../ProductListingWithSearchBar";

const SearchBarWithBrowse = ({
  productsList = [],
  selectedProducts = [],
  setSelectedProducts = () => {},
}) => {
  const [activePopup, setActivePopup] = useState(false);
  const toggleModal = () => {
    setActivePopup((prevState) => !prevState);
  };

  return (
    <div>
      {/* Search bar and browse button */}
      <div className="product-listing-with-search-bar">
        <CustomTextField
          prefix={<Icon source={SearchIcon} tone="base" />}
          placeholder="Search products or collections"
          onValueChange={toggleModal}
          autoFocus={true}
          errorMessage={
            selectedProducts.length == 0 && "Please select at least one product"
          }
        />
        <Button onClick={toggleModal}>Browse</Button>
      </div>

      {/* Product Listing Modal */}
      <ProductListingWithSearchBar
        productsList={productsList}
        open={activePopup}
        onClose={toggleModal}
        primaryActionOnClick={(products) => {
          setSelectedProducts(products);
        }}
        checkedProducts={selectedProducts}
      />

      {/* Selected products */}
      <div className="selected-products">
        {selectedProducts.length > 0 && (
          <Text as="h3" variant="headingMd">
            Selected Products
          </Text>
        )}
        {selectedProducts?.map((product) => (
          <div key={product.id} className="selected-products-item">
            <img
              src={product.media?.edges[0]?.node?.preview?.image?.url || ""}
              alt={product.title}
            />
            <span className="product-title">{product.title}</span>
            <div
              onClick={() => {
                const idToFilter = product.id;
                const filteredProducts = selectedProducts.filter((product) => {
                  return product.id !== idToFilter;
                });

                setSelectedProducts(filteredProducts);
              }}
            >
              <Icon source={DeleteIcon} tone="base" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBarWithBrowse;
