import React, { lazy, Suspense } from "react";
import "./AboutUs.scss";
import Loader from "../../Shared/Loader/Loader";
import banner from "../../assets/Aboutus/about-us-banner.png";
import TrustyTeam from "../AboutUs/Components/TrustyTeam/TrustyTeam";
import ContentCTa from "../AboutUs/Components/ContentCTa/ContentCTa";
import WhatPeopleSays from "../AboutUs/Components/WhatPeopleSays/WhatPeopleSays";
import FAQs from "../AboutUs/Components/FAQs/FAQs";
import CircleImages from "../../assets/CircleImages_0.svg";
import { ReactSVG } from "react-svg";
import useSEO from "../../helper/SEOHelper";
import { REACT_APP_API_URL } from "../../constants/constants";
import SEO from "../../Shared/SEO/SEO";
const BusinessSearch = lazy(() => import("../../Shared/BusinessSearch/BusinessSearch"));
const Breadcrumb = lazy(() => import("../../Shared/BreadCrumb/BreadCrumb"));

const AboutUs = () => {
  const { data } = useSEO(`${REACT_APP_API_URL}page/single/?url=about-us`);
  return (
    <div className="about-us">
      <Suspense fallback={<Loader />}>
        <SEO title={data?.meta_title || "TrustyFeedback"} description={data?.meta_description} keywords="TrustyFeedback" />
        <section className="about__top__sec">
          <div className="d-flex justify-content-center">
            <Breadcrumb active={"About"} />
          </div>

          <div className="container">
            <div className="text-center">
              <h1 className="mx-auto">TrustyFeedback connects people with great local businesses.</h1>
            </div>
            <div className="ceo-msg row">
              <div className="col-sm-6 align-self-center">
                <h2>Meet Our Founder & CEO</h2>
              </div>
              <div className="col-sm-6">
                <p className="mb-0">Our vision is to become the universal symbol of trust, empowering consumers to make confident, informed buying decisions while allowing businesses to credibly signal the quality of their services and to gain actionable insights to improve them.</p>
              </div>
            </div>
            <div className="ceo__img">
              <img className="mt-5" src={banner} />
            </div>
          </div>
        </section>
        <section className="animation__with__content fill__sec">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6">
                <div className="circle__animated__images">
                  <ReactSVG src={CircleImages} />
                </div>
              </div>
              <div className="col-md-6">
                <div className="awc__content">
                  <h2 className="clr__white">We're TrustyFeedback, Committed to Growing Your Business!</h2>
                  <p className="clr__white">At Trustyfeedback, our mission is to help your business thrive through genuine, trusted reviews from real customers. We connect you with authentic feedback that builds credibility, drives improvement, and enhances your reputation.</p>
                  <a href="/business/log-in" className="default__btn green__btn">
                    <span>Get Started</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <TrustyTeam />
        <ContentCTa />
        <WhatPeopleSays />
        <FAQs />
        <div className="have__bg__sbox">
          <BusinessSearch />
        </div>
      </Suspense>
    </div>
  );
};

export default AboutUs;
