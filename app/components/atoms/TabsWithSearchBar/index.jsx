import { Button, LegacyCard, Tabs, TextField } from '@shopify/polaris'
import { SearchIcon } from '@shopify/polaris-icons'
import React, { useState } from 'react'
import './style.css'

const TabsWithSearchBar = ({tabs, selected, handleTabChange, searchValue, handleSearchChange, clearSearch}) => {
    const [isSearchActive, setIsSearchActive] = useState(false);
    const handleSearchToggle = () => setIsSearchActive(!isSearchActive);
  return (
    <>
        {isSearchActive ? (
          <LegacyCard.Section>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ width: "95%" }}>
                <TextField
                  value={searchValue}
                  onChange={handleSearchChange}
                  placeholder="Search by customer name"
                  autoFocus
                  clearButton
                  onClearButtonClick={clearSearch}
                />
              </div>
              <Button onClick={handleSearchToggle}>Cancel</Button>
            </div>
          </LegacyCard.Section>
        ) : (
          <LegacyCard.Section>
            <div className="page-hdr">
              <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange} />
              <Button plain icon={SearchIcon} onClick={handleSearchToggle} accessibilityLabel="Search" />
            </div>
          </LegacyCard.Section>
        )}
    </>
  )
}

export default TabsWithSearchBar