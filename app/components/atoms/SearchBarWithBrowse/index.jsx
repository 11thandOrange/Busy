import React, { useEffect, useState } from "react";
import CustomTextField from "../CustomTextField";
import { SearchIcon, DeleteIcon } from "@shopify/polaris-icons";
import { Button, Icon, Pagination, Text } from "@shopify/polaris";
import "./style.css";
import ProductListingWithSearchBar from "../ProductListingWithSearchBar";

const SelectedProduct = ({ selectedProducts, setSelectedProducts }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Default number of items per page
  const [products, setProducts] = useState([]);
  // Derived pagination controls
  const hasNext = currentPage * itemsPerPage < selectedProducts?.length;
  const hasPrevious = currentPage > 1;
  const handleNextPage = () => {
    if (hasNext) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (hasPrevious) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };
  useEffect(() => {
    const selectedProductsNew = selectedProducts?.slice(
      (currentPage - 1) * itemsPerPage,
      (currentPage - 1) * itemsPerPage + itemsPerPage,
    );

    setProducts(selectedProductsNew);
  }, [currentPage, selectedProducts]);
  return (
    <>
      <div className="selected-products">
        {selectedProducts.length > 0 && (
          <Text as="h3" variant="headingMd">
            Selected Products
          </Text>
        )}
        {products?.map((product) => (
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
                setCurrentPage(1);
                setSelectedProducts(filteredProducts);
              }}
            >
              <Icon source={DeleteIcon} tone="base" />
            </div>
          </div>
        ))}
        {selectedProducts.length > 0 && (
          <div className="selected-products-pagination">
            <Pagination
              hasPrevious={hasPrevious}
              onPrevious={handlePreviousPage}
              hasNext={hasNext}
              onNext={handleNextPage}
              label={
                selectedProducts?.length
                  ? `${(currentPage - 1) * itemsPerPage + 1}-${Math.min(
                      currentPage * itemsPerPage,
                      selectedProducts?.length,
                    )} of ${selectedProducts?.length} items`
                  : "0-0 of 0 items"
              }
            />
          </div>
        )}
      </div>
    </>
  );
};
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
      {/* <SelectedProduct
        selectedProducts={selectedProducts}
        setSelectedProducts={setSelectedProducts}
      ></SelectedProduct> */}
    </div>
  );
};

export default SearchBarWithBrowse;
