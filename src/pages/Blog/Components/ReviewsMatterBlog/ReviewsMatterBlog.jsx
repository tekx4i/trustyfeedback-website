import React from "react";
import BlogBox from "../../../../Shared/BlogBox/BlogBox";
import Slider from "react-slick";
import "./ReviewsMatterBlog.scss";
import ReviewCardLoader from "../../../../Shared/Loader/Home/ReviewCardLoader";
import NoDataFound from "../../../../Shared/NoDataFound/NoDataFound";

const ReviewsMatterBlog = ({ data, loading }) => {
  const BlogBoxSlider = {
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 500,
    cssEase: "linear",
    arrows: false,
    dots: true,
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
    <section className="reviews__matter__blogs sec__padding">
      <div className="container">
        <h2 className="text-center big_margin">Reviews {data && data[0]?.category?.name}</h2>
      </div>
      {loading ? (
        <ReviewCardLoader />
      ) : data && data.length > 0 ? (
        <Slider {...BlogBoxSlider}>
          {data?.map((blog, key) => (
            <BlogBox key={key} data={blog} />
          ))}
        </Slider>
      ) : (
        <NoDataFound />
      )}
      <div className="reviews__matter__slider"></div>
    </section>
  );
};

export default ReviewsMatterBlog;
