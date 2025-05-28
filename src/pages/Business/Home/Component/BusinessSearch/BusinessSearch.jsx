import React from "react";
import { ReactSVG } from "react-svg";
import "./BusinessSearch.scss";
import seacrhIcon from "../../../../../assets/search.svg";


const BusinessSearch = () => {
  return (
    <section className="business__search sec__padding">
      <div className="container">
        <h4 className="text-center">
          See what customers are saying about your business:
        </h4>
        <div className="BusinessSearch position-relative">
          <input type="search" placeholder="Enter Website URL" />
          <button className="flex justify-center items-center bseacrh__btn" type="button">
              <ReactSVG src={seacrhIcon} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default BusinessSearch;
