import React from "react";
import "./SectionBlogBox.scss";
import { ReactSVG } from "react-svg";
import detailArrow from "../../assets/detail-arrow.svg";
import blogImg from "../../assets/BusinessSite/blogimg.png";
import { useBusinessBlogs } from "../../hooks/useTanstackQuery";
import NoDataFound from "../NoDataFound/NoDataFound";

const SectionBlogBox = () => {
  const { businessBlogsData, businessBlogsDataLoading } = useBusinessBlogs();

  return (
    <section className="business__articels">
      <div className="container">
        <h2 className="big_margin text-center">Get inspired by our articles</h2>
        <div className="all__articles">
          <div className="row">
            {businessBlogsDataLoading ? (
              <p>Loading...</p>
            ) : businessBlogsData && businessBlogsData.length > 0 ? (
              businessBlogsData.slice(0, 3).map((item) => (
                <div key={item?.id} className="col-lg-4 col-md-6">
                  <div className="single__article__box">
                    <div className="arti__img">
                      <a href="#">
                        <img src={item?.imageUrl || blogImg} alt={item?.title || "Blog Image"} />
                      </a>
                    </div>
                    <h3>
                      <a href="#">{item?.title || "Untitled"}</a>
                    </h3>
                    <p>{item?.content || "No content available."}</p>
                    <a href="#" className="reviews__btn">
                      Read More <ReactSVG src={detailArrow} />
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <NoDataFound />
            )}

            {/* <div className="col-lg-4 col-md-6">
              <div className="single__article__box">
                <div className="arti__img">
                  <a href="#">
                    <img src={blogImg} alt={blogImg} />
                  </a>
                </div>
                <h3>
                  <a href="#">Quarterly bug fixes and feature releases</a>
                </h3>
                <p>
                  At Trustpilot we’re committed to continually improving our
                  platform to better serve your needs. As part of our wider
                </p>
                <a href="#" className="reviews__btn">
                  Read More <ReactSVG src={detailArrow} />
                </a>
              </div>
            </div> */}
            {/* <div className="col-lg-4 col-md-6">
              <div className="single__article__box">
                <div className="arti__img">
                  <a href="#">
                    <img src={blogImg} alt={blogImg} />
                  </a>
                </div>
                <h3>
                  <a href="#">Quarterly bug fixes and feature releases</a>
                </h3>
                <p>
                  At Trustpilot we’re committed to continually improving our
                  platform to better serve your needs. As part of our wider
                </p>
                <a href="#" className="reviews__btn">
                  Read More <ReactSVG src={detailArrow} />
                </a>
              </div>
            </div> */}
            {/* <div className="col-lg-4 col-md-6">
              <div className="single__article__box">
                <div className="arti__img">
                  <a href="#">
                    <img src={blogImg} alt={blogImg} />
                  </a>
                </div>
                <h3>
                  <a href="#">Quarterly bug fixes and feature releases</a>
                </h3>
                <p>
                  At Trustpilot we’re committed to continually improving our
                  platform to better serve your needs. As part of our wider
                </p>
                <a href="#" className="reviews__btn">
                  Read More <ReactSVG src={detailArrow} />
                </a>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionBlogBox;
