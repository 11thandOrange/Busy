import React, { useState } from "react";
import CustomTextField from "../CustomTextField";
import { SearchIcon, DeleteIcon } from "@shopify/polaris-icons";
import { Button, Icon, Text } from "@shopify/polaris";
import "./style.css";
import ProductListingWithSearchBar from "../ProductListingWithSearchBar";

const SearchBarWithBrowse = ({ productsList = [] }) => {
  const [activePopup, setActivePopup] = useState(false);
  const toggleModal = () => {
    setActivePopup((prevState) => !prevState);
  };

  const [selectedProducts, setSelectedProducts] = useState([
    {
      id: "gid://shopify/Product/8803666624745",
      title: "Yellow Snowboard",
      media: { edges: [] },
      priceRange: {
        maxVariantPrice: { amount: "10000.0", currencyCode: "INR" },
      },
    },
    {
      id: "gid://shopify/Product/8803666657513",
      title: "Red Snowboard",
      media: { edges: [] },
      priceRange: {
        maxVariantPrice: { amount: "10000.0", currencyCode: "INR" },
      },
    },
    {
      id: "gid://shopify/Product/8825578914025",
      title: "test",
      media: {
        edges: [
          {
            node: {
              id: "gid://shopify/MediaImage/36456073232617",
              preview: {
                image: {
                  url: "https://cdn.shopify.com/s/files/1/0717/2777/5977/files/e9c2ed7324d6d8e3d2f1daa0cf13d143.png?v=1734936714",
                },
              },
            },
          },
        ],
      },
      priceRange: {
        maxVariantPrice: { amount: "100.0", currencyCode: "INR" },
      },
    },
  ]);

  return (
    <div>
      {/* Search bar and browse button */}
      <div className="product-listing-with-search-bar">
        <CustomTextField
          prefix={<Icon source={SearchIcon} tone="base" />}
          placeholder="Search products or collections"
          onValueChange={toggleModal}
          autoFocus
        />
        <Button onClick={toggleModal}>Browse</Button>
      </div>

      {/* Product Listing Modal */}
      <ProductListingWithSearchBar
        productsList={productsList}
        open={activePopup}
        onClose={toggleModal}
        primaryActionOnClick={(products) => {
          console.log("Selected products", products);
        }}
      />

      {/* Selected products */}
      <div className="selected-products">
        <Text as="h3" variant="headingMd">
          Selected Products
        </Text>
        {selectedProducts.map((product) => (
          <div key={product.id} className="selected-products-item">
            <img
              src={product.media?.edges[0]?.node?.preview?.image?.url || ""}
              alt={product.title}
            />
            <span className="product-title">{product.title}</span>
            <div
              onClick={() => {
                console.log("Remove product", product.id);
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
