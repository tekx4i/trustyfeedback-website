import React, { lazy, Suspense, useState, useEffect } from "react";
import { format } from "date-fns";
import { ReactSVG } from "react-svg";
import "./StoriesDetail.scss";
import userImg from "../../../../assets/robert.png";
import fb from "../../../../assets/fb.svg";
import linkedin from "../../../../assets/linkedin.svg";
import blogmain from "../../../../assets/BusinessSite/blogmain.png";
import seacrh from "../../../../assets/BusinessSite/search.svg";
import arrowRight from "../../../../assets/BusinessSite/arrow-right.svg";
import Loader from "../../../../Shared/Loader/Loader";
import { IMG_URL, REACT_APP_API_URL } from "../../../../constants/constants";
import { apiGet } from "../../../../services/userAuth";
import { useNavigate, useParams } from "react-router-dom";
import PlaceholderImg from "../../../../Shared/PlaceholderImg/PlaceholderImg";
const BreadCrumb = lazy(() => import("../../../../Shared/BreadCrumb/BreadCrumb"));
const BlogStyleThree = lazy(() => import("../../../../Shared/BlogStyleThree/BlogStyleThree"));
const FooterReuestDemoCta = lazy(() => import("../../../../Shared/FooterReuestDemoCta/FooterReuestDemoCta"));

const BlogDetail = () => {
  const navigate = useNavigate();
  const { id, title } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const getOne = async () => {
    if (!id) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const URL = `${REACT_APP_API_URL}story/${id}`;
      const response = await apiGet(URL, {});
      if (response.success) {
        setData(response.data.payload);

        const slug = generateSlug(response.data.payload.title);
        if (!title || title !== slug) {
          navigate(`/business/stories/stories-detail/${id}/${slug}`, {
            replace: true,
          });
        }
      } else {
        setData(null);
      }
    } catch (error) {
      console.error("Error fetching blog details:", error);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOne();
  }, [id]);

  return (
    <div className="single___b__wrap">
      <Suspense fallback={<Loader />}>
        <section className="business__detail__page position-relative fill__sec">
          <div className="container">
            <div className="row">
              <div className="col-md-9">
                <div className="bd__top__bread banner__breadcrumb d-flex justify-content-between clr__white align-items-center">
                  <BreadCrumb active={data?.title} />
                  <div className="share__post">
                    Share:{" "}
                    <a href="#">
                      <ReactSVG src={fb} />{" "}
                    </a>{" "}
                    <a href="#">
                      <ReactSVG src={linkedin} />{" "}
                    </a>
                  </div>
                </div>
                <h1 className="clr__white">{data?.title}</h1>
                <div className="blog__metas d-flex align-items-center justify-content-between clr__white">
                  {data?.author?.name || data?.author.image ? (
                    <div className="singel__meta d-flex align-items-center">
                      <div className="author__avatar">{data?.author?.image ? <img src={IMG_URL + data?.author?.image} alt="Author" className="user-img" /> : <PlaceholderImg />}</div>
                      <p className="mb-0">
                        Article by: <a href="#">{data?.author?.name}</a>
                      </p>
                    </div>
                  ) : (
                    ""
                  )}
                  {data && data?.createdAt && (
                    <div className="singel__meta">
                      <p className="mb-0">
                        Published: <a href="#">{format(new Date(data?.createdAt), "MMM dd, yyyy")}</a>
                      </p>
                    </div>
                  )}
                </div>
                <div className="blog__main__img">{data?.imageUrl ? <img src={IMG_URL + data?.imageUrl} alt="" /> : <PlaceholderImg />}</div>
                <div className="blog__detail__content">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: data?.content,
                    }}
                  />
                  {/* <ul>
                    <li>
                      <strong>Why</strong> reviews are so important on Google
                    </li>
                    <li>
                      <strong>What</strong> businesses need to generate a Store Rating and review insights
                    </li>
                    <li>
                      <strong>How</strong> a business like yours might be able to drive significantly more qualified traffic to your site on Google
                    </li>
                  </ul>
                  <img src={blogmain} alt="Main blog content image" />
                  <div className="link__box">
                    <a href="#">Not sure if you already have a Store Rating? Click here to quickly find your store rating status.</a>
                    <a href="#">If you don’t, click here to start collecting automated Trustpilot reviews that qualify for store ratings.</a>
                  </div> */}
                  {/* <p>
                    How can my business qualify for store ratings? For ratings to appear in a particular country, your business needs enough unique reviews for the country within the last 24 months to allow Google to confidently calculate a store rating score. The number of reviews needed can vary
                    by merchant, but according to Google, “most merchants are able to obtain a rating after collecting 100 or more eligible reviews.”
                  </p>
                  <blockquote>
                    <p>The number of reviews needed can vary from business to business, but most merchants are able to obtain a rating after collecting 100 or more eligible reviews.</p>
                    <cite>- Google</cite>
                  </blockquote>
                  <p>It’s worth noting that Google generally requires these reviews to be post-fulfillment reviews. Additionally, both of the following criteria must also be met:</p>
                  <h3>Why might a business that meets the requirements for store ratings not see them?</h3>
                  <ul>
                    <li>
                      The Product Ratings program allows you to display aggregated reviews for your products to customers shopping on Google.
                      <a href="#">This article on Google</a> will help you understand the benefits of participation. Product Ratings are shown in ads and free product listings, appearing as 1 to 5-star ratings that also display the total number of reviews for the product. These ratings and reviews
                      help with product research and purchase decisions. Google reports that “this can drive more qualified customers to your product pages.”
                    </li>
                    <li>
                      The Top Quality Store program recognizes merchants who consistently go above and beyond to provide their customers an exceptional shopping experience.
                      <a href="#">This article on Google</a> will help you understand the benefits of the Top Quality Store badge and how to earn it. Earning the badge also benefits from a merchant collecting reviews that qualify for Store Ratings.
                    </li>
                  </ul> */}
                </div>
                {data?.author && (
                  <div className="author__box">
                    <h5>Author</h5>
                    <div className="author__meta d-flex align-items-center">
                      <div className="author__img">{data?.author?.image ? <img src={IMG_URL + data?.author?.image} alt={`${data?.author?.image} - Author`} className="user-img" /> : <PlaceholderImg />}</div>
                      <div className="author__ri">
                        <h5 className="mb-0">{data?.author?.name}</h5>
                      </div>
                    </div>
                    <p>
                      Joe Russell is a personal finance journalist with more than a decade of experience covering credit, debt, budgeting, banking, investing, retirement, and more. His work has been featured in the New York Times, Wall Street Journal, Yahoo, Forbes, CNET, and other major
                      publications.
                    </p>
                  </div>
                )}
              </div>
              <div className="col-md-3">
                <div className="b__single__sidebar">
                  <div className="blog__search position-relative">
                    <input type="seach" placeholder="Search..." />
                    <button type="button">
                      <ReactSVG src={seacrh} />
                    </button>
                  </div>
                  <div className="categories__box">
                    <h4>Categories</h4>
                    <ul>
                      <li>
                        <a href="#">
                          Get Seen in Search <ReactSVG src={arrowRight} />{" "}
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          Build a Trusted Brand <ReactSVG src={arrowRight} />{" "}
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          Turn Browsers Into Buyers <ReactSVG src={arrowRight} />{" "}
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          Learn From Your Customers <ReactSVG src={arrowRight} />{" "}
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="related__blogs sec__padding">
          <div className="container">
            <h2 className="big_margin">Related Stories</h2>
            <div className="row">
              {[1, 2, 3].map(() => (
                <BlogStyleThree additionalClasses="col-lg-4 col-md-6 col-sm-6" />
              ))}
            </div>
          </div>
        </section>
        <FooterReuestDemoCta />
      </Suspense>
    </div>
  );
};

export default BlogDetail;
