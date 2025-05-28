import React, { lazy, Suspense } from "react";
import Loader from "../../../Shared/Loader/Loader";
import "./HelpCenter.scss";
const BreadCrumb = lazy(() => import("../../../Shared/BreadCrumb/BreadCrumb"));
const SearchWithCategory = lazy(() => import("../../../Shared/SearchWithCategory/SearchWithCategory"));

import { ReactSVG } from "react-svg";
import menMobile from "../../../assets/BusinessSite/woman-standing.png";
import gorvetgrill from "../../../assets/gorvet-grill.svg";
// import bigStars from "../../../assets/bigStarsr.svg";
import directionRight from "../../../assets/direction-right.svg";
import comment from "../../../assets/BusinessSite/comment.svg";
import videoOverly from "../../../assets/BusinessSite/video-overly.png";
import bigStars from "../../../assets/cta_star.svg";
// import bigStars from "../../assets/cta_star.svg";

const HelpCenter = () => {
  return (
    <div id="HelpCenter__page">
      <Suspense fallback={<Loader />}>
        <section className="help__center__banner fill__sec">
          <div className="container">
            <div className="aus__cta__wrap clr__white">
              <div className="row align-items-center">
                <div className="col-lg-7">
                  <div className="aus__cta__content banner__breadcrumb">
                    <BreadCrumb active="Help Center" />
                    <h1>Trusted Feedback Help Center</h1>
                    <p>Let's find the answers together</p>
                    <SearchWithCategory />
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
                    <div className="qoute__star d-flex ">
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
        <section className="bus__icon__boxs sec__padding">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-md-6">
                <div className="icon__box">
                  <div className="ib__icon">
                    <ReactSVG src={comment} />
                  </div>
                  <h4>For reviewers</h4>
                  <p>Everything you need to know about using Trust feedback as a reviewer is here. Learn how to write reviews, find trustworthy businesses and more.</p>
                  <a href="#" className="default__btn">
                    <span>See reviewer articles</span>
                  </a>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="icon__box">
                  <div className="ib__icon">
                    <ReactSVG src={comment} />
                  </div>
                  <h4>For businesses</h4>
                  <p>Using Trust feedback for your business? Explore our range of tools and solutions designed to help you at any stage of your business journey.</p>
                  <a href="#" className="default__btn ">
                    <span>See business articles</span>
                  </a>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="icon__box">
                  <div className="ib__icon">
                    <ReactSVG src={comment} />
                  </div>
                  <h4>Video hub</h4>
                  <p>Browse our library of tutorials, demos, and explainer videos. Whether you're a reviewer or a business, there's something here for you.</p>
                  <a href="#" className="default__btn ">
                    <span>Watch now</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="self__service__facts fill__sec sec__padding">
          <div className="container  text-center">
            <div className="sfact__head clr__white mx-auto">
              <h2>Your one stop for all things self-service</h2>
              <p>You know what you're looking for better than anyone. We're here to guide you along the way, so you can find the solutions you're searching for with confidence. We're your source for 24/7 help on your own time.</p>
            </div>
            <div className="all__facts">
              <h4 className="clr__white">Here's some self-service facts:</h4>
              <div className="row">
                <div className="col-lg-3 col-md-4 col-sm-6">
                  <div className="fact__box">
                    <div className="fact__num">70</div>
                    <p className="mb-0">Topics</p>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-6">
                  <div className="fact__box">
                    <div className="fact__num">+560</div>
                    <p className="mb-0">Videos</p>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-6">
                  <div className="fact__box">
                    <div className="fact__num">+2.3K</div>
                    <p className="mb-0">Articles</p>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-6">
                  <div className="fact__box">
                    <div className="fact__num">340K</div>
                    <p className="mb-0">Users per month</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="our__video__area sec__padding">
          <div className="container">
            <div className="vi__head text-center mx-auto">
              <h2>We're here to help!</h2>
              <p>Our resources are designed to bring you the smoothest self-service experience out there. Whether you’re a reviewer or a business, you’ll be able to learn how to use Trustpilot like a pro.</p>
            </div>
            <div className="our__video__wrap">
              <video class="video" poster={videoOverly}>
                <source src="video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </section>
      </Suspense>
    </div>
  );
};

export default HelpCenter;
