import React from "react";
import { Link } from "react-router-dom";

const WhyBusiness = () => {
  return (
    <section className="why__bussiness__reply fill__sec sec__padding">
      <div className="container">
        <h2 className="text-center clr__white big_margin">Why businesses rely on TrustyFeedback</h2>
        <div className="whybussiness__feedback__box ">
          <div className="row">
            <div className="col-sm-6">
              <div className="wb__feedbackbox">
                <div className="wbf__wrap">
                  <h2>
                    Salesforce
                    <br /> Integration
                  </h2>
                  <p>
                    reviews in total written across +1.1
                    <br />7 million domains
                  </p>
                  <Link to="#" className="default__btn green__btn">
                    <span>Find out more</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyBusiness;
