import React, { Suspense, lazy, useState, useEffect } from "react";
import UserLayout from "../Layout/Layout";
import Slider from "react-slick";
import "./Home.scss";
import { REACT_APP_API_URL } from "../../../constants/constants";
import { apiGet } from "../../../services/userAuth";
import CommentCard from "../../../Shared/DashboardComponents/CommentCard/CommentCard";
import { getStorage } from "../../../services/storage";
import NoDataFound from "../../../Shared/NoDataFound/NoDataFound";
import CardLoader from "../../../Shared/Loader/SingleCardLoader";
import BusinessLoader from "../../../Shared/Loader/ReviewsCard";
const TopCategories = lazy(() => import("./Components/TopCategories"));
const RecentReview = lazy(() => import("../../../Shared/ReviewMainBox/ReviewMainBox"));
const CompanyReviewBox = lazy(() => import("../../../Shared/CompanyReviewBox/CompanyReviewBox"));

const DashboardHome = () => {
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState();
  const [loading, setLoading] = useState();
  const [data, setData] = useState([]);
  const userInfo = getStorage("userInfo");
  const token = getStorage("token");
  const user_id = JSON.parse(userInfo).id;

  const getReviews = async () => {
    setReviewsLoading(true);
    const params = {
      limit: 5,
      user_id: user_id,
      sort: "created_at:desc",
      approved: true,
    };
    try {
      const URL = `${REACT_APP_API_URL}review`;
      const response = await apiGet(URL, params, token);
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

  useEffect(() => {
    getReviews();
  }, []);

  const TrustyTeamSlider = {
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 0,
    arrows: true,
    dots: false,
    pauseOnHover: true,
    initialSlide: 0,
    centerMode: false,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          centerMode: false,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1.1,
          centerMode: false,
        },
      },
    ],
  };

  const commentCard = {
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 0,
    // cssEase: "linear",
    arrows: true,
    dots: false,
    centerMode: false,
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1.2,
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
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 500,
        settings: {
          variableWidth: false,
          slidesToShow: 1.2,
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
        limit: 10,
      };
      const response = await apiGet(URL, params);
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
    getBusiness();
  }, []);

  const useAuth = async () => {
    try {
      const URL = `${REACT_APP_API_URL}auth/me`;
      const params = {};
      const response = await apiGet(URL, params, token);
      if (response.success) {
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
    }
  };

  useEffect(() => {
    if (token) {
      useAuth();
    }
  }, [token]);

  return (
    <section className="main_content" id="user_dashboard">
      <div className="row">
        <div className="col-md-8">
          <h4 id="recent-title" className="mb-0">
            Your Recent Reviews
          </h4>
          <div className="parnet-reviews">
            <div id="recent__reviews">
              {reviewsLoading ? (
                <CardLoader />
              ) : reviews?.length > 0 ? (
                <Slider className="slider" {...TrustyTeamSlider}>
                  {reviews && reviews.map((review, key) => <RecentReview dashboard_layout={true} bookmark={false} dashboardReview={true} key={key} data={review} bgColor={"#fff"} />)}
                </Slider>
              ) : (
                <p className="mb-5">No data found.</p>
              )}
            </div>
            <div id="commentCard">
              <h4>People are loving Tech Wizards</h4>
              {reviewsLoading ? (
                <CardLoader />
              ) : reviews?.length > 0 ? (
                <Slider {...commentCard}>
                  {reviews &&
                    reviews.map((review, key) => (
                      <div className="ps-3">
                        <CommentCard token={token} key={key} data={review} />
                      </div>
                    ))}
                </Slider>
              ) : (
                <p>No data found.</p>
              )}
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <TopCategories />
        </div>
        <div id="top-business_userdashboard">
          <div className="top_business_dashboard">
            <h4>Top Businesses for you</h4>
          </div>
          <div className="reviews__default__slider crbox__change">
            {loading ? (
              <BusinessLoader />
            ) : data?.length > 0 ? (
              <Slider {...settings}>
                {data &&
                  data.map((review, key) => {
                    return <CompanyReviewBox onlySaved={true} bookmarkNot={false} bgColor={"bg-white"} data={review} key={key} />;
                  })}
              </Slider>
            ) : (
              <NoDataFound />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardHome;
