import React from "react";
import menMobile from "../../assets/men-with-mobile.png";
import gorvetgrill from "../../assets/gorvet-grill.svg";
import singleStar from "../../assets/single-star.svg";
import directionRight from "../../assets/direction-right.svg";
import bigStars from "../../assets/cta_star.svg";
import "./AboutUsCta.scss";
import { ReactSVG } from "react-svg";
import { Link } from "react-router-dom";

const AboutUsCta = () => {
  return (
    <section className="about__us__cta">
      <div className="container">
        <div className="aus__cta__wrap clr__white">
          <div className="row">
            <div className="col-lg-7">
              <div className="aus__cta__content">
                <h2>We Provide TrustyFeedback You Can Rely On</h2>
                <p>We’re a review platform accessible to all. Our vision is to become a global symbol of trust, empowering consumers to shop confidently while helping businesses grow and improve.</p>
                <Link to="/about-us" className="default__btn green__btn">
                  <span>More About Us</span>
                </Link>
              </div>
            </div>
            <div className="col-lg-5 d-flex align-items-end justify-content-end position-relative">
              <div className="hows__order__box">
                <div className="hows_head d-flex align-items-center">
                  <div className="hows_icon">
                    <ReactSVG src={gorvetgrill} />
                  </div>

                  <h6 className="mb-0">How was your order?</h6>
                </div>
                <p>Give us a review</p>
                <div className="startsList">
                  <ul className="d-flex">
                    <li>
                      <ReactSVG src={bigStars} />
                    </li>
                    <li>
                      <ReactSVG src={bigStars} />
                    </li>
                    <li>
                      <ReactSVG src={bigStars} />
                    </li>
                    <li>
                      <ReactSVG src={bigStars} />
                    </li>
                    <li>
                      <ReactSVG src={bigStars} />
                    </li>
                  </ul>
                </div>
              </div>
              <div className="direction__right">
                <ReactSVG src={directionRight} />
              </div>
              <div className="review_qoute">
                <p> It was Delicious!</p>
                <div className="qoute__star d-flex">
                  <ReactSVG src={bigStars} />
                  <ReactSVG src={bigStars} />
                  <ReactSVG src={bigStars} />
                  <ReactSVG src={bigStars} />
                </div>
              </div>
              <div className="aboutus__img position-relative">
                <img src={menMobile} alt="menMobile" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsCta;
