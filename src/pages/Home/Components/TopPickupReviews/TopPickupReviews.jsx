import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { IMG_URL, REACT_APP_API_URL } from "../../../../constants/constants";
import { apiGet } from "../../../../services/userAuth";
import CompanyReviewBox from "../../../../Shared/CompanyReviewBox/CompanyReviewBox";
import "./TopPickupReviews.scss";
import ReviewCardLoader from "../../../../Shared/Loader/Home/ReviewCardLoader";

const TopPickupReviews = () => {
  const [loading, setLoading] = useState();
  const [data, setData] = useState([]);

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

  return (
    <section className="top__pickup__reviews position-relative">
      <div className="container">
        <h2 className="text-center big_margin">Top picks for you</h2>
        {loading ? (
          <ReviewCardLoader />
        ) : (
          <div className="reviews__default__slider crbox__change">
            <Slider {...settings}>
              {data &&
                data.map((review, key) => {
                  return <CompanyReviewBox data={review} key={key} />;
                })}
            </Slider>
          </div>
        )}
      </div>
    </section>
  );
};

export default TopPickupReviews;
