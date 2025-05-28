import React from "react";
import "./ReviewsSmallBox.scss";
import { ReactSVG } from "react-svg";
import reviewsStars from "../../assets/Stars.svg";
import verifiedIcon from "../../assets/approved-icon.svg";
import reward from "../../assets/reward.svg";
import fitnessIcon from "../../assets/fitness.png";
import useravatar from "../../assets/useravatar.png";
import { IMG_URL } from "../../constants/constants";
import PlaceholderImg from "../../Shared/PlaceholderImg/PlaceholderImg";
import RatingStar from "../../assets/Dashboard/RatingStar_01.svg";
import { Link } from "react-router-dom";
import SingleCardLoader from "../../Shared/Loader/SingleCardLoader";

const ReviewsSmallBox = ({ data, loading }) => {
  const truncateToCharacters = (text, charLimit) => {
    if (!text) return "";
    return text.length > charLimit ? text.slice(0, charLimit) + "..." : text;
  };
  const truncatedComment = truncateToCharacters(data?.comment, 100);

  return (
    <>
      {loading ? (
        ""
      ) : (
        <Link to={`/reviews/review-detail/${data?.id}`} className="small_review_box">
          <div className="review_top_are">
            <div className="review_head d-flex">
              <div className="user_img">{data?.user?.image ? <img src={IMG_URL + data?.user?.image} alt="useravatar" /> : <PlaceholderImg />}</div>
              <div className="user_meta">
                <h6>
                  {data?.user?.name.slice(0, 10)}
                  {data?.user?.name.length > 10 && ".."}
                </h6>
                <div className="review_cont">
                  <span>{data?.user?.roles?.name}</span> <ReactSVG src={reward} />
                </div>
              </div>
            </div>

            <div className="review_stars d-flex">
              <div className="d-flex">
                {Array.from({ length: data?.rating || 0 }).map((_, index) => (
                  <div key={index}>
                    <ReactSVG src={RatingStar} />
                  </div>
                ))}
              </div>
              {data?.rating ? data.rating.toFixed(1) : "0.0"}
            </div>
            <p>
              <span
                dangerouslySetInnerHTML={{
                  __html: truncatedComment,
                }}
              />
            </p>
          </div>
          <div className="review_bottom d-flex">
            <div className="revies_buss_logo">{data?.business?.image ? <img src={IMG_URL + data?.business?.image} alt="fitnessIcon" /> : <PlaceholderImg />}</div>
            <div className="buss_name">
              {data?.business?.name?.slice(0, 10)}
              {data?.business?.name.length > 10 && "..."}
            </div>
            <div className="rev_verified_icon">
              <ReactSVG src={verifiedIcon} />
            </div>
          </div>
        </Link>
      )}
    </>
  );
};

export default ReviewsSmallBox;
