import React, { lazy, Suspense, useState, useEffect } from "react";

import Loader from "../../Shared/Loader/Loader";
import { ReactSVG } from "react-svg";
import ReviewCardLoader from "../../Shared/Loader/Home/ReviewCardLoader";
import howWork from "../../assets/How_works_img.png";
import hwone from "../../assets/hw-2.svg";
import hwboximg from "../../assets/How_works_box_img.png";
import "./HowItsWork.scss";
import { REACT_APP_API_URL } from "../../constants/constants";
import { apiGet } from "../../services/userAuth";
import useSEO from "../../helper/SEOHelper";
import SEO from "../../Shared/SEO/SEO";
const CompanyReviewBox = lazy(() => import("../../Shared/CompanyReviewBox/CompanyReviewBox"));
const Breadcrumb = lazy(() => import("../../Shared/BreadCrumb/BreadCrumb"));
import { FiStar } from "react-icons/fi";
import { RiSpam2Line, RiComputerLine } from "react-icons/ri";
import { MdOutlineReportProblem } from "react-icons/md";

const HowItsWork = () => {
  const reviewData = [
    { id: 1, content: "Review 1" },
    { id: 2, content: "Review 2" },
    { id: 3, content: "Review 3" },
  ];

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState();
  const { data: SeoData } = useSEO(`${REACT_APP_API_URL}page/single/?url=how-it-works`);

  const getReviews = async () => {
    setLoading(true);
    try {
      const URL = `${REACT_APP_API_URL}business`;
      const params = {
        limit: 3,
      };
      const response = await apiGet(URL, params);
      if (response.success === true) {
        const dbValues = response.data.payload.records;
        setData(dbValues);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getReviews();
  }, []);

  return (
    <div className="HowItsWorl">
      <SEO title={SeoData?.meta_title || "TrustyFeedback"} description={SeoData?.meta_description} keywords="TrustyFeedback" />
      <div className="bg__animation__wrap">
        <div className="bg_circle_one"></div>
        <div className="bg_circle_two"></div>
        <div className="bg_circle_three"></div>
        <div className="bg_circle_four"></div>
      </div>
      <Suspense fallback={<Loader />}>
        <section className="how_works_hero">
          <div className="container">
            <div className="hows_work_top text-center">
              <div className="d-flex justify-content-center">
                <Breadcrumb active={"How it Works"} />
              </div>
              <h1>We're open to all.</h1>
              <p>A platform where customers rate businesses, sharing reviews to guide others and help companies improve.</p>
            </div>
            <div className="hw_hero_details">
              <div className="hw_image">
                <img src={howWork} alt=" {howWork}" />
              </div>
              <div className="hw_content">
                <h3>How do reviews get on TrustyFeedback?</h3>
                <p>
                  Reviews on TrustyFeedback are written by consumers from across the globe. Anyone who has had a recent buying or service experience can write a review, for free, as long as they have a TrustyFeedback user account, follow our Guidelines for Reviewers, and don’t have a conflict of
                  interest with the business they’re reviewing. A user account must be connected to an email address so we can get in touch for account- and service- related issues.
                </p>
                <p>All reviews about a business are shown on their profile page. This is where consumers can read and write reviews, and find other relevant information about the business, such as the overall TrustScore and star rating. A TrustyFeedback review can start in two ways:</p>
              </div>
            </div>
            <div className="hw__bottom row crbox__change">{loading ? <ReviewCardLoader /> : data && data.map((item, key) => <CompanyReviewBox data={item} key={key} />)}</div>
          </div>
        </section>
        <section className="how_works_icon_box">
          <div className="container">
            <div className="row flex-row flex-wrap">
              <div className="col-md-6">
                <div className="hw_ibx_details">
                  <div className="hw_ibx_header d-flex align-items-center">
                    <div className="text-center">
                      <RiComputerLine size={30} />
                    </div>
                    <h3>Being open is in our DNA</h3>
                  </div>
                  <div className="hw_text">
                    <p>
                      At TrustyFeedback, we believe in transparency and openness. Our platform is designed to give consumers a voice and businesses an opportunity to learn and improve. We allow anyone to share their honest experiences without pre-screening or moderation by businesses. Unlike closed
                      platforms where companies control which reviews are visible, TrustyFeedback ensures that all genuine reviews are published and accessible to everyone. We are committed to fostering a community built on real experiences and honest feedback.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="hw_ibx_details">
                  <div className="hw_ibx_header d-flex align-items-center">
                    <div className="text-center">
                      <FiStar size={30} />
                    </div>
                    <h3>Consumers own their reviews</h3>
                  </div>
                  <div className="hw_text">
                    <p>
                      Your reviews, your control. At TrustyFeedback, we respect your right to manage your own content. You can edit or permanently delete your reviews at any time through your user account. As long as your account exists, your reviews remain visible, helping other consumers make
                      informed decisions. If you decide to delete your account, all your reviews are permanently removed as well. We believe in giving users complete ownership over their contributions.{" "}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="hw_ibx_details">
                  <div className="hw_ibx_header d-flex  align-items-center">
                    <div className="text-center">
                      <RiSpam2Line size={30} />
                    </div>
                    <h3>Fighting fake reviews</h3>
                  </div>
                  <div className="hw_text">
                    <p>
                      Authenticity is at the core of TrustyFeedback. We take strong measures to prevent fake reviews from influencing our platform. Our system uses advanced detection methods to identify suspicious activity, and we encourage our community to report misleading reviews. Unlike
                      platforms that allow companies to selectively remove feedback, we ensure that every legitimate review, whether positive or negative, is published. This helps businesses and consumers make fair and informed decisions.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 ">
                <div className="hw_ibx_details">
                  <div className="hw_ibx_header d-flex align-items-center">
                    <div className="text-center">
                      <MdOutlineReportProblem size={30} />
                    </div>
                    <h3>Flagging reviews</h3>
                  </div>
                  <div className="hw_text">
                    <p>
                      TrustyFeedback is committed to maintaining a fair and reliable review system. If you come across a review that seems fraudulent, offensive, or violates our guidelines, you can flag it for review. Our dedicated team will investigate to ensure compliance with our policies. While
                      we support open feedback, we also strive to protect users from spam, abuse, or misleading content. Flagging helps keep TrustyFeedback a trusted space for real experiences.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="how_works_image_box">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6">
                <div className="hw_image_content">
                  <h3>A neutral space for dialogue and collaboration</h3>
                  <p>"We're open to all. We believe this is the best way to help consumers make informed decisions when buying products and services."</p>
                  <h5>Ben Martin Director of Privacy</h5>
                </div>
              </div>
              <div className="col-md-6">
                <div className="hw_image_area">
                  <img src={hwboximg} alt={hwboximg} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </Suspense>
    </div>
  );
};

export default HowItsWork;
