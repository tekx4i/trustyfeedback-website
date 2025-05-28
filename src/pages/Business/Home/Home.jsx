import React, { lazy, Suspense } from "react";
import Loader from "../../../Shared/Loader/Loader";
import "./Home.scss";
import SEO from "../../../Shared/SEO/SEO";
import useSEO from "../../../helper/SEOHelper";
import { REACT_APP_API_URL } from "../../../constants/constants";
const Banner = lazy(() => import("./Component/Banner/Banner"));
const BusinessSearch = lazy(() => import("./Component/BusinessSearch/BusinessSearch"));
const Stats = lazy(() => import("./Component/Stats/Stats"));
const WhyBusiness = lazy(() => import("./Component/WhyBusiness/WhyBusiness"));
const ToolsLogo = lazy(() => import("../../../Shared/ToolsLogo/ToolsLogo"));
const SectionBlogBox = lazy(() => import("../../../Shared/SectionBlogBox/SectionBlogBox"));
const FooterReuestDemoCta = lazy(() => import("../../../Shared/FooterReuestDemoCta/FooterReuestDemoCta"));

const BusinessHome = () => {
  const { data } = useSEO(`${REACT_APP_API_URL}page/single/?url=business/home`);

  return (
    <main id="business-home">
      <SEO title={data?.meta_title || "TrustyFeedback"} description={data?.meta_description} keywords="TrustyFeedback" />
      <Suspense fallback={<Loader />}>
        <Banner />
        <BusinessSearch />
        <Stats />
        <section className="why__bussiness__reply fill__sec sec__padding">
          <div className="container">
            <h2 className="text-center clr__white big_margin">Why businesses rely on TrustyFeedback</h2>
            <div className="whybussiness__feedback__box ">
              <div className="row">
                <div className="col">
                  <div className="wb__feedbackbox">
                    <div className="wbf__wrap">
                      <h2>Salesforce Integration</h2>
                      <p>reviews in total written across +1.17 million domains</p>
                      <a href="#" className="default__btn ">
                        <span>Find out more</span>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="wb__feedbackbox">
                    <div className="wbf__wrap">
                      <h2>TrustyFeedback joins the rally of Trust</h2>
                      <p>reviews in total written across +1.17 million domains reviews in total written across</p>
                      <a href="#" className="default__btn">
                        <span>Find out more</span>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="wb__feedbackbox">
                    <div className="wbf__wrap">
                      <h2>Find the right Pricing plan for your business</h2>
                      <p>Whether you’re a new business or a household name, we have a range of plans to help you reach more customers than ever before.</p>
                      <a href="#" className="default__btn ">
                        <span>Find out more</span>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="wb__feedbackbox">
                    <div className="wbf__wrap">
                      <h2>Marketing Widgets</h2>
                      <p>Visitors say they are satisfied when they see TrustyFeedback</p>
                      <a href="#" className="default__btn ">
                        <span>Find out more</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <ToolsLogo />
        <SectionBlogBox />
        <FooterReuestDemoCta />
      </Suspense>
    </main>
  );
};

export default BusinessHome;
