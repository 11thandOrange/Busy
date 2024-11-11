import { Avatar, Badge, ResourceItem, ResourceList } from '@shopify/polaris';
import React from 'react';
import './style.css';
import IMAGES from '../../../utils/Images';

const AppsRenderList = ({ selectedApps }) => {
    return (
        <div className='card-listing1'>
            <ResourceList
            resourceName={{ singular: "item", plural: "items" }}
            items={selectedApps}
            renderItem={(item) => {
                const { id, title, description, status } = item;
                return (
                    <div className='bb-card-list-item'>
<ResourceItem
                        id={id}
                        accessibilityLabel={`View details for ${title}`}
                    >
                        <div className='bb-list-content' style={{ display: "flex" }}>
                                <div style={{ display: "flex" }}>
                                    <div className="bb-img-wrapper">
                                        <img src={IMAGES.BadgeIcon} />
                                    </div>
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
                        </div>
                    
                );
            }}
        />
        </div>
    )
}

export default AppsRenderList