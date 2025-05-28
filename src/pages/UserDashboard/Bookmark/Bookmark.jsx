import React, { Suspense, lazy, useState, useEffect } from "react";
import UserLayout from "../Layout/Layout";
import Slider from "react-slick";
import { REACT_APP_API_URL } from "../../../constants/constants";
import { apiGet } from "../../../services/userAuth";
import CommentCard from "../../../Shared/DashboardComponents/CommentCard/CommentCard";
import { getStorage } from "../../../services/storage";
import NoDataFound from "../../../Shared/NoDataFound/NoDataFound";
import CardLoader from "../../../Shared/Loader/ReviewsCard";
import filterIcon from "../../../assets/settings-04.svg";
import { ReactSVG } from "react-svg";
import "./Bookmark.scss";
import CardDetailLoader from "../../../Shared/Loader/BlogDetailLoader/BlogDetailLoader";
import Spinner from "../../../Shared/Loader/Spinner";
const RecentReview = lazy(() => import("../../../Shared/ReviewMainBox/ReviewMainBox"));
const CompanyReviewBox = lazy(() => import("../../../Shared/CompanyReviewBox/CompanyReviewBox"));

const DashboardHome = () => {
  const [filter, setFilter] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState();
  const [loading, setLoading] = useState();
  const [data, setData] = useState([]);
  const token = getStorage("token");
  const parsedInfo = getStorage("userInfo");
  const userInfo = JSON.parse(parsedInfo);
  const toggleFilter = () => setFilter(!filter);
  const [sortOrder, setSortOrder] = useState("desc");
  const [isVisible, setIsVisible] = useState(true);

  const getReviews = async () => {
    setReviewsLoading(true);
    const params = {
      sort: `created_at:${sortOrder}`,
      favorite: true,
    };
    try {
      const URL = `${REACT_APP_API_URL}review`;
      const response = await apiGet(URL, params, token);
      if (response.success === true) {
        const dbValues = response?.data?.payload?.records || [];
        setReviews(Array.isArray(dbValues) ? dbValues : []);
      } else {
        console.error("Failed to fetch reviews");
        setReviews([]);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setReviews([]);
    } finally {
      setReviewsLoading(false);
    }
  };

  useEffect(() => {
    getReviews();
  }, [sortOrder]);

  const TrustyTeamSlider = {
    infinite: false,
    speed: 2000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    // cssEase: "linear",
    arrows: false,
    dots: false,
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const settings = {
    infinite: false,
    variableWidth: true,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    cssEase: "linear",
    arrows: false,
    dots: true,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 500,
        settings: {
          variableWidth: false,
          slidesToShow: 1,
        },
      },
    ],
  };

  const getBusiness = async () => {
    setLoading(true);
    try {
      const URL = `${REACT_APP_API_URL}business`;
      const params = {
        sort: "rating:desc",
        // limit: 10,
        favorite: true,
      };
      const response = await apiGet(URL, params, token);
      if (response.success === true) {
        const dbValues = response.data.payload.records;
        setData(dbValues);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userInfo?.role_id !== 3) {
      getBusiness();
    }
  }, []);

  return (
    <section className="main_content h-100" id="bookmark_reviews">
      {userInfo?.role_id !== 3 && <h4 id="bookmark-title">Your Bookmark Reviews</h4>}
      {userInfo?.role_id === 3 && (
        <div id="reviews" className="d-flex justify-content-between position-relative">
          <h4>Bookmark Reviews</h4>
          <p className="d-flex" type="button" onClick={toggleFilter}>
            <ReactSVG src={filterIcon} />
            &nbsp; Filter
          </p>
          {filter && (
            <div className="filter__dashboard">
              <button
                onClick={() => {
                  setSortOrder("desc");
                  setFilter(!filter);
                }}
              >
                Sort by Newest
              </button>
              <button
                onClick={() => {
                  setSortOrder("asc");
                  setFilter(!filter);
                }}
              >
                Sort by Old
              </button>
            </div>
          )}
        </div>
      )}
      {reviewsLoading && (
        <div className="d-flex justify-content-center" style={{ position: "absolute", margin: "auto", left: 0, right: 0, width: "100%", height: "100%", top: 0, bottom: 0, alignSelf: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.2)", zIndex: "999" }}>
          <div class="spinner-border" style={{ width: " 3rem", height: "3rem" }} role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      <div className={`parnet-reviews ${userInfo?.role_id === 3 && "row px-3"}`}>
        {userInfo?.role_id !== 3 ? (
          <>
            {reviews?.length > 0 ? (
              <Slider className="slider" {...TrustyTeamSlider}>
                {reviews?.map((review, key) => (
                  <RecentReview reviews={reviews} setReviews={setReviews} setIsVisible={setIsVisible} isVisible={isVisible} dashboard_layout={true} getReviews={getReviews} key={key} data={review} bgColor={"#fff"} />
                ))}
              </Slider>
            ) : (
              <NoDataFound />
            )}
          </>
        ) : reviews.length > 0 ? (
          reviews?.map((review, key) => (
            <div className={`col-sm-6 ${reviews.length === 0 ? "d-none" : ""}`}>
              <RecentReview reviews={reviews} setReviews={setReviews} setIsVisible={setIsVisible} isVisible={isVisible} dashboard_layout={true} getReviews={getReviews} key={key} data={review} bgColor={"#fff"} />
            </div>
          ))
        ) : reviewsLoading ? (
          ""
        ) : (
          "No data found"
        )}
        {userInfo?.role_id !== 3 && (
          <div id="top-business_userdashboard">
            <div className="top_business_dashboard">
              <h4>Saved Businesses</h4>
            </div>
            {loading ? (
              <CardLoader />
            ) : data.length > 0 ? (
              <div className="reviews__default__slider crbox__change">
                <Slider {...settings}>
                  {data &&
                    data.map((review, key) => {
                      return <CompanyReviewBox onlySaved={true} bgColor={"bg-white"} data={review} key={key} />;
                    })}
                </Slider>
              </div>
            ) : (
              <NoDataFound />
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default DashboardHome;
