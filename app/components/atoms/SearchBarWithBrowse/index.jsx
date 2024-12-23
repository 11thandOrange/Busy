import React, { useState } from "react";
import CustomTextField from "../CustomTextField";
import { SearchIcon } from "@shopify/polaris-icons";
import { Button, Icon } from "@shopify/polaris";
import "./style.css";
import ProductListingWithSearchBar from "../ProductListingWithSearchBar";

const SearchBarWithBrowse = () => {
  const [activePopup, setActivePopup] = useState(false);
  const toggleModal = () => {
    setActivePopup((prevState) => !prevState);
  };
  return (
    <div>
      <div className="product-listing-with-search-bar">
        <CustomTextField
          prefix={<Icon source={SearchIcon} tone="base" />}
          placeholder="Search products or collections"
          onValueChange={() => {
            toggleModal();
          }}
          autoFocus={true}
        ></CustomTextField>
        <Button
          onClick={() => {
            toggleModal();
          }}
        >
          Browse
        </Button>
      </div>
      <ProductListingWithSearchBar
        open={activePopup}
        onClose={toggleModal}
      ></ProductListingWithSearchBar>
      <div></div>
    </div>
  );
};

export default SearchBarWithBrowse;
