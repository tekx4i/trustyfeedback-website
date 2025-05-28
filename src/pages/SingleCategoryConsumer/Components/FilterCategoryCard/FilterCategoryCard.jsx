import React, { useState, useEffect } from "react";
import ResultImg from "../../../../assets/result-box-img.png";
import lStars from "../../../../assets/l-stars.svg";
import global from "../../../../assets/global.svg";
import smsicon from "../../../../assets/smsicon.svg";
import rarrow from "../../../../assets/rarrowd.svg";
import location from "../../../../assets/location-r.svg";
import "./FilterCategoryCard.scss";
import { ReactSVG } from "react-svg";
import { IMG_URL, REACT_APP_API_URL } from "../../../../constants/constants";
import PlaceholderImg from "../../../../Shared/PlaceholderImg/PlaceholderImg";
import RatingStar from "../../../../assets/Dashboard/RatingStar_0.svg";
import { Link } from "react-router-dom";
import { NavItem } from "react-bootstrap";
import { apiGet } from "../../../../services/userAuth";
import { format } from "date-fns";
import Spinner from "../../../../Shared/Loader/Spinner";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import verifiedIcon from "../../../../assets/approved-icon.svg";

const FilterCategoryCard = ({ data, key, dashboard_layout }) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [expandedId, setExpandedId] = useState(null);

  const getReviews = async (id) => {
    if (expandedId === id) {
      setExpandedId(null);
      setReviews([]);
      return;
    }

    setExpandedId(id);
    setReviewsLoading(true);
    const params = {
      business_id: id,
      limit: 3,
      sort: "created_at:desc",
    };
    try {
      const URL = `${REACT_APP_API_URL}review`;
      const response = await apiGet(URL, params);
      if (response.success === true) {
        const dbValues = response?.data?.payload.records;
        setReviews(dbValues);
        setReviewsLoading(false);
      } else {
      }
    } catch (error) {
      console.error("Error fetching blog details:", error);
    } finally {
      setReviewsLoading(false);
    }
  };

  const handleLocationClick = (address) => {
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, "_blank");
  };

  return (
    <div key={key} className="ani_pet_review_box">
      <Link to={dashboard_layout && dashboard_layout ? `/dashboard/company-details/${data?.id}` : `/listing/listing-detail/${data?.id}`} className="ap_header w-100">
        <div className="apr_meta_data d-flex align-items-center">
          <div className="apr_img">{data?.image ? <img src={IMG_URL + data?.image} alt={ResultImg} /> : <PlaceholderImg />}</div>
          <div className="apr_content">
            {data?.rating !== 0 && (
              <span className="d-flex pb-1">
                {Array.from({ length: data?.rating || 0 }).map((_, index) => (
                  <div key={index}>
                    <ReactSVG src={RatingStar} />
                  </div>
                ))}{" "}
                {data?.rating && <div className="ms-2">{data?.rating.toFixed(1)}</div>}
              </span>
            )}
            <h3 style={{ display: "flex", gap: 8 }}>
              {data?.name}
              <span>{data?.verified_status === "ACTIVE" && <ReactSVG src={verifiedIcon} />}</span>
            </h3>

            <a href="#" className="web__url">
              {data?.website}
            </a>
            {/* <div className="relevant_btn">
              <span>Most Relevent</span>
            </div> */}
          </div>
        </div>
      </Link>
      <div className="ap-bottom">
        <div className="ap_primary_wrapper d-flex">
          <div className="ap_primary_text d-flex align-items-center">
            {/* <Link to={dashboard_layout && dashboard_layout ? `/dashboard/company-details/${data?.id}` : `/listing/listing-detail/${data?.id}`}>{!dashboard_layout && !dashboard_layout && data?._count?.reviews ? data?._count?.reviews : 0} reviews</Link> */}
            {data?.address && (
              <div className="ap_location" style={{ cursor: "pointer" }} onClick={() => handleLocationClick(data.address)}>
                <span>
                  <ReactSVG src={location} />
                </span>
                {data?.address}
              </div>
            )}
          </div>
          <div className="supply_store">
            <div>
              {data?.website && (
                <a href={`${data?.website?.startsWith("http") ? data.website : `https://${data.website}`}`} target="_blank" rel="noopener noreferrer">
                  <ReactSVG src={global} />
                </a>
              )}

              {data?.email && (
                <a href={`mailto:${data?.email}`}>
                  <ReactSVG src={smsicon} />
                </a>
              )}
              <span>{data?.name}</span>
            </div>
            <div className="ap_secondary-wraoper d-flex">
              <div className="latest_r_btn">
                <button className="d-flex btn px-0 text-primary mt-2" onClick={() => getReviews(data?.id)}>
                  Latest Reviews &nbsp;
                  <span className="border-0">{expandedId !== data?.id ? <FiChevronUp size={22} /> : <FiChevronDown size={22} />}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row ">
        {expandedId === data?.id &&
          (reviewsLoading ? (
            <div className="d-flex justify-content-center py-4">
              <Spinner />
            </div>
          ) : reviews.length > 0 ? (
            reviews?.map((i) => (
              <div className="col-md-4 mt-3">
                <Link to={`/reviews/review-detail/${i.id}`} className="reviews_end w-100 bg-white">
                  <p className="text-muted mb-2">
                    <small>{format(new Date(i.created_at), "MMM dd, yyyy")}</small>
                  </p>
                  <div className="d-flex gap-2">
                    {i.user?.image ? <img src={IMG_URL + i.user?.image} /> : <PlaceholderImg />}

                    <div className="d-flex align-self-center">
                      {Array.from({ length: data?.rating || 0 }).map((_, index) => (
                        <div key={index} className="starts_i">
                          <ReactSVG src={RatingStar} />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-2">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: i.comment.slice(0, 30) + (i.comment.length > 30 ? "..." : ""),
                      }}
                    />
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <p className="p-2">No reviews found.</p>
          ))}
      </div>
    </div>
  );
};

export default FilterCategoryCard;
