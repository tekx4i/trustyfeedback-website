import React, { lazy, Suspense } from "react";
import "./ServicesReviews.scss";
import { ReactSVG } from "react-svg";
import Loader from "../../../Shared/Loader/Loader";
import s_banner_img from "../../../assets/bmen-img.png";
import customer_experience from "../../../assets/BusinessSite/customer-experience.png";
import restrurant_menu from "../../../assets/BusinessSite/restrurent-menu.png";
import givelikes from "../../../assets/BusinessSite/givelikes.png";
import buildtrust from "../../../assets/BusinessSite/buildtrust.png";
import fimg1 from "../../../assets/BusinessSite/rating.svg";
import fimg2 from "../../../assets/BusinessSite/kindness.svg";
import fimg3 from "../../../assets/BusinessSite/blood-tube.svg";
import diwcImg from "../../../assets/BusinessSite/d-iwc-img.png";

const BlogStyleThree = lazy(() => import("../../../Shared/BlogStyleThree/BlogStyleThree"));
const BreadCrumb = lazy(() => import("../../../Shared/BreadCrumb/BreadCrumb"));
const AboutUsCta = lazy(() => import("../../../Shared/AboutUsCta/AboutUsCta"));
const ReviewsSmallBox = lazy(() => import("../../../Shared/ReviewsSmallBox/ReviewsSmallBox"));

const ServicesReviews = () => {
  const blogs = Array(3).fill();
  return (
    <div id="attrackCustomers__page" className="have__cta">
      <Suspense fallback={<Loader />}>
        <section className="attacknew__cus__banner page-bg fill__sec">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6">
                <div className="sb_banner_content clr__white banner__breadcrumb">
                  <BreadCrumb active="Service Reviews" />
                  <h1>Let your brand join the conversation</h1>
                  <p>Collecting reviews on Trust feedback gives your current and future customers a place to learn about fellow shoppers’ experiences with your business.</p>
                  <a href="#" className="default__btn green__btn">
                    <span>Get a dome</span>
                  </a>
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
            <h5>Did you know?</h5>
            <h2>Verified reviews from TrustyFeedback count toward your Google Seller Rating.</h2>

            <a href="#" className="default__btn green__btn">
              <span> Seller ratings boost CTR on your Google ads by up to 10%</span>
            </a>
          </div>
        </section>

        <section className="business__iwc__area  flex__reverse bg__img__none bg__white img__have__radius have__review__transparent">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6">
                <div className="sm__content">
                  <h4>Business profile page</h4>
                  <h2>Catch the eye of future customers</h2>
                  <p>Reviews are published right to your profile page on Trustpilot.com, creating an endless stream of fresh and relevant content about your brand that can improve your rankings in search results.</p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="sr__image_wrapper position-relative">
                  <div className="rs__image text-end">
                    <img src={customer_experience} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="business__iwc__area fill__sec image__bottom light__green pt__small">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6">
                <div className="sr__image_wrapper">
                  <div className="sr_img text-start">
                    <img src={givelikes} alt="" />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="sm__content">
                  <h4>Review Invitations</h4>
                  <h2>All you have to do is ask</h2>
                  <p>Our robust selection of review invitation methods means you’ll never miss an opportunity for customer feedback. Start earning more verified reviews more quickly, so you can start celebrating the uptick in ROI.</p>
                  <div className="mi_btn_wrapper">
                    <a href="#" className="default__btn green__btn">
                      <span>Read More</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="business__iwc__area flex__reverse bg__img__none bg__white img__have__radius have__review__transparent">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6">
                <div className="sm__content">
                  <h4>Website conversion</h4>
                  <h2>Be discovered</h2>
                  <p>Make it even easier for consumers to find you and drive traffic to your profile page by selecting up to six business categories — or instantly importing them directly from your Google My Business profile.</p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="sr__image_wrapper position-relative">
                  <div className="rs__image text-end">
                    <img src={restrurant_menu} alt={restrurant_menu} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="business__iwc__area fill__sec image__bottom light__green buss__full__width">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6">
                <div className="sr__image_wrapper w-100">
                  <div className="sr_img w-100">
                    <img src={buildtrust} alt="" />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="sm__content">
                  <h4>Business Transparency</h4>
                  <h2>Build trust with transparency</h2>
                  <p>Automated fraud detection software screens every review for authenticity, to prevent unfair practices from both consumers and businesses. We also show how reviews are collected and managed — so both you and your customers can trust the integrity of your reviews.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="bus__icon__boxs sec__padding">
          <div className="container text-center">
            <h2 className="big_margin">Additional Features</h2>
            <div className="row">
              <div className="col-lg-4 col-md-6">
                <div className="icon__box">
                  <div className="ib__icon">
                    <ReactSVG src={fimg1} />
                  </div>
                  <h4>Google Seller Ratings</h4>
                  <p>As an official Google Review Partner, verified Trustpilot reviews count toward your Google Seller Rating and Bing Merchant Reviews. Seller Ratings put stars on your ads that draw peoples' attention and increase click-through.</p>
                  <a href="#" className="default__btn green__btn">
                    <span>Read More</span>
                  </a>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="icon__box">
                  <div className="ib__icon">
                    <ReactSVG src={fimg2} />
                  </div>
                  <h4>TrustBox widgets</h4>
                  <p>Increase conversions and sales by displaying Trustpilot reviews on your website with TrustBox widgets. With a cut and paste of code, you can share Trustpilot reviews on your site, email signatures, newsletters or anywhere your customers are looking.</p>
                  <a href="#" className="default__btn green__btn">
                    <span>Read More</span>
                  </a>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="icon__box">
                  <div className="ib__icon">
                    <ReactSVG src={fimg3} />
                  </div>
                  <h4>Widget split testing</h4>
                  <p>Want to know how Trustpilot is influencing sales? The TrustBox Optimizer A/B testing tools let you see how your pages perform both with and without Trustpilot reviews.</p>
                  <a href="#" className="default__btn green__btn">
                    <span>Read More</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="bus__icon__boxs how__its__work sec__padding fill__sec position-relative">
          <div className="container ">
            <h2 className=" clr__white text-center">How it works</h2>
            <div className="row">
              <div className="col-lg-3 col-md-6">
                <div className="icon__box">
                  <div className="ib__icon">
                    <ReactSVG src={fimg1} />
                  </div>
                  <h4>Get Reviews</h4>
                  <p>You'll have 90 days from first use to upload a CSV of your recent orders to Trustpilot and send email invitations in bulk to kickstart your profile. Then save time by automatically triggering the review invitation email to all future customers.</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="icon__box">
                  <div className="ib__icon">
                    <ReactSVG src={fimg1} />
                  </div>
                  <h4>Get Seen</h4>
                  <p>Earn Google Seller Ratings on your adwords, review stars in organic search, and share your reviews on social to make your brand stand out.</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="icon__box">
                  <div className="ib__icon">
                    <ReactSVG src={fimg1} />
                  </div>
                  <h4>Get Sold</h4>
                  <p>Add Trustpilot widgets to your website and advertising to build customer confidence and increase sales.</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="icon__box">
                  <div className="ib__icon">
                    <ReactSVG src={fimg1} />
                  </div>
                  <h4>Get Better</h4>
                  <p>Engage with your customers and analyze their feedback to find new ways to improve your business.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="dashlane__uses__iwc fill__sec">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6">
                <div className="diwc__img">
                  <img src={diwcImg} alt={diwcImg} />
                </div>
              </div>
              <div className="col-md-6">
                <div className="d__iwc__contenr">
                  <h3>Dashlane uses TrustyFeedback to get seen, get sold, and get better.</h3>
                  <p>See how they achieved a 93% lift in click-through-rates, and 14.5% increase in conversions.Dashlane uses TrustyFeedback to get seen, get sold, and get better.</p>
                  <a href="#" className="default__btn green__btn">
                    <span>Read Dashlane’s case study</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="intrest__blogs sec__padding">
          <div className="container">
            <h2 className="text-center big_margin">This may also interest you</h2>
            <div className="row">
              {blogs?.map((_, index) => (
                <BlogStyleThree key={index} additionalClasses="col-lg-4 col-md-6 col-sm-6 style__change" />
              ))}
            </div>
          </div>
        </section>
        <AboutUsCta />
      </Suspense>
    </div>
  );
};

export default ServicesReviews;
