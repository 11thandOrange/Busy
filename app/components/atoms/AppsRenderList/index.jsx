import { Badge, ResourceItem, ResourceList } from "@shopify/polaris";
import React from "react";
import "./style.css";
import { Link } from "@remix-run/react";

const AppsRenderList = ({ selectedApps }) => {
  return (
    <div className="card-listing1">
      <ResourceList
        resourceName={{ singular: "item", plural: "items" }}
        items={selectedApps}
        renderItem={(item) => {
          const {
            id,
            name,
            description_content,
            description_title,
            isInstalled,
            image,
            slug,
          } = item;

          return (
            <>
              <Link className="bb-app-link" to={`${slug}?appId=${id}`}>
                <div className="bb-card-list-item">
                  {/* Commented Because of Routing error */}
                  
                    <div
                      className="bb-list-content"
                      style={{ display: "flex" }}
                    >
                      <div style={{ display: "flex" }}>
                        <div className="bb-img-wrapper">
                          <img src={image} />
                        </div>
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <h4>{name}</h4>
                          <h5>{description_title}</h5>
                          <span>{description_content}</span>
                        </div>
                      </div>
                      {isInstalled && <Badge tone="success">Active</Badge>}
                    </div>
                
                  {/* {name} */}
                </div>
              </Link>
            </>
          );
        }}
      />
    </div>
  );
};

export default AppsRenderList;
