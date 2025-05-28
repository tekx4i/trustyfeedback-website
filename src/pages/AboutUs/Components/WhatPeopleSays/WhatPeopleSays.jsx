import React from "react";
import "./WhatPeopleSays.scss";
import Slider from "react-slick";
import testiimg from "../../../../assets/Aboutus/testi-img.png";
import testiStar from "../../../../assets/Aboutus/testiStar_0.svg";
import { ReactSVG } from "react-svg";
const WhatPeopleSays = () => {
  const WhatPeopleSaysSlider = {
    infinite: true,
    speed: 5000,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    arrows: false,
    dots: true,
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <section className="testimonial__reviews fill__sec">
      <div className="container">
        <h2 className="big_margin text-center">What people says about TrustyFeedback</h2>
        <div className="all__testmonials">
          <Slider {...WhatPeopleSaysSlider}>
            <div className="testimonial__box">
              <div className="testimonial__wrap">
                <div className="testimonial__head d-flex  align-items-center">
                  <div className="test__img">
                    <img src={testiimg} alt="testiimg" />
                  </div>
                  <h6 className="mb-0">Elizabeth Olsen</h6>
                  <div className="testi_rating">
                    5/5 <ReactSVG src={testiStar} />
                  </div>
                </div>
                <div className="testimonial__content">
                  <p className="mb-0">TrustyFeedback has completely transformed our business! The reviews are genuine, and the insights have helped us grow immensely. Thanks to Trustyfeedback, we’ve built stronger customer relationships and gained valuable feedback. Highly recommend!</p>
                </div>
              </div>
            </div>
            <div className="testimonial__box">
              <div className="testimonial__wrap">
                <div className="testimonial__head d-flex  align-items-center">
                  <div className="test__img">
                    <img src={testiimg} alt="testiimg" />
                  </div>
                  <h6 className="mb-0">Elizabeth Olsen</h6>
                  <div className="testi_rating">
                    5/5 <ReactSVG src={testiStar} />
                  </div>
                </div>
                <div className="testimonial__content">
                  <p className="mb-0">TrustyFeedback has completely transformed our business! The reviews are genuine, and the insights have helped us grow immensely. Thanks to Trustyfeedback, we’ve built stronger customer relationships and gained valuable feedback. Highly recommend!</p>
                </div>
              </div>
            </div>
            <div className="testimonial__box">
              <div className="testimonial__wrap">
                <div className="testimonial__head d-flex  align-items-center">
                  <div className="test__img">
                    <img src={testiimg} alt="testiimg" />
                  </div>
                  <h6 className="mb-0">Elizabeth Olsen</h6>
                  <div className="testi_rating">
                    5/5 <ReactSVG src={testiStar} />
                  </div>
                </div>
                <div className="testimonial__content">
                  <p className="mb-0">TrustyFeedback has completely transformed our business! The reviews are genuine, and the insights have helped us grow immensely. Thanks to Trustyfeedback, we’ve built stronger customer relationships and gained valuable feedback. Highly recommend!</p>
                </div>
              </div>
            </div>
            <div className="testimonial__box">
              <div className="testimonial__wrap">
                <div className="testimonial__head d-flex  align-items-center">
                  <div className="test__img">
                    <img src={testiimg} alt="testiimg" />
                  </div>
                  <h6 className="mb-0">Elizabeth Olsen</h6>
                  <div className="testi_rating">
                    5/5 <ReactSVG src={testiStar} />
                  </div>
                </div>
                <div className="testimonial__content">
                  <p className="mb-0">TrustyFeedback has completely transformed our business! The reviews are genuine, and the insights have helped us grow immensely. Thanks to Trustyfeedback, we’ve built stronger customer relationships and gained valuable feedback. Highly recommend!</p>
                </div>
              </div>
            </div>
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default WhatPeopleSays;
