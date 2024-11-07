import {
    IndexTable,
    LegacyCard,
    useIndexResourceState,
    Text,
    Badge,
    hsbToHex,
  } from "@shopify/polaris";
  import React from "react";
import PopoverContent from "../PopoverContent";
import barsData from "../../../data/barsData";
import popoverData from "../../../data/popoverData";
const barState = {
    ACTIVE:"success",
    INACTIVE:"critical"
}
hsbToHex
   function CheckBars() {
   
   
    const resourceName = {
      singular: "order",
      plural: "orders",
    };
  
    const { selectedResources, allResourcesSelected, handleSelectionChange } =
      useIndexResourceState(barsData);
  
    const rowMarkup = barsData.map(
      (
        { id, order, date, state },
        index
      ) => (
        <IndexTable.Row
          id={id}
          key={id}
          selected={selectedResources.includes(id)}
          position={index}
        >
          <IndexTable.Cell>
            <div>
           
              <Text variant="bodyMd" fontWeight="bold" as="span">
                {order}
              </Text>
             <span style={{marginLeft: '5px'}}> <Badge  tone={state}>
                {state===barState.ACTIVE ? "Active" : "Inactive"}
                </Badge></span> 
              
              <p>Text tesing text is here </p>
            </div>
          </IndexTable.Cell>
  
          <Text as="span" alignment="end" numeric>
            {date}
          </Text>
        </IndexTable.Row>
      )
    );
    const promotedBulkActions = [
        {
          content: 'Delete',
          onAction: () => console.log('Todo: implement bulk edit'),
        },
      ];
    return (
      <LegacyCard>
       
       
        <IndexTable
          resourceName={resourceName}
          itemCount={barsData.length}
          selectedItemsCount={
              allResourcesSelected ? "All" : selectedResources.length
            }
        
          onSelectionChange={handleSelectionChange}
          headings={[{ title: `Showing ${barsData.length} announcement bar` }]}
          promotedBulkActions={promotedBulkActions}
        >
          {rowMarkup}
          
        </IndexTable>
        <div style={{position: 'absolute', top: '4px', right: '10px'}}>
        <PopoverContent options={popoverData} heading="Create" ></PopoverContent>
        </div>
      </LegacyCard>
    );
  }
  
  export default CheckBars;
  