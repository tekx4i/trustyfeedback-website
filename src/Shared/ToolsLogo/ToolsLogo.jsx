import React from "react";
import "./ToolsLogo.scss";
import { ReactSVG } from "react-svg";
import Slider from "react-slick";
import shopifylogo from "../../assets/Shopify-logo.svg";

const ToolsLogo = () => {
  const ToolsLogoSlider = {
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    arrows: false,
    dots: false,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 500,
        settings: {
          variableWidth: false,
          slidesToShow: 1,
        },
      },

      {
        breakpoint: 900,
        settings: {
          variableWidth: false,
          slidesToShow: 3,
        },
      },
    ],
  };
  return (
    <section className="toolsLogo__area text-center">
      <div className="container">
        <h2 className="big_margin">We easily integrate with your existing tools</h2>

        <div className="toolslogo__slider">
          <Slider {...ToolsLogoSlider}>
            <div className="toolslog__wrap">
              <div className="toolslog__box">
                <ReactSVG src={shopifylogo} />
              </div>
            </div>
            <div className="toolslog__wrap">
              <div className="toolslog__box">
                <ReactSVG src={shopifylogo} />
              </div>
            </div>
            <div className="toolslog__wrap">
              <div className="toolslog__box">
                <ReactSVG src={shopifylogo} />
              </div>
            </div>
            <div className="toolslog__wrap">
              <div className="toolslog__box">
                <ReactSVG src={shopifylogo} />
              </div>
            </div>
            <div className="toolslog__wrap">
              <div className="toolslog__box">
                <ReactSVG src={shopifylogo} />
              </div>
            </div>
          </Slider>
        </div>
        <a href="/business/integrations" className="default__btn ">
          <span>Find out more</span>
        </a>
      </div>
    </section>
  );
};

export default ToolsLogo;
