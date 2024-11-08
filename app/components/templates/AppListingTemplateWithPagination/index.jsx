import {
    LegacyCard,
    Tabs,
    TextField,
    Button,
    Pagination,
  } from "@shopify/polaris";
  import { SearchIcon } from "@shopify/polaris-icons";
  import { useState, useCallback, useEffect } from "react";
  import DynamicEmptyState from "../../atoms/DynamicEmptyState";
  import "@shopify/polaris/build/esm/styles.css";
import TabsWithSearchBar from "../../atoms/TabsWithSearchBar";
import { CATEGORIES_ENUM } from "../../../utils/constants";

  const items = [
    {
      id: "1",
      category: ["boost-sales", "ux"],
      title: "Cart Notice",
      description:
        "Easily collect, import and display reviews with photos and boost trust and conversion rates with social proof.",
      status: "Active",
    },
    {
      id: "2",
      category: ["boost-sales"],
      title: "Countdown Timer",
      description:
        "Create social proof by showing notifications regarding your recent orders and products being added to cart.",
    },
    {
      id: "3",
      category: ["engage-users", "ux"],
      title: "Announcement Bars",
      description:
        "Build trust by letting your visitors know that you are accepting a wide assortment of payment methods.",
    },
    {
      id: "4",
      category: [],
      title: "Inactive Tab",
      description:
        "Build trust by letting your visitors know that you are accepting a wide assortment of payment methods.",
    },
    {
      id: "4",
      category: [],
      title: "Inactive Tab",
      description:
        "Build trust by letting your visitors know that you are accepting a wide assortment of payment methods.",
    },
    {
      id: "4",
      category: [],
      title: "Inactive Tab",
      description:
        "Build trust by letting your visitors know that you are accepting a wide assortment of payment methods.",
    },
    {
      id: "4",
      category: [],
      title: "Inactive Tab",
      description:
        "Build trust by letting your visitors know that you are accepting a wide assortment of payment methods.",
    },
  ];

  const AppListingTemplateWithPagination = ({
    componentToRender = () => {},
    tabs = [],
    items = [],
    emptyDataString = "No Data to Show",
    emptyDataImage = "https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
  }) => {
    const [selected, setSelected] = useState(0);
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [debouncedSearchValue, setDebouncedSearchValue] = useState("");
    const [selectedApps, setSelectedApps] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15; // Default number of items per page
  console.log(items, "items")
    // Derived pagination controls
    const hasNext = (currentPage * itemsPerPage) < items.length;
    const hasPrevious = currentPage > 1;
  
    // Debounce search value change
    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedSearchValue(searchValue);
      }, 500); // 500ms debounce delay
  
      return () => {
        clearTimeout(handler);
      };
    }, [searchValue]);
  
    // Fetch data on mount, tab change, page change, or debounced search value change
    useEffect(() => {
      const selectedTabId = tabs[selected]?.id || CATEGORIES_ENUM.all;
      let itemsAccordingToTab = [];
      if(tabs[selected]?.id === CATEGORIES_ENUM.favorites){
        itemsAccordingToTab = items.filter(item => item.isFavorite);
      }else if(tabs[selected]?.id === CATEGORIES_ENUM.all){
        itemsAccordingToTab = items;
      }else{
        itemsAccordingToTab = items.filter(item => item.categoryId.includes(tabs[selected]?.id))
      };
      
      if(searchValue) {
        itemsAccordingToTab = itemsAccordingToTab.filter(item => item.name.toLowerCase().includes(searchValue.toLocaleLowerCase()))
      }
      itemsAccordingToTab.slice((currentPage - 1) * itemsPerPage, ((currentPage - 1) * itemsPerPage) + itemsPerPage)
      setSelectedApps(itemsAccordingToTab)
    }, [selected, currentPage, searchValue, tabs]);
  
    const handleTabChange = useCallback((selectedTabIndex) => {
      setSelected(selectedTabIndex);
      setCurrentPage(1); // Reset to first page on tab change
    }, []);
  
    const handleSearchChange = useCallback(
      (value) => {
        setSearchValue(value);
        setCurrentPage(1); // Reset to first page on search
      },
      []
    );
  
    // Pagination handlers
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

    const clearSearch = () => {
      setSearchValue('')
    }
  
    return (
      <LegacyCard>
        <TabsWithSearchBar tabs={tabs} selected={selected} handleSearchChange={handleSearchChange} handleTabChange={handleTabChange} searchValue={searchValue} clearSearch={clearSearch}/>
  
        <LegacyCard.Section>
          {selectedApps.length ? (
            componentToRender({ selectedApps, setSelectedApps })
          ) : (
            <DynamicEmptyState heading={emptyDataString} image={emptyDataImage} />
          )}
        </LegacyCard.Section>
        
        <div style={{ maxWidth: "700px", margin: "auto", border: "1px solid var(--p-color-border)" }}>
          <Pagination
            hasPrevious={hasPrevious}
            onPrevious={handlePreviousPage}
            hasNext={hasNext}
            onNext={handleNextPage}
            label={`${(currentPage - 1) * itemsPerPage + 1}-${Math.min(
              currentPage * itemsPerPage,
              items.length
            )} of ${items.length} items`}
          />
        </div>
      </LegacyCard>
    );
  };
  
  export default AppListingTemplateWithPagination;
  