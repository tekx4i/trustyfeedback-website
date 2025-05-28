import React from "react";
import "./SideContent.scss";
import { ReactSVG } from "react-svg";
import { IoCheckmarkCircle } from "react-icons/io5";
import call from "../../../../../assets/call.svg";
import sms from "../../../../../assets/sms.svg";
import location from "../../../../../assets/location.svg";
import DummyImg from "../../../../../assets/dummy.svg";
import RatingStar from "../../../../../assets/Dashboard/RatingStar_0.svg";
import { IMG_URL } from "../../../../../constants/constants";
import PlaceholderImg from "../../../../../Shared/PlaceholderImg/PlaceholderImg";
import { Link } from "react-router-dom";
import verified from "../../../../../assets/verified.svg";

const SideContent = ({ data }) => {
  return (
    <div className="side__content">
      <div className="contact__card">
        {data?.description && (
          <>
            <h4>About {data?.name}</h4>
            <p>{data?.description}</p>
            <hr className="border-secondary" />
          </>
        )}
        <h4>Contact Info</h4>
        <div className="company__info__sidebar">
          {data?.phone && (
            <div className="company__info__box d-flex">
              <div className="cin__icon">
                <ReactSVG src={call} />
              </div>
              <a style={{ textDecoration: "underline", color: "blue" }} href={`tel:${data?.phone}`}>
                {data?.phone}
              </a>
            </div>
          )}
          {data?.business_email && (
            <div className="company__info__box d-flex">
              <div className="cin__icon">
                <ReactSVG src={sms} />
              </div>
              <a style={{ textDecoration: "underline", color: "blue" }} href={`mailto:${data?.business_email}`}>
                {data?.business_email}
              </a>
            </div>
          )}
          {data?.address && (
            <div className="company__info__box d-flex">
              <div className="cin__icon">
                <ReactSVG src={location} />
              </div>
              <a>{data?.address}</a>
            </div>
          )}
        </div>
      </div>
      {data?.related.length > 0 && (
        <div className="rescently___reviews__card">
          <h5>People who looked at this company also looked at:</h5>
          <div className="all__recent__reviews">
            {data?.related.slice(0, 4)?.map((item, key) => (
              <Link to={`/listing/listing-detail/${item.id}`} key={key} className="re__review__box d-flex align-items-center">
                <div className="rereview__icon">
                  <a href="#">{item.image ? <img src={IMG_URL + item.image} /> : <PlaceholderImg />}</a>
                </div>
                <div className="review__content">
                  <div style={{ display: "flex", gap: 5 }}>
                    <h6>
                      <a href="#">
                        {item.name ? item.name.slice(0, 12) : ""}
                        {item.name.length >= 10 && ".."}
                      </a>
                    </h6>
                    <span>{item.verified_status === "ACTIVE" && <ReactSVG src={verified} />}</span>
                  </div>
                  <div className="d-flex rating__star">
                    {item.rating > 0 && [1, 2, 3, 4, 5].map(() => <ReactSVG src={RatingStar} />)} <small className="align-self-center ms-2 text-secondary mt-1">{item.rating ? parseFloat(item.rating.toFixed(1)) : null}</small>
                  </div>
                  {item?.rating <= 0 ? (
                    <div className="ask__f__reviews">
                      <IoCheckmarkCircle color="#4558f9" size={20} />
                      <a href="#">Asking for reviews</a>
                    </div>
                  ) : null}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SideContent;
