import React from "react";
import "./Banner.scss";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import dummy from "../../../../../assets/BusinessSite/banner-slider.png";
import demo_overlay_0 from "../../../../../assets/BusinessSite/request-demo-overly_0.svg";
import demo_overlay_1 from "../../../../../assets/BusinessSite/request-demo-overly_1.svg";
import RatingStar from "../../../../../assets/RatingStar_0.svg";
import { ReactSVG } from "react-svg";
import { useBusinessGetData } from "../../../../../hooks/useTanstackQuery.js";

const Banner = () => {
  const { getBusinessData, businessDataLoading, businessDataError } = useBusinessGetData();
  const reviewData = [
    { id: 1, content: "Review 1" },
    { id: 2, content: "Review 2" },
    { id: 3, content: "Review 3" },
    { id: 4, content: "Review 4" },
    { id: 5, content: "Review 5" },
    // Add more reviews as needed
  ];

  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "linear",
    arrows: false,
    dots: true,
    pauseOnHover: true,
  };

  return (
    <section className="business-banner position-relative">
      <div className="position-absolute top-0">
        <ReactSVG src={demo_overlay_0} />
      </div>
      <div className="position-absolute bottom-0 start-0">
        <ReactSVG src={demo_overlay_1} />
      </div>
      <div className="row position-relative">
        <div className="col-md-6 align-self-center">
          <div className="banner-left-side">
            <h1>Real reviews, trusted by millions, to help drive your business revenue</h1>
            <p>Attract and keep customers with TrustyFeedbackreview platform. We have a range of plans to help you reach more customers than ever before.</p>
            <div className="d-flex gap-3 flex-wrap">
              <Link to="#" className="default__btn">
                <span>Talk with and expert</span>
              </Link>
              <Link to="/business/log-in" className="default__btn white__btn">
                <span>Create free account</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="banner__slider__wrap">
            <Slider {...settings}>
              {[1, 2, 3, 4].map(() => (
                <div className="position-relative">
                  <img className="banner-slide-img" src={dummy} />
                  <div className="opt-slide">
                    {[1, 2].map(() => (
                      <div className="slider-img-card">
                        <div className="d-flex gap-2">
                          <img src={dummy} />
                          <div>
                            <h6 className="mb-0">John Doe</h6>
                            <p className="mb-0 text-dark">
                              <small className="text-secondary">Retail Store</small>
                            </p>
                            <div className="stars">
                              {[1, 2, 3, 4, 5].map(() => (
                                <ReactSVG src={RatingStar} />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
