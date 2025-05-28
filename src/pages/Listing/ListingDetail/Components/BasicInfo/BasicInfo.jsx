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
  console.log(data?.rating);
  return (
    <div className="basicInfo">
      <div className="row">
        <div className="col-md-8">
          <div className="top__info__wrap d-flex">
            <div className="top__l__left">{data?.image ? <img src={IMG_URL + data?.image} /> : <PlaceholderImg />}</div>
            <div className="t__listing__c_d">
              <h1 className="text-capitalize">{formattedName ? formattedName : "-"}</h1>
              {data?.rating === 0 ? (
                <p>No Reviews Yet</p>
              ) : (
                <p className="full__d_stars">
                  {data?.rating ? parseFloat(data.rating.toFixed(1)) : "0.0"}/5.0
                  <span>({data?._count?.reviews || 0})</span> &#x2022; {["Poor", "Bad", "Average", "Good", "Excellent"][Math.min(Math.floor(data?.rating), 4)]}
                </p>
              )}

              <div className="rating__star">
                {Array.from({ length: data?.rating || 0 })?.map((_, index) => (
                  <div className="me-1" key={index}>
                    <ReactSVG src={RatingStar} />
                  </div>
                ))}
              </div>
              {data?.verified_status === "ACTIVE" && (
                <div className="verified">
                  <ReactSVG src={verified} />
                  &nbsp;
                  <small className="align-self-center">Verified Company</small>
                </div>
              )}
            </div>
          </div>
        </div>
        {data?.website && (
          <div className="col-md-4 align-self-center">
            <div className="text-end mb-3">
              {(currentData && currentData?.favorites && currentData?.favorites[0]?.business_id === currentData?.id) || liked[currentData?.id] ? (
                <div onClick={() => favrouiteDelete(currentData?.id)}>
                  {/* {favLoading.loading && favLoading.id === currentData?.id ? (
                    <Spinner />
                  ) : ( */}
                  <div className="d-flex justify-content-end" style={{ cursor: "pointer" }}>
                    <ReactSVG src={BookmarkActive} /> &nbsp; <small className="pt-1">Remove Bookmark</small>
                  </div>
                  {/* )} */}
                </div>
              ) : (
                <div onClick={() => favrouite(currentData?.id)}>
                  {/* {favLoading.loading && favLoading.id === currentData?.id ? (
                    <Spinner />
                  ) : ( */}
                  <div className="d-flex justify-content-end" style={{ cursor: "pointer" }}>
                    <ReactSVG src={Bookmark} /> &nbsp; <small className="pt-1">Bookmark</small>
                  </div>
                  {/* )} */}
                </div>
              )}
            </div>
            <div className="website-link">
              <Link to={`${data?.website}`} target="_blank">
                <div>
                  <CiLink size={25} /> <span style={{ wordBreak: "break-all" }}>{data?.website}</span>
                  <p className="mb-0 text-dark">Visit this website</p>
                </div>
                <div className="align-self-center">
                  <IoIosArrowRoundForward size="34" />
                </div>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BasicInfo;
