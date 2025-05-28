import React, { useState } from "react";
import { ReactSVG } from "react-svg";
import verifiedIcon from "../../../assets/approved-icon.svg";
import detailArrow from "../../../assets/detail-arrow.svg";
import "./CompanyReviewBox.scss";
import { IMG_URL } from "../../../constants/constants";
import PlaceholderImg from "../../../Shared/PlaceholderImg/PlaceholderImg";
import { Link } from "react-router-dom";
import RatingStar from "../../../assets/RatingStar_0.svg";

const CompanyReviewBox = ({ data, key, width, select }) => {
  return (
    <div id="select_business" className={`slide__wrap bg-light border-transparent ${select.business_id === data.id ? "selected_business" : ""}`} key={key && key}>
      <div className="company__review__box" style={{ width: width ? width : "auto" }}>
        <div className="company__r__icon">{data && data.image ? <img src={IMG_URL + data.image} /> : <PlaceholderImg />}</div>
        <h4 className="d-flex">
          {data && data.name ? data.name : "-"} {data && data?.verified_status === "ACTIVE" && <ReactSVG src={verifiedIcon} />}
        </h4>
        <div className="text-start">
          <Link to={data?.website || "#"} rel="noopener noreferrer" target="_blank" className="company__url">
            {data && data.website ? data.website : "-"}
          </Link>
        </div>
        <div className="company__reviews__count d-flex align-items-center">
          {data?.rating ? (
            <div className="d-flex">
              {Array.from({ length: data?.rating || 0 })?.map((_, index) => (
                <div key={index}>
                  <ReactSVG src={RatingStar} />
                </div>
              ))}
            </div>
          ) : (
            <small>No reviews yet.</small>
          )}
          <span>
            {data?.rating ? parseFloat(data.rating.toFixed(1)) : "0.0"}/5.0<span> ({data?._count?.reviews})</span>
          </span>
        </div>
        {/* <a href="#" className="view__detail">
          View Details <ReactSVG src={detailArrow} />
        </a> */}
      </div>
    </div>
  );
};
export default CompanyReviewBox;
