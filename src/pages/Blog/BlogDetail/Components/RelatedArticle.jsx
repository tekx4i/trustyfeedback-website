import React from "react";
import Slider from "react-slick";
import BlogBox from "../../../../Shared/BlogBox/BlogBox";
import "./RelatedArticle.scss";
import NoDataFound from "../../../../Shared/NoDataFound/NoDataFound";
import { IMG_URL } from "../../../../constants/constants";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import calendar from "../../../../assets/calendar.svg";
import { compareAsc, format } from "date-fns";
import detailArrow from "../../../../assets/detail-arrow.svg";
import PlaceholderImg from "../../../../Shared/PlaceholderImg/PlaceholderImg";

const RelatedArticle = ({ data }) => {
  return (
    <section className="related__articles  position-relative fill__sec">
      <div className="top__insurance__companies">
        <div className="container">
          <h2 className="big_margin text-center">Other Related Articles</h2>

          <div className="row">
            {data?.related ? (
              data?.related.map((data, key) => (
                <Link key={key} to={`/blog/blog-detail/${data?.id}`} className={`blog__box__wrap `}>
                  <div className={`blog__box__style2 bg-white `}>
                    <div className="bbox__img">
                      <a href="#">{data && data?.file_url ? <img src={IMG_URL + data?.file_url} alt="Blogimg" /> : <PlaceholderImg />}</a>
                      {/* {data && data?.imageUrl && <a href="#">{data && data?.imageUrl ? <img src={IMG_URL + data?.imageUrl} alt="Blogimg" /> : <PlaceholderImg />}</a>} */}
                    </div>
                    <div className="bbox__content">
                      <div className="bbox__metas">
                        <a href="#" className="bbox__smeta">
                          Review Matters
                        </a>
                        <a href="#" className="bbox__smeta blog_d">
                          <span>
                            <ReactSVG src={calendar} />
                          </span>
                          {data && data?.createdAt && format(new Date(data?.createdAt), "dd MMM yyyy")}
                        </a>
                      </div>
                      <h3>{data?.title}</h3>
                      <p dangerouslySetInnerHTML={{ __html: data?.content?.length < 50 ? data?.content : `${data?.content?.slice(0, 50)}...` }} />

                      <Link
                        to={`/blog/blog-detail/${data?.id}`}
                        //  to={data?.type === "blog" ? `/blog/blog-detail/${data?.id}` : `/business/stories/stories-detail/${data?.id}`}
                        className="reviews__btn"
                      >
                        Read Article
                        <ReactSVG src={detailArrow} />
                      </Link>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <NoDataFound />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RelatedArticle;
