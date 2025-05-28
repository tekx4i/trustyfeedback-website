import React, { lazy, Suspense, useState, useEffect } from "react";
import { ReactSVG } from "react-svg";
import "./Blog.scss";
import Loader from "../../Shared/Loader/Loader";
import rightarrow from "../../assets/btn-arrow.svg";
import rightarrow_hover from "../../assets/btn-arrow-hover.svg";
import { REACT_APP_API_URL } from "../../constants/constants";
import { apiGet } from "../../services/userAuth";
import BlogLoader from "../../Shared/Loader/Blog/Blog";
import NoDataFound from "../../Shared/NoDataFound/NoDataFound";
import useSEO from "../../helper/SEOHelper";
import SEO from "../../Shared/SEO/SEO";
const FloatingBlog = lazy(() => import("../../Shared/FloatingBlogs/FloatingBlogs"));
const BuyWithConfidence = lazy(() => import("./Components/BuyWithConfidence/BuyWithConfidence"));
const ReviewsMatterBlog = lazy(() => import("./Components/ReviewsMatterBlog/ReviewsMatterBlog"));
const Breadcrumb = lazy(() => import("../../Shared/BreadCrumb/BreadCrumb"));

const Blog = () => {
  const [isHover, setIsHover] = useState(false);
  const [loading, setLoading] = useState();
  const [data, setData] = useState([]);
  const [blogCat, setBlogcat] = useState([]);
  const [reviewBlogs, setReviewBlogs] = useState([]);
  const [confidenceBlogs, setConfidenceBlogs] = useState([]);
  const { data: SeoData } = useSEO(`${REACT_APP_API_URL}page/single/?url=blog`);

  const getAllBlogs = async () => {
    setLoading(true);
    try {
      const URL = `${REACT_APP_API_URL}blog`;
      const params = {
        limit: 4,
      };
      const response = await apiGet(URL, params);
      if (response.success === true) {
        const dbValues = response.data.payload.records;
        setData(dbValues);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const getBlogCategory = async () => {
    setLoading(true);
    try {
      const URL = `${REACT_APP_API_URL}blog/category`;
      const params = {};
      const response = await apiGet(URL, params);
      if (response.success === true) {
        const dbValues = response.data.payload.records;
        setBlogcat(dbValues);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const getReviewBlogs = async () => {
    try {
      const URL = `${REACT_APP_API_URL}blog`;
      const params = {
        category_id: 1,
      };
      const response = await apiGet(URL, params);
      if (response.success === true) {
        setReviewBlogs(response.data.payload.records);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getConfidenceBlogs = async () => {
    try {
      const URL = `${REACT_APP_API_URL}blog`;
      const params = {
        category_id: 2,
      };
      const response = await apiGet(URL, params);
      if (response.success === true) {
        setConfidenceBlogs(response.data.payload.records);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleHover = () => {
    setIsHover((prev) => !prev);
  };

  useEffect(() => {
    getAllBlogs();
    getBlogCategory();
    getReviewBlogs();
    getConfidenceBlogs();
  }, []);

  function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  return (
    <Suspense fallback={<Loader />}>
      <SEO title={SeoData?.meta_title || "TrustyFeedback"} description={SeoData?.meta_description} keywords="TrustyFeedback" />

      <div className="our__blog__page clearfix">
        <section className="blog__banner__area sec__padding">
          <div className="container">
            <div className="blog_p__head text-center">
              <div className="d-flex justify-content-center">
                <Breadcrumb active={"Blogs"} />
              </div>
              <h1>Fresh Perspectives & Expert Advice</h1>
            </div>
            <div className="trending__blogs__are">
              <div className="trending_b_head">
                <div className="row">
                  <div className="col-md-6">
                    <h2 className="mb-0">Trends in TrustyFeedback</h2>
                  </div>
                  <div className="col-md-6 text-end">
                    <button onClick={() => scrollToSection("review-more")} onMouseEnter={handleHover} onMouseLeave={handleHover} className="default__btn transparent__btn">
                      <span>See More</span>{" "}
                      <span className="btn__icon">
                        <ReactSVG src={isHover ? rightarrow_hover : rightarrow} />
                      </span>{" "}
                    </button>
                  </div>
                </div>
              </div>
              <div className="tt_blog_wrapper">{loading ? <BlogLoader /> : data && data.length > 0 ? data.slice(0, 3).map((item, key) => <FloatingBlog stories={false} data={item} key={key} />) : <NoDataFound />}</div>
            </div>
          </div>
        </section>
      </div>
      <div id="review-more">
        <ReviewsMatterBlog data={reviewBlogs} loading={loading} />
      </div>
      <BuyWithConfidence data={confidenceBlogs} loading={loading} />
    </Suspense>
  );
};

export default Blog;
