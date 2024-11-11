import { Button, LegacyCard, Tabs, TextField } from '@shopify/polaris'
import { SearchIcon } from '@shopify/polaris-icons'
import React, { useState } from 'react'
import './style.css'

const TabsWithSearchBar = ({tabs, selected, handleTabChange, searchValue, handleSearchChange, clearSearch}) => {
    const [isSearchActive, setIsSearchActive] = useState(false);
    const handleSearchToggle = () => setIsSearchActive(!isSearchActive);
  return (
    <>
    <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange} />
    <div className={`head-searchbar ${isSearchActive ? 'full-width' : ''}`}>
        {isSearchActive ? (
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ width: "95%" }}>
                <TextField
                  value={searchValue}
                  onChange={handleSearchChange}
                  placeholder="Search"
                  autoFocus
                  clearButton
                  onClearButtonClick={clearSearch}
                />
              </div>
              <Button onClick={handleSearchToggle}>Cancel</Button>
            </div>
        ) : (
            <Button plain icon={SearchIcon} onClick={handleSearchToggle} accessibilityLabel="Search" />
        )}
    </div>
    </>
  )
}

export default TabsWithSearchBar