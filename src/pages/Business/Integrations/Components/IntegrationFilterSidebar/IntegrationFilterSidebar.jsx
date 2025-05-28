import React, { useState } from "react";
import { ReactSVG } from "react-svg";
import categoryIcon from "../../../../../assets/category.svg";

import "./IntegrationFilterSidebar.scss";

const IntegrationFilterSidebar = () => {
  return (
    <div className="filter__sidebar">
      <div className="ifilter__single">
        <h5>
          <ReactSVG src={categoryIcon} /> Collection
        </h5>
        <div className="ifilter__checboxes">
          <div className="ifilter__single__checkbox">
            <input type="checkbox" name="collection" id="collection1" />
            <label htmlFor="collection1">Collect Reviews</label>
          </div>
          <div className="ifilter__single__checkbox">
            <input type="checkbox" name="collection" id="collection2" />
            <label htmlFor="collection2">Learn from Reviews</label>
          </div>
          <div className="ifilter__single__checkbox">
            <input type="checkbox" name="collection" id="collection3" />
            <label htmlFor="collection3">Collect Reviews</label>
          </div>
        </div>
        
      </div>
      <div className="ifilter__single checkbox__style__2">
        <h5>
          <ReactSVG src={categoryIcon} /> Categories
        </h5>
        <div className="ifilter__checboxes">
          <div className="ifilter__single__checkbox">
            <input type="checkbox" name="collection" id="collection1" />
            <label htmlFor="collection1">Data and Analytics</label>
          </div>
          <div className="ifilter__single__checkbox">
            <input type="checkbox" name="collection" id="collection2" />
            <label htmlFor="collection2">Learn from Reviews</label>
          </div>
          <div className="ifilter__single__checkbox">
            <input type="checkbox" name="collection" id="collection3" />
            <label htmlFor="collection3">Collect Reviews</label>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default IntegrationFilterSidebar;
