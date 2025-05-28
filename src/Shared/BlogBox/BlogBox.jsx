import React from "react";
import { ReactSVG } from "react-svg";
import { compareAsc, format } from "date-fns";
import detailArrow from "../../assets/detail-arrow.svg";
import Blogimg from "../../assets/Blog/blog-img.png";
import "./BlogBox.scss";
import { Link } from "react-router-dom";
import calendar from "../../assets/calendar.svg";
import { IMG_URL } from "../../constants/constants";
import PlaceholderImg from "../../Shared/PlaceholderImg/PlaceholderImg";

const BlogBox = ({ data, key, bgColor, extraClass = "", stories }) => {
  return (
    <Link key={key} to={data?.type === "blog" ? `/blog/blog-detail/${data?.id}` : data?.type === "business_blog" ? `/business/blogs/blogs-detail/${data?.id}` : `/business/stories/stories-detail/${data?.id}`} className={`blog__box__wrap  ${extraClass} `}>
      <div className={`blog__box__style2 ${bgColor ? bgColor : "bg-lighten"}`}>
        <div className="bbox__img">{stories !== true ? <a href="#">{data && data?.file_url ? <img src={IMG_URL + data?.file_url} alt="Blogimg" /> : <PlaceholderImg />}</a> : <a href="#">{data && data?.imageUrl ? <img src={IMG_URL + data?.imageUrl} alt="Blogimg" /> : <PlaceholderImg />}</a>}</div>
        <div className="bbox__content">
          <div className="bbox__metas">
            {/* <a href="#" className="bbox__smeta">
                Review Matters
              </a> */}
            <a href="#" className="bbox__smeta blog_d">
              <span>
                <ReactSVG src={calendar} />
              </span>
              {data && data?.createdAt && format(new Date(data?.createdAt), "dd MMM yyyy")}
            </a>
          </div>
          <h3>{data?.title}</h3>
          <p
            dangerouslySetInnerHTML={{
              __html: data?.content?.length > 100 ? `${data.content.slice(0, data.content.slice(0, 100).lastIndexOf(" "))}...` : data?.content,
            }}
          ></p>
          <Link to={data?.type === "blog" ? `/blog/blog-detail/${data?.id}` : data?.type === "business_blog" ? `/business/blogs/blogs-detail/${data?.id}` : `/business/stories/stories-detail/${data?.id}`} className="reviews__btn">
            Read Article
            <ReactSVG src={detailArrow} />
          </Link>
        </div>
      </div>
    </Link>
  );
};

export default BlogBox;
