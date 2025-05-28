import React, { lazy, Suspense } from "react";
import "./AttractNewCustomers.scss";
import { ReactSVG } from "react-svg";
import Loader from "../../../Shared/Loader/Loader";
import s_banner_img from "../../../assets/attractCustomers.png";
import s_review_client from "../../../assets/BusinessSite/s_review_client.png";
import mobilehand from "../../../assets/BusinessSite/mobilehand.png";
import review_spotlight_img from "../../../assets/BusinessSite/review_spotlight_img.png";
import start from "../../../assets/BusinessSite/yellow-stars.svg";
import SEO from "../../../Shared/SEO/SEO";
import useSEO from "../../../helper/SEOHelper";
import { REACT_APP_API_URL } from "../../../constants/constants";
const SectionBlogBox = lazy(() => import("../../../Shared/SectionBlogBox/SectionBlogBox"));
const BreadCrumb = lazy(() => import("../../../Shared/BreadCrumb/BreadCrumb"));
const AboutUsCta = lazy(() => import("../../../Shared/AboutUsCta/AboutUsCta"));
const ReviewsSmallBox = lazy(() => import("../../../Shared/ReviewsSmallBox/ReviewsSmallBox"));

const AttractNewCustomers = () => {
  const { data } = useSEO(`${REACT_APP_API_URL}page/single/?url=attract-new-customers`);
  return (
    <div id="attrackCustomers__page" className="have__cta">
      <SEO title={data?.meta_title || "TrustyFeedback"} description={data?.meta_description} keywords="TrustyFeedback" />

      <Suspense fallback={<Loader />}>
        <section className="attacknew__cus__banner page-bg fill__sec">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6">
                <div className="sb_banner_content clr__white banner__breadcrumb">
                  <BreadCrumb active="Attract New Customers" />
                  <h1>Earn trust at every touch point</h1>
                  <p>Use review content on your website to see conversions increase up to 23%</p>
                </div>
              </div>
              <div className="col-md-6 position-relative">
                <div className="s_banner__wrapper">
                  <div className="s_banner_image text-end">
                    <img src={s_banner_img} alt="" />
                  </div>
                  {/* <div className="sb_client_review">
                    <div className="sbc_wrapper__area d-flex">
                      <div className="client__img">
                        <img src={s_banner_img} alt="" />
                      </div>
                      <div className="client__info">
                        <h4>John Doe</h4>
                        <p>Retail seller</p>
                        <span>
                          <ReactSVG src={start} />
                        </span>
                      </div>
                    </div>
                    <div className="sbc_wrapper__area d-flex">
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
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="reuest__demo__cta">
          <div className="container text-center">
            <h2>Why share reviews beyond your profile page?</h2>
            <p>Your future customers are looking for authentic reviews before they make a purchase. Showing them TrustyFeedback reviews gives them the confidence they need to buy — and gives you the sales you need to grow.</p>
            <a href="#" className="default__btn ">
              <span>Request a Demo</span>
            </a>
          </div>
        </section>

        <section className="business__iwc__area bg__img__none bg__white img__have__radius have__review__transparent flex__reverse">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6">
                <div className="sm__content">
                  <h4>Website conversion</h4>
                  <h2>Drive website conversions with review widgets</h2>
                  <p>
                    Business customers using Trustscores or review content on their websites and in marketing campaigns can see up to a 23% increase in website conversions. Showcase your most recent and relevant customer reviews across your website and emails with our extensive library of dynamic
                    widgets.
                  </p>
                  <div className="mi_btn_wrapper">
                    <a href="#" className="default__btn">
                      <span>TrustyFeedback Widgets</span>
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="sr__image_wrapper position-relative">
                  <div className="rs__image text-end">
                    <img src={review_spotlight_img} alt="" />
                  </div>
                  <div className="sb_client_review rs_client__review_sec">
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
                    <div className="sbc_wrapper__area d-flex">
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
            <div className="row align-items-center">
              <div className="col-md-6">
                <div className="sr__image_wrapper">
                  <div className="sr_img text-start">
                    <img src={mobilehand} alt="" />
                  </div>
                  <ReviewsSmallBox />
                </div>
              </div>
              <div className="col-md-6">
                <div className="sm__content">
                  <h2>Generate sales with product reviews</h2>
                  <p>Climb the ranks as search engines index your product review content. Take social proof to the next level with real customer photos and videos alongside robust product reviews, enticing shoppers to click “Buy”.</p>
                  <div className="mi_btn_wrapper">
                    <a href="#" className="default__btn">
                      <span>Product Reviews</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="business__iwc__area bg__img__none bg__white img__have__radius have__review__transparent flex__reverse">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6">
                <div className="sm__content">
                  <h4>Website conversion</h4>
                  <h2>Create co-branded TrustyFeedback ads</h2>
                  <p>US consumers were 88% more likely click through on a TrustyFeedback co-branded ad when it contains an authentic review. Save time and money with downloadable templates to transform your customer feedback into standout promotional materials.</p>
                  <div className="mi_btn_wrapper">
                    <a href="#" className="default__btn">
                      <span>Marketing Assets</span>
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="sr__image_wrapper position-relative">
                  <div className="rs__image text-end">
                    <img src={review_spotlight_img} alt="" />
                  </div>
                  <div className="sb_client_review rs_client__review_sec">
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
                    <div className="sbc_wrapper__area d-flex">
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
        <SectionBlogBox />
        <AboutUsCta />
      </Suspense>
    </div>
  );
};

export default AttractNewCustomers;
