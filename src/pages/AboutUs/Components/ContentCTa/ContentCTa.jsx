import React from "react";
import "./ContentCTa.scss";
import halfCircle from "../../../../assets/Aboutus/half-circle.png";
import peoplesWithReview from "../../../../assets/Aboutus/peples-with-review.png";
const ContentCTa = () => {
  return (
    <section className="content__cta sec__padding">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6">
            <div className="c__cta__content">
              <h2>Connecting Consumers and Businesses Through Authentic Reviews</h2>
              <p className="mar_30">At TrustyFeedback, our mission is to help your business thrive through genuine, trusted reviews from real customers. We connect you with authentic feedback that builds credibility, drives improvement, and enhances your reputation.</p>
              <a href="/auth/login" className="default__btn">
                <span>Get Started</span>
              </a>
            </div>
          </div>
          <div className="col-md-6">
            <div className="c_cta__img position-relative text-center">
              <img src={peoplesWithReview} alt="halfCircle" />

              <div className="halfcircle">
                <img src={halfCircle} alt="halfCircle" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentCTa;
