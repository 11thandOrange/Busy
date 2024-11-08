import {
    LegacyCard,
    Tabs,
    TextField,
    Button,
  } from "@shopify/polaris";
  import { SearchIcon } from "@shopify/polaris-icons";
  import { useState, useCallback } from "react";
  import DynamicEmptyState from "../../atoms/DynamicEmptyState";
  import "@shopify/polaris/build/esm/styles.css";
  import './style.css'

const AppListingTemplate = ({componentToRender = () => {}, tabs = [], list = [], emptyDataString="No Data to Show", emptyDataImage="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"}) => {
    const [selected, setSelected] = useState(0);
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [searchValue, setSearchValue] = useState("");
  
    //apps page
    const [selectedApps, setSelectedApps] = useState([...list]);
  
    const handleTabChange = useCallback((selectedTabIndex) => {
      setSelected(selectedTabIndex);
      const selectedId = tabs[selectedTabIndex].id;
      let newSelectedApps = [];
      if (selectedId === "all") {
        newSelectedApps = [...list];
      } else {
        newSelectedApps = list.filter((item) =>
          item.category.includes(selectedId)
        );
      }
      setSelectedApps(newSelectedApps);
    }, []);
  
    const handleSearchToggle = () => setIsSearchActive(!isSearchActive);
    const handleSearchChange = useCallback(
      (value) => {
        setSearchValue(value);
        const selectedId = tabs[selected].id;
        let apps = [];
        if (selectedId === "all") {
          apps = [...list];
        } else {
          apps = list.filter((item) => item.category.includes(selectedId));
        }
        setSelectedApps(
          apps.filter((item) =>
            item.title.toLowerCase().includes(value.toLowerCase())
          )
        );
      },
      [selected]
    );
    return (
        <LegacyCard>
            {isSearchActive ? (
            <LegacyCard.Section>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                <div
                    style={{
                    width: "95%",
                    }}
                >
                    <TextField
                    value={searchValue}
                    onChange={handleSearchChange}
                    placeholder="Search by customer name"
                    autoFocus
                    clearButton
                    onClearButtonClick={() => setSearchValue("")}
                    />
                </div>
                <Button onClick={handleSearchToggle}>Cancel</Button>
                </div>
            </LegacyCard.Section>
            ) : (
            <LegacyCard.Section>            
                <div className="page-hdr">
                <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}/>
                <Button
                  plain
                  icon={SearchIcon}
                  onClick={handleSearchToggle}
                  accessibilityLabel="Search"
                  clasName="searchbtn"
                />  
                </div>          
            </LegacyCard.Section>
            )}

            <LegacyCard.Section>
            {selectedApps.length ? (
                componentToRender({selectedApps, setSelectedApps})
            ) : (
                <DynamicEmptyState
                heading={emptyDataString}
                image={emptyDataImage}
                />
            )}
            </LegacyCard.Section>
        </LegacyCard>
    )
}

export default AppListingTemplate