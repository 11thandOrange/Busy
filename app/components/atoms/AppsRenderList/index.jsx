import { Avatar, Badge, ResourceItem, ResourceList } from '@shopify/polaris';
import React from 'react'
import './style.css'

const AppsRenderList = ({ selectedApps }) => {
    return (
        <ResourceList
            resourceName={{ singular: "item", plural: "items" }}
            items={selectedApps}
            renderItem={(item) => {
                const { id, title, description, status } = item;
                return (
                    <ResourceItem
                        id={id}
                        accessibilityLabel={`View details for ${title}`}
                    >
                        <div style={{ display: "flex" }}>
                            <div style={{ display: "flex" }}>
                                <Avatar size='md'/>
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    <h4>{title}</h4>
                                    <span>{description}</span>
                                </div>
                            </div>
                            {status && <Badge tone="success">Active</Badge>}
                        </div>
                        {/* <h3>
                        <TextStyle variation="strong">{title}</TextStyle>
                    </h3>
                    <div>{description}</div>

                    {status && <Badge status="success">{status}</Badge>} */}
                    </ResourceItem>
                );
            }}
        />
    )
}

export default AppsRenderList