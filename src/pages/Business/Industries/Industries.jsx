import React, { lazy, Suspense, useState } from "react";
import "./Industries.scss";
import Loader from "../../../Shared/Loader/Loader";
import s_banner_img from "../../../assets/workingmobile.png";

const BlogBox = lazy(() => import("../../../Shared/BlogBox/BlogBox"));
const BreadCrumb = lazy(() => import("../../../Shared/BreadCrumb/BreadCrumb"));
const FooterReuestDemoCta = lazy(() => import("../../../Shared/FooterReuestDemoCta/FooterReuestDemoCta"));
const ReviewsSmallBox = lazy(() => import("../../../Shared/ReviewsSmallBox/ReviewsSmallBox"));
const Industries = () => {
  return (
    <Suspense fallback={<Loader />}>
      <div className="our__industries__page ">
        <section className="attacknew__cus__banner page-bg fill__sec">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6">
                <div className="sb_banner_content clr__white banner__breadcrumb">
                  <BreadCrumb active="Industries" />
                  <h1>Discover how businesses in your industry are using TrustyFeedback</h1>
                  <p className="mb-0">Choose your industry below to access the latest consumer research, thought leadership articles, and case studies relevant to your business.</p>
                </div>
              </div>
              <div className="col-md-6 position-relative">
                <div className="s_banner__wrapper">
                  <ReviewsSmallBox />
                  <div className="s_banner_image text-end">
                    <img src={s_banner_img} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="reuest__demo__cta">
          <div className="container text-center">
            <h2 className="mb-0">Every second somebody writes a review on TrustyFeedback</h2>
          </div>
        </section>
        <section className="get__from__search sec__padding">
          <div className="container">
            <div className="row gap-30">
              {[1, 2, 3, 4, 5, 6].map(() => (
                <BlogBox extraClass={"col-lg-4 col-sm-6"} />
              ))}
            </div>
          </div>
        </section>
        <FooterReuestDemoCta />
      </div>
    </Suspense>
  );
};

export default Industries;
