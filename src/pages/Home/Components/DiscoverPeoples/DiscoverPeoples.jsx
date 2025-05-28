// Path: ./DiscoverPeoples.jsx
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "./DiscoverPeoples.scss";
import { format } from "date-fns";
import { ReactSVG } from "react-svg";
import verifiedIcon from "../../../../assets/approved-icon.svg";
import reward from "../../../../assets/reward.svg";
import detailArrow from "../../../../assets/detail-arrow.svg";
import avatarReview from "../../../../assets/avatar-review.png";
import { IMG_URL, REACT_APP_API_URL } from "../../../../constants/constants";
import { apiGet } from "../../../../services/userAuth";
import NoDataFound from "../../../../Shared/NoDataFound/NoDataFound";
import ReviewsCard from "../../../../Shared/Loader/ReviewsCard";
import { Link } from "react-router-dom";
import RatingStar from "../../../../assets/Dashboard/RatingStar_01.svg";
import PlaceholderImg from "../../../../Shared/PlaceholderImg/PlaceholderImg";

const DiscoverPeoples = () => {
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);

  const sliderSettings = (rtl = false) => ({
    infinite: true,
    speed: 5000,
    variableWidth: true,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    arrows: false,
    dots: false,
    pauseOnHover: true,
    rtl,
    responsive: [
      {
        breakpoint: 500,
        settings: {
          variableWidth: false,
          slidesToShow: 1,
        },
      },
    ],
  });

  const getReviews = async () => {
    setLoading(true);
    try {
      const URL = `${REACT_APP_API_URL}review`;
      const response = await apiGet(URL, { limit: 14 });
      if (response.success) {
        setReviews(response.data.payload.records || []);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getReviews();
  }, []);

  const ReviewBox = ({ item }) => (
    <div className="main__review__box">
      <div className="main__review__wrap">
        <div className="mreview__head d-flex align-items-center">
          <div className="mreview__img">
            {item?.business?.image ? <img src={IMG_URL + item?.business?.image} /> : <PlaceholderImg />}
            {item?.business?.verified_status === "ACTIVE" ? (
              <div className="user_verified">
                <ReactSVG src={verifiedIcon} />
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="mreview__meta">
            <h4>{item.business?.name}</h4>
            <Link style={{ wordBreak: "break-all" }} target="_blank" to={item.business?.website}>
              {item.business?.website}
            </Link>
          </div>
        </div>
        <div className="review_stars d-flex">
          <div className="d-flex">
            {Array.from({ length: item.rating || 0 }).map((_, index) => (
              <ReactSVG key={index} src={RatingStar} />
            ))}
          </div>
          {item?.rating ? parseFloat(item.rating.toFixed(0)) : "0.0"}.0
        </div>
        <h6 className="mb-2">
          <strong>{item.title ? item.title : ""}</strong>
        </h6>
        <p className="reviews_dangerous_html">
          <span
            dangerouslySetInnerHTML={{
              __html: item.comment.slice(0, 50) + (item.comment.length > 50 ? "..." : ""),
            }}
          />
        </p>
        <a href={`/reviews/review-detail/${item.id}`} className="read_review">
          Read Review <ReactSVG src={detailArrow} />
        </a>
        <div className="review_bottom d-flex align-items-center">
          <div className="revies_buss_logo">{item.user?.roles?.image ? <img src={IMG_URL + item.user?.roles?.image} alt="avatarReview" /> : <PlaceholderImg />}</div>
          <div className="review__bottom__meta">
            <h5>{item.user?.name}</h5>
            <p className="mb-0">
              <span>{item.user?.roles?.name}</span> <ReactSVG src={reward} />
            </p>
          </div>
          {item?.created_at && <div className="review__time">{format(new Date(item.created_at), "MMM dd, yyyy")}</div>}
        </div>
      </div>
    </div>
  );

  const renderSlider = (items, rtl = false) => {
    if (items && items.length > 0) {
      return (
        <Slider {...sliderSettings(rtl)}>
          {items?.map((item) => (
            <ReviewBox key={item.id} item={item} />
          ))}
        </Slider>
      );
    } else {
      return <NoDataFound />;
    }
  };

  return (
    <section className="discover__what__pepoles position-relative">
      <div className="container">
        <h2 className="text-center big_margin">Discover What People Like and Dislike</h2>
      </div>
      <div className="people__Likes__slider">{loading ? <ReviewsCard /> : renderSlider(reviews.slice(0, 7))}</div>
      <div className="people__dislike__slider">
        {loading ? (
          <div className="mt-4">
            <ReviewsCard />
          </div>
        ) : (
          renderSlider(reviews.slice(8, 14), true)
        )}
      </div>
    </section>
  );
};

export default DiscoverPeoples;
