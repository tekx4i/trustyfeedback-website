import React, { useState, useEffect } from "react";
import SearchWithCategory from "../SearchWithCategory/SearchWithCategory";
import { ReactSVG } from "react-svg";
import direction from "../../assets/direction.svg";
import arrow from "../../assets/curly_arrow.png";
import "./BusinessSearch.scss";

const BusinessSearch = () => {
  return (
    <div className="business__search-com sec__padding">
      <div className="container position-relative ">
        <div className="banner__content text-center mx-auto position-relative">
          <h2>Bought Something Recently</h2>
          <p>
            Recently made a purchase? Share your experience to help <br />
            others & provide feedback to businesses!
          </p>
          <img className="curly__arrow" src={arrow} />

          <div className="mx-auto search__c_wrap">
            <SearchWithCategory />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessSearch;
