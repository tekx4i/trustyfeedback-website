import React, { useState } from "react";
import { ReactSVG } from "react-svg";
import verifiedIcon from "../../assets/approved-icon.svg";
import detailArrow from "../../assets/detail-arrow.svg";
import "./CompanyReviewBox.scss";
import { IMG_URL, REACT_APP_API_URL } from "../../constants/constants";
import PlaceholderImg from "../PlaceholderImg/PlaceholderImg";
import { Link } from "react-router-dom";
import RatingStar from "../../assets/RatingStar_0.svg";
import { apiDeleteNew, apiPost } from "../../services/userAuth";
import { getStorage } from "../../services/storage";
import Bookmark from "../../assets/bookmark.svg";
import BookmarkActive from "../../assets/archive.svg";
import { useNavigate, useSearchParams } from "react-router-dom";
import Spinner from "../Loader/Spinner";
import NoDataFound from "../NoDataFound/NoDataFound";

const CompanyReviewBox = ({ data, key, bgColor, onlySaved, bookmarkNot }) => {
  const navigate = useNavigate();
  const [favLoading, setFavLoading] = useState({
    loading: false,
    id: 0,
  });
  const [liked, setLiked] = useState({});
  const token = getStorage("token");

  const [currentData, setCurrentData] = useState(data);
  const [isVisible, setIsVisible] = useState(true);

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
        setIsVisible(false);
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

  if (!isVisible) return <div className="d-flex justify-content-center w-100 "></div>;

  return (
    <div className="slide__wrap d-flex my-2" key={key && key}>
      <div className={`company__review__box ${bgColor}`}>
        <Link to={onlySaved === true ? `/dashboard/company-details/${data?.id}` : `/listing/listing-detail/${data?.id}`} className="company__r__icon" style={{ backgroundColor: "#EAF0F8" }}>
          {/* <ReactSVG src={companyLogo} /> */}
          {data && data.image ? <img src={IMG_URL + data.image} /> : <PlaceholderImg />}
        </Link>
        <Link className="d-block" to={onlySaved === true ? `/dashboard/company-details/${data?.id}` : `/listing/listing-detail/${data?.id}`}>
          <h4 className="d-flex">
            {data && data.name ? data.name : "-"} {data?.verified_status === "ACTIVE" && <ReactSVG src={verifiedIcon} />}
          </h4>
        </Link>
        <Link to={data?.website || "#"} rel="noopener noreferrer" target="_blank" className="company__url">
          {data && data.website ? data.website : "-"}
        </Link>
        <div className="company__reviews__count d-flex align-items-center">
          {data?.rating ? (
            <div className="d-flex">
              {Array.from({ length: data?.rating || 0 }).map((_, index) => (
                <div key={index}>
                  <ReactSVG src={RatingStar} />
                </div>
              ))}
            </div>
          ) : (
            <small>No reviews yet.</small>
          )}
          <span>
            {data?.rating ? parseFloat(data.rating.toFixed(1)) : "0.0"}/5.0<span> ({data?._count?.reviews})</span>
          </span>
        </div>
        <div className="d-flex justify-content-between">
          <Link to={onlySaved === true ? `/dashboard/company-details/${data?.id}` : `/listing/listing-detail/${data?.id}`} className="view__detail">
            View Details <ReactSVG src={detailArrow} />
          </Link>
          {onlySaved ? (
            <>
              {(currentData && currentData?.favorites && currentData?.favorites[0]?.business_id === currentData?.id) || liked[currentData?.id] ? (
                <div onClick={() => favrouiteDelete(currentData?.id)}>
                  {favLoading.loading && favLoading.id === currentData?.id ? (
                    <Spinner />
                  ) : (
                    <div className="d-flex justify-content-end">
                      <ReactSVG src={BookmarkActive} />
                    </div>
                  )}
                </div>
              ) : (
                <>
                  {bookmarkNot && bookmarkNot && (
                    <div onClick={() => favrouite(currentData?.id)}>
                      {favLoading.loading && favLoading.id === currentData?.id ? (
                        <Spinner />
                      ) : (
                        <div className="d-flex justify-content-end">
                          <ReactSVG src={Bookmark} />
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};
export default CompanyReviewBox;
