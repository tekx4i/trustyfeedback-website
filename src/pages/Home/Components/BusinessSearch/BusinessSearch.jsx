import React from "react";
import SearchWithCategory from "../../../../Shared/SearchWithCategory/SearchWithCategory";
import { ReactSVG } from "react-svg";
import direction from "../../../../assets/direction.svg";
import "./BusinessSearch.scss";

const BusinessSearch = () => {
  return (
    <div className="business__search-com">
      <div className="container position-relative ">
        <div className="banner__content text-center mx-auto position-relative">
          <h2>Bought Something Recently</h2>
          <p>
            Recently made a purchase? Share your experience to help <br />
            others & provide feedback to businesses!
          </p>
          <div className="arr_direction">
            <ReactSVG src={direction} />
          </div>
          <div className="mx-5">
            <SearchWithCategory />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessSearch;
