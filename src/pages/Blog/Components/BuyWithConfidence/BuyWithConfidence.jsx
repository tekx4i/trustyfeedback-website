import React from "react";
import Slider from "react-slick";
import BlogBox from "../../../../Shared/BlogBox/BlogBox";
import "./BuyWithConfidence.scss";
import ReviewCardLoader from "../../../../Shared/Loader/Home/ReviewCardLoader";
import NoDataFound from "../../../../Shared/NoDataFound/NoDataFound";

const BuyWithConfidence = ({ data, loading }) => {
  const blogBox = {
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    cssEase: "linear",
    arrows: true,
    dots: false,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 3,
        },
      },
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

  return (
    <section className="buyWithConfidence position-relative" style={{ borderBottom: "1px solid #ccc" }}>
      <div className="top__insurance__companies">
        <div className="container">
          <h2 className="big_margin">{data && data[0]?.category?.name ? "Buy With " + data && data[0]?.category?.name : ""}</h2>
          {loading ? <ReviewCardLoader /> : <Slider {...blogBox}>{data && data.length ? data.map((blog, key) => <BlogBox bgColor={"bg-white mx-2"} key={key} data={blog} />) : <NoDataFound />}</Slider>} <div className="reviews__matter__slider"></div>
        </div>
      </div>
    </section>
  );
};

export default BuyWithConfidence;
