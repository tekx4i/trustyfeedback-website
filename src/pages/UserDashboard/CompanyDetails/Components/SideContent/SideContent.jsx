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
              <a href={`tel:${data?.phone}`}>{data?.phone}</a>
            </div>
          )}
          {data?.email && (
            <div className="company__info__box d-flex">
              <div className="cin__icon">
                <ReactSVG src={sms} />
              </div>
              <a href={`mailto:${data?.email}`}>{data?.email}</a>
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
    </div>
  );
};

export default SideContent;
