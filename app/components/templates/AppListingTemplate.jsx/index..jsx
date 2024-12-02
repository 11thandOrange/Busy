import {
    LegacyCard,
  } from "@shopify/polaris";
  import { useState, useCallback, useEffect } from "react";
  import DynamicEmptyState from "../../atoms/DynamicEmptyState";
  import "@shopify/polaris/build/esm/styles.css";
import TabsWithSearchBar from "../../atoms/TabsWithSearchBar";
  import './style.css'
import { CATEGORIES_ENUM } from "../../../utils/constants";
import Spinner from "../../atoms/Spinner";

const AppListingTemplate = ({componentToRender = () => {}, tabs = [], list = [], emptyDataString="No Data to Show", emptyDataImage="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"}) => {
    const [selected, setSelected] = useState(0);
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    //apps page
    const [selectedApps, setSelectedApps] = useState(null);

    const manageSelectedApps = (selectedTabIndex) => {
      const selectedId = tabs[selectedTabIndex]?.id;
      let newSelectedApps = [];
      if (selectedId === CATEGORIES_ENUM.all) {
        newSelectedApps = [...list];
      } else {
        newSelectedApps = list?.filter((item) =>
          item.categoryId.includes(selectedId)
        );
      }
      setSelectedApps(newSelectedApps);
    }
  
    const handleTabChange = useCallback((selectedTabIndex) => {
      setSelected(selectedTabIndex);
      manageSelectedApps(selectedTabIndex)
    }, [manageSelectedApps, list]);

    useEffect(() => {
      manageSelectedApps(selected)
    }, [list])
  
    const handleSearchChange = useCallback(
      (value) => {
        setSearchValue(value);
        const selectedId = tabs[selected].id;
        let apps = [];
        if (selectedId === CATEGORIES_ENUM.all) {
          apps = [...list];
        } else {
          apps = list?.filter((item) => item.categoryId.includes(selectedId));
        }
        setSelectedApps(
          apps?.filter((item) =>
            (item?.name?.toLowerCase().includes(value.toLowerCase()) || item?.description_title?.toLowerCase().includes(value.toLowerCase()) || item?.description_content?.toLowerCase().includes(value.toLocaleLowerCase()))
          )
        );
      },
      [selected, list]
    );

    const clearSearch = () => {
      handleSearchChange('')
      setSearchValue('')
    }

    return (
        <LegacyCard>
          <TabsWithSearchBar tabs={tabs} selected={selected} handleSearchChange={handleSearchChange} handleTabChange={handleTabChange} searchValue={searchValue} clearSearch={clearSearch}/>
          <LegacyCard.Section>
            {selectedApps?.length ? (
                componentToRender({selectedApps, setSelectedApps})
            ) : (
              list ? 
            <DynamicEmptyState heading={emptyDataString} image={emptyDataImage} /> :
            <Spinner/>
            )}
          </LegacyCard.Section>
        </LegacyCard>
    )
}

export default AppListingTemplate