import React from "react";
import "./Business.scss";
import { ReactSVG } from "react-svg";
import businessPlaceholder from "../../assets/business-placeholder_0.png";
import businessReview from "../../assets/business-review.png";
import verifiedIcon from "../../assets/approved-icon.svg";
import bigStars from "../../assets/big-stars_0.svg";
import { Link } from "react-router-dom";
import detailArrow from "../../assets/detail-arrow.svg";
import BusinessBadge from "../../assets/reward-business.svg";
import useSEO from "../../helper/SEOHelper";
import { REACT_APP_API_URL } from "../../constants/constants";
import SEO from "../SEO/SEO";

const Business = ({ children, showButton = true, additionalClasses = "" }) => {
  return (
    <div id="business-comp" className={`business__cta sec__padding fill__sec  ${additionalClasses}`}>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 align-self-center">
            {children}
            <h2>Find a TrustyFeedback integration</h2>
            <p>Connect Trustpilot to your tech stack with simple integrations that make it easy to collect, showcase, respond to, and learn from reviews.</p>
            {showButton && (
              <Link to="/business/integrations" className="default__btn green__btn">
                <span>Get Started</span>
              </Link>
            )}
          </div>
          <div className="col-lg-6 d-flex justify-content-center align-items-center">
            <div className="ps-5 align-self-center">
              <div className="position-relative d-flex justify-content-center align-items-center">
                <img src={businessPlaceholder} className="business-placeholder" />
                <div className="business-review">
                  <img src={"https://placehold.co/600x400"} className="business-review-img" />
                  <h6>
                    Your Business <ReactSVG src={verifiedIcon} />
                  </h6>
                  <p className="url-business mb-0">www.yourbusiness.com</p>
                  <div className="business-review-star">
                    <ReactSVG src={bigStars} />{" "}
                    <span>
                      4.9/5.0 <small className="text-secondary">(7891)</small>
                    </span>
                  </div>
                  <Link className="register-btn-business">
                    Register Now <ReactSVG src={detailArrow} />
                  </Link>
                </div>
                <div className="business-badge">
                  <div className="align-self-center me-2">
                    <ReactSVG src={BusinessBadge} />
                  </div>
                  <div className="align-self-center">
                    <h4 className="mb-0">Top Rated</h4>
                    <p className="mb-0">10k+ Real Reviews</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Business;
