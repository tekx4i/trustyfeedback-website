import React, { lazy, Suspense } from "react";
import "./Enterprice.scss";
import { ReactSVG } from "react-svg";
import Loader from "../../../Shared/Loader/Loader";
import s_banner_img from "../../../assets/BusinessSite/s_banner_img.png";
import s_review_client from "../../../assets/BusinessSite/s_review_client.png";
import market_insignts_img from "../../../assets/BusinessSite/market_insignts_img.png";
import assisted_mobile_img from "../../../assets/BusinessSite/assisted_mobile_img.png";
import profile_costumization_img from "../../../assets/BusinessSite/profile_costumization_img.png";
import review_spotlight_img from "../../../assets/BusinessSite/review_spotlight_img.png";
import start from "../../../assets/BusinessSite/start.svg";
import startsmall from "../../../assets/cta_star.svg";
import useSEO from "../../../helper/SEOHelper";
import { REACT_APP_API_URL } from "../../../constants/constants";
import SEO from "../../../Shared/SEO/SEO";
const ToolsLogo = lazy(() => import("../../../Shared/ToolsLogo/ToolsLogo"));
const BreadCrumb = lazy(() => import("../../../Shared/BreadCrumb/BreadCrumb"));
const AboutUsCta = lazy(() => import("../../../Shared/AboutUsCta/AboutUsCta"));
const ReviewsSmallBox = lazy(() => import("../../../Shared/ReviewsSmallBox/ReviewsSmallBox"));

const Enterprice = () => {
  const { data: SeoData } = useSEO(`${REACT_APP_API_URL}page/single/?url=enterprise`);
  return (
    <div id="enterprice__page" className="have__cta">
      <SEO title={SeoData?.meta_title || "TrustyFeedback"} description={SeoData?.meta_description} keywords="TrustyFeedback" />
      <Suspense fallback={<Loader />}>
        <div className="bg__animation__wrap">
          <div className="bg_circle_one"></div>
          <div className="bg_circle_two"></div>
          <div className="bg_circle_three"></div>
          <div className="bg_circle_four"></div>
        </div>
        <section className="s__business__banner page-bg fill__sec">
          <div className="container">
            <div className="row align-items-end">
              <div className="col-md-6 ">
                <div className="sb_banner_content clr__white banner__breadcrumb">
                  <BreadCrumb active="Enterprise" />
                  <h1>Smart businesses Rely on TrustyFeedback</h1>
                  <p>We’re the go-to platform for enterprise businesses across the globe, built to help you maximize impact from your customer reviews, instead of just collecting them.</p>
                  <div className="sb_btn_wrapper">
                    <a href="/business/pricing" className="default__btn ">
                      <span>Book a Demo</span>
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-6 position-relative">
                <div className="s_banner__wrapper">
                  <div className="s_banner_image">
                    <img src={s_banner_img} alt="" />
                  </div>
                  <div className="sb_client_review">
                    <div className="sbc_wrapper__area  d-flex">
                      <div className="client__img">
                        <img src={s_banner_img} alt="" />
                      </div>
                      <div className="client__info">
                        <h4>John Doe</h4>
                        <p>Retail seller</p>
                        <span>
                          <ReactSVG src={startsmall} />
                          <ReactSVG src={startsmall} />
                          <ReactSVG src={startsmall} />
                          <ReactSVG src={startsmall} />
                          <ReactSVG src={startsmall} />
                        </span>
                      </div>
                    </div>
                    <div className="sbc_wrapper__area  d-flex ">
                      <div className="client__img">
                        <img src={s_review_client} alt="" />
                      </div>
                      <div className="client__info">
                        <h4>Michel</h4>
                        <p>Retail seller</p>
                        <span>
                          <ReactSVG src={startsmall} />
                          <ReactSVG src={startsmall} />
                          <ReactSVG src={startsmall} />
                          <ReactSVG src={startsmall} />
                          <ReactSVG src={startsmall} />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <ToolsLogo />
        <section className="business__iwc__area sec__radius">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6">
                <div className="sm__image">
                  <img src={market_insignts_img} alt="" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="sm__content">
                  <h2>Market insights</h2>
                  <p>
                    <strong>Gain a competitive advantage with TrustyFeedback’s market intelligence suite</strong>
                  </p>
                  <div className="sb__listing">
                    <ul>
                      <li>
                        <span> Uncover trends & opportunities:</span> Leverage AI-powered analysis of reviews and competitor data to identify key market shifts, understand customer sentiment, and discover unique ways to differentiate your brand.
                      </li>
                      <li>
                        <span> Uncover trends & opportunities:</span> Leverage AI-powered analysis of reviews and competitor data to identify key market shifts, understand customer sentiment, and discover unique ways to differentiate your brand.
                      </li>
                    </ul>
                  </div>
                  <div className="mi_btn_wrapper">
                    <a href="/business/blog" className="default__btn ">
                      <span>Learn More</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="business__iwc__area  flex__reverse bg__img__none bg__white img__have__radius have__review__transparent">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6">
                <div className="sm__content">
                  <h2>Review spotlight</h2>
                  <p>Unlock customer insights at scale: empower data-driven decisions with Review spotlight</p>
                  <div className="sb__listing">
                    <ul>
                      <li>
                        <span> Gain actionable insights:</span> Unearth hidden trends and understand customer sentiment at scale.
                      </li>
                      <li>
                        <span>Optimize operations:</span> Identify areas for improvement and prioritize resources effectively.
                      </li>
                      <li>
                        <span>Enhance customer experience:</span>Proactively address customer concerns and foster positive brand perception.
                      </li>
                    </ul>
                  </div>
                  <div className="mi_btn_wrapper">
                    <a href="/business/blog" className="default__btn ">
                      {" "}
                      <span>Learn More</span>
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="sr__image_wrapper position-relative">
                  <div className="rs__image text-end">
                    <img src={review_spotlight_img} alt="" />
                  </div>
                  <div className="sb_client_review rs_client__review_sec ">
                    <div className="sbc_wrapper__area d-flex">
                      <div className="client__img">
                        <img src={s_review_client} alt="" />
                      </div>
                      <div className="client__info">
                        <h4>John Doe</h4>
                        <p>Retail seller</p>
                        <span>
                          <ReactSVG src={start} />
                        </span>
                      </div>
                    </div>
                    <div className="sbc_wrapper__area d-flex ">
                      <div className="client__img">
                        <img src={s_review_client} alt="" />
                      </div>
                      <div className="client__info">
                        <h4>Michel</h4>
                        <p>Retail seller</p>
                        <span>
                          <ReactSVG src={start} />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="business__iwc__area fill__sec image__bottom">
          <div className="container">
            <div className="row">
              <div className="col-md-6 ">
                <div className="sr__image_wrapper">
                  <div className="sr_img text-start">
                    <img src={assisted_mobile_img} alt="" />
                  </div>
                  <ReviewsSmallBox />
                </div>
              </div>
              <div className="col-md-6">
                <div className="sm__content">
                  <h2>AI-assisted review responses</h2>
                  <p>Scale trust and efficiency with Trustpilot's AI-powered Review Response engine.</p>
                  <p>Craft tailored replies to customer feedback that incorporates your brand tone of voice and typical patterns for resolving issues or thanking customers.</p>
                  <p>Expand your customer reach with pre-designed on-brand review response templates that not only save time but allow you to engage with more users, strengthening your community and building customer loyalty.</p>
                  <div className="mi_btn_wrapper">
                    <a href="/business/blog" className="default__btn ">
                      <span>Learn More</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="business__iwc__area flex__reverse bg__img__none bg__white large__text">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6">
                <div className="sm__content">
                  <h4>Review Invitations</h4>
                  <h2>Profile customization</h2>
                  <p>
                    <strong> Dominate the customer journey and amplify brand reach with Trustpilot</strong>
                  </p>
                  <p>Trustpilot offers a strategic platform for businesses to connect with a vast audience of in-market consumers, strengthen SEO efforts, and solidify brand reputation, ultimately driving business growth. </p>

                  <div className="mi_btn_wrapper">
                    <a href="/business/blog" className="default__btn ">
                      <span>Learn More</span>
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="pc__image__wrapper">
                  <div className="pc_img text-start">
                    <img src={profile_costumization_img} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <AboutUsCta />
      </Suspense>
    </div>
  );
};

export default Enterprice;
