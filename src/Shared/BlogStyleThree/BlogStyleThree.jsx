import React from "react";
import "./BlogStyleThree.scss";
import { ReactSVG } from "react-svg";
import detailArrow from "../../assets/detail-arrow.svg";
import blogImg from "../../assets/BusinessSite/blogimg.png";
import { useBusinessBlogsById } from "../../hooks/useTanstackQuery";
import PlaceholderImg from "../PlaceholderImg/PlaceholderImg";

const BlogStyleThree = ({ additionalClasses = "" }) => {
  const { businessBlogsByIdData } = useBusinessBlogsById();

  return (
    <div className={`bst__wrap ${additionalClasses}`}>
      <div className="single__article__box">
        {businessBlogsByIdData?.related?.slice(0, 3)?.map((items) => (
          <div key={items.id}>
            <div className="arti__img">
              <a href="#">
                {businessBlogsByIdData?.author.image ? (
                  <img src={blogImg} alt={blogImg} />
                ) : (
                  <PlaceholderImg />
                )}
              </a>
            </div>
            <h3>
              <a href="#">{items.title}</a>
            </h3>
            <p>{items?.content}</p>
            <a href="#" className="reviews__btn">
              Read More <ReactSVG src={detailArrow} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogStyleThree;
