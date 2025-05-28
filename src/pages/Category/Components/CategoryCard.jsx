import React from "react";
import { ReactSVG } from "react-svg";
import { Link } from "react-router-dom";
import { IoArrowForward } from "react-icons/io5";
import "./CategoryCard.scss";
import Icon from "../../../assets/Category/responsive-design.svg";
import Dot from "../../../assets/Category/dot.svg";
import { IMG_URL } from "../../../constants/constants";
import PlaceholderImg from "../../../Shared/PlaceholderImg/PlaceholderImg";
import NoDataFound from "../../../Shared/NoDataFound/NoDataFound";

const CategoryCard = ({ data }) => {
  return (
    <div className="col-lg-4 col-md-6">
      <div className="category__card">
        <div className="categor__card__head">
          {data?.image ? <img src={IMG_URL + data?.image} alt={data?.image} /> : <PlaceholderImg />}
          <Link to={`/listing/${data.id}/${data.name}`}>
            {" "}
            <h4>{data?.name}</h4>
          </Link>
        </div>
        <ul>
          {data && data?.children.length > 0 ? (
            data.children.map((item) => (
              <li key={item.key}>
                <Link to={`/listing/${item.id}/${item?.name}`}>
                  <ReactSVG src={Dot} /> &nbsp;
                  <div className="align-self-center">
                    &nbsp; {item?.name} &nbsp;
                    <IoArrowForward />
                  </div>
                </Link>
              </li>
            ))
          ) : (
            <li>
              <Link>No categories yet.</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default CategoryCard;
