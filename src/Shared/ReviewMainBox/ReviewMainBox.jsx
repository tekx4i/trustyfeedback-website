import React, { useContext, useState } from "react";
import { ReactSVG } from "react-svg";
import "./ReviewMainBox.scss";
import bigStars from "../../assets/big-stars.svg";
import verifiedIcon from "../../assets/approved-icon.svg";
import reward from "../../assets/reward.svg";
import detailArrow from "../../assets/detail-arrow.svg";
import avatarReview from "../../assets/avatar-review.png";
import RatingStar from "../../assets/Dashboard/RatingStar_0.svg";
import { Link } from "react-router-dom";
import PlaceholderImg from "../PlaceholderImg/PlaceholderImg";
import { IMG_URL, REACT_APP_API_URL } from "../../constants/constants";
import { format } from "date-fns";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { getStorage } from "../../services/storage";
import { apiDeleteNew } from "../../services/userAuth";
import Spinner from "../../Shared/Loader/Spinner";
import NoDataFound from "../NoDataFound/NoDataFound";

const ReviewMainBox = ({ setReviews, reviews, data, key, bgColor, dashboardReview, dashboard_layout, getReviews, bookmark, isVisible, setIsVisible }) => {
  const token = getStorage("token");
  const [showFullComment, setShowFullComment] = useState(false);
  const [favLoading, setFavLoading] = useState({
    loading: false,
    id: 0,
  });
  const [liked, setLiked] = useState({});
  const toggleComment = () => {
    setShowFullComment(!showFullComment);
  };

  const truncatedComment = data.comment?.slice(0, 200) + " ...";

  // Fetch favourite review data
  const favrouite = async (id) => {
    if (!id) return;
    setFavLoading({
      loading: true,
      id: id,
    });
    const tokenS = token ? token : "";
    try {
      const URL = `${REACT_APP_API_URL}review/favorite/${id}`;
      const response = await apiGet(URL, {}, tokenS);
      if (response.success) {
        const reviewData = response.data.payload;
        if (response.success === true) {
          setLiked({
            ...liked,
            [id]: true,
          });
        }
      }
    } catch (error) {
      console.error("Error updating favorite:", error);
    } finally {
      setFavLoading({
        loading: false,
        id: id,
      });
    }
  };

  // Fetch favourite review data
  const favrouiteDelete = async (id) => {
    if (!id) return;
    setFavLoading({
      loading: true,
      id: id,
    });
    const tokenS = token ? token : "";
    try {
      const URL = `${REACT_APP_API_URL}review/favorite/${id}`;
      const response = await apiDeleteNew(URL, {}, tokenS);
      if (response.success === true) {
        getReviews();
        setLiked({
          ...liked,
          [id]: false,
        });
        // setIsVisible(false);
      }
    } catch (error) {
      console.error("Error updating favorite:", error);
    } finally {
      setFavLoading({
        loading: false,
        id: id,
      });
    }
  };
  return (
    <div key={key} className="main__review__box">
      <div className="main__review__wrap" style={{ backgroundColor: bgColor ? bgColor : "" }}>
        <div className="mreview__head d-flex align-items-center">
          <div className="mreview__img">
            {data?.business?.image ? <img src={IMG_URL + data?.business?.image} /> : <PlaceholderImg />}
            {/* <div className="user_verified">
              <ReactSVG src={verifiedIcon} />
            </div> */}
          </div>
          <div className="mreview__meta">
            <h4 style={{ display: "flex", gap: 4 }}>
              {data?.business?.name}
              {data?.business?.verified_status === "ACTIVE" && (
                <span>
                  <ReactSVG src={verifiedIcon} />
                </span>
              )}
            </h4>

            <a style={{ wordBreak: "break-all" }} href={`${data?.business?.website}`} target={"_blank"}>
              {data?.business?.website}
            </a>
          </div>
        </div>

        <div className="review_stars d-flex">
          {Array.from({ length: data?.rating || 0 }).map((_, index) => (
            <div key={index}>
              <ReactSVG src={RatingStar} />
            </div>
          ))}
          &nbsp; &nbsp;
          {data?.rating ? (Number.isInteger(data.rating) ? `${data.rating}.0` : parseFloat(data.rating.toFixed(1))) : "0.0"}
        </div>
        <h6 className="mb-2">
          <strong>{data?.title ? data?.title : ""}</strong>
        </h6>
        <p className="review_desc">
          {" "}
          <span
            dangerouslySetInnerHTML={{
              __html: data?.comment.slice(0, 60) + `${data?.comment.length > 60 ? "..." : ""}`,
            }}
          />
        </p>
        <Link to={dashboard_layout === true ? `/dashboard/my-reviews/detail/${data.id}` : `/reviews/review-detail/${data?.id}`} className="read_review">
          Read Review <ReactSVG src={detailArrow} />
        </Link>

        <div className="review_bottom d-flex align-items-center">
          <div className="revies_buss_logo">{data?.user?.image ? <img src={IMG_URL + data?.user?.image} alt="avatarReview" /> : <PlaceholderImg />}</div>
          <div className="review__bottom__meta">
            <h5 style={{ display: "flex", gap: 8 }}>
              {data?.user?.name}
              {data?.verified_status === "ACTIVE" && (
                <span>
                  <ReactSVG src={verifiedIcon} />
                </span>
              )}
            </h5>
            <p className="mb-0">{data?.user?.badge ? "" : <span className="flex justify-center items-center contributor contributor-badge">{data?.user?.badge ? data?.user?.badge : ""}</span>}</p>
          </div>

          {data?.created_at && (
            <div className="review__time">
              {bookmark !== false && (
                <div className="" type="button">
                  {(data && data?.favorites && data?.favorites[0]?.review_id === data.id) || liked[data.id] ? (
                    <div onClick={() => favrouiteDelete(data?.id)}>{favLoading.loading && favLoading.id === data?.id ? <Spinner /> : <FaBookmark size={20} />}</div>
                  ) : (
                    <div onClick={() => favrouite(data?.id)}>{favLoading.loading && favLoading.id === data?.id ? <Spinner /> : <FaRegBookmark size={20} />}</div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewMainBox;
