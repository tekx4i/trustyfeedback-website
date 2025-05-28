import React, { useState } from "react";
import "./BasicInfo.scss";
import { ReactSVG } from "react-svg";
import { LuPencil } from "react-icons/lu";
import { CiLink } from "react-icons/ci";
import { IoIosArrowRoundForward } from "react-icons/io";
import RatingStar from "../../../../../assets/Dashboard/RatingStar_0.svg";
import verified from "../../../../../assets/verified.svg";
import { IMG_URL, REACT_APP_API_URL } from "../../../../../constants/constants";
import PlaceholderImg from "../../../../../Shared/PlaceholderImg/PlaceholderImg";
import { Link } from "react-router-dom";
import { apiDeleteNew, apiPost } from "../../../../../services/userAuth.js";
import { getStorage } from "../../../../../services/storage";
import Bookmark from "../../../../../assets/bookmark.svg";
import BookmarkActive from "../../../../../assets/archive.svg";
import { useNavigate, useSearchParams } from "react-router-dom";
import Spinner from "../../../../../Shared/Loader/Spinner.jsx";

const BasicInfo = ({ data, formattedName }) => {
  const navigate = useNavigate();
  const [favLoading, setFavLoading] = useState({
    loading: false,
    id: 0,
  });
  const [liked, setLiked] = useState({});
  const token = getStorage("token");

  const [currentData, setCurrentData] = useState(data);

  // Fetch favourite review data
  const favrouite = async (id) => {
    if (!id) return;
    setFavLoading({
      loading: true,
      id: id,
    });
    const tokenS = token ? token : "";
    if (token) {
      try {
        const URL = `${REACT_APP_API_URL}business/favorite/${id}`;
        const response = await apiPost(URL, {}, tokenS);
        if (response.success) {
          setLiked({
            ...liked,
            [id]: true,
          });
          setCurrentData((prev) => ({
            ...prev,
            favorites: [{ business_id: id }],
          }));
        }
      } catch (error) {
        console.error("Error updating favorite:", error);
      } finally {
        setFavLoading({
          loading: false,
          id: id,
        });
      }
    } else {
      navigate("/auth/login");
    }
  };

  // Fetch favourite review data
  const favrouiteDelete = async (id) => {
    if (!id) return;
    setFavLoading({
      loading: true,
      id: id,
    });
    const tokenS = token ? token : "";
    try {
      const URL = `${REACT_APP_API_URL}business/favorite/${id}`;
      const response = await apiDeleteNew(URL, {}, tokenS);
      if (response.success) {
        setLiked({
          ...liked,
          [id]: false,
        });
        setCurrentData((prev) => ({
          ...prev,
          favorites: [],
        }));
      }
    } catch (error) {
      console.error("Error updating favorite:", error);
    } finally {
      setFavLoading({
        loading: false,
        id: id,
      });
    }
  };

  return (
    <div id="dashboard_layout_cd">
      <div className="basicInfo">
        <div className="row">
          <div className="col-md-8">
            <div className="top__info__wrap d-flex">
              <div className="top__l__left">
                {data?.image ? <img src={IMG_URL + data?.image} /> : <PlaceholderImg />}
                <button className="edit-btn" style={{ opacity: 0.5 }}>
                  <LuPencil />
                </button>
              </div>
              <div className="t__listing__c_d align-self-center">
                <h4 className="text-capitalize mb-1">{formattedName ? formattedName : "-"}</h4>
                <p className="full__d_stars">
                  {data?.rating ? parseFloat(data.rating.toFixed(1)) : "0.0"}/5.0
                  <span>({data?._count?.reviews || 0})</span> &#x2022; {data?.rating <= 1 ? "Poor" : data?.rating <= 2 ? "Bad" : data?.rating <= 3 ? "Average" : data?.rating <= 4 ? "Good" : data?.rating <= 5 ? "Excellent" : ""}
                </p>
                <div className="rating__star">
                  {Array.from({ length: data?.rating || 0 })?.map((_, index) => (
                    <div className="me-1" key={index}>
                      <ReactSVG src={RatingStar} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {data?.website && (
            <div className="col-md-4 align-self-center">
              <div className="website-link">
                <div className="verified d-flex justify-content-center w-100 mb-2">
                  <ReactSVG src={verified} />
                  &nbsp;
                  <small className="align-self-center">Verified Company</small>
                </div>
                <Link className="border-0" to={`${data?.website}`} target="_blank">
                  <div>
                    <small>{data?.website}</small>
                  </div>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BasicInfo;
