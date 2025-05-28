import React, { useState, useEffect } from "react";
import JoditEditor from "jodit-react";
import { useForm } from "react-hook-form";
import { Toaster, toast, resolveValue } from "react-hot-toast";
import SubmitArrow from "../../../../../assets/submit-arrow.svg";
import { MdOutlinePhotoCamera } from "react-icons/md";
import "./WriteReview.scss";
import unknownUser from "../../../../../assets/unknow-user.png";
import RatingStar from "../../../../../assets/Dashboard/RatingStar_01.svg";
import { ReactSVG } from "react-svg";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getStorage } from "../../../../../services/storage";
import { IMG_URL, REACT_APP_API_URL } from "../../../../../constants/constants";
import { apiGet, apiPost } from "../../../../../services/userAuth";
import Spinner from "../../../../../Shared/Loader/Spinner";
import VerifyOTP from "../../../../../Shared/VerifyOTP/VerifyOTP";
import { Placeholder } from "react-bootstrap";
import PlaceholderImg from "../../../../../Shared/PlaceholderImg/PlaceholderImg";
import { useGeolocated } from "react-geolocated";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
const WriteReview = () => {
  // GeoLocation
  const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
  });

  const navigate = useNavigate();
  const { rating: initialRating, category_id, business_id } = useParams();
  const token = getStorage("token");
  const [previews, setPreviews] = useState([null, null, null, null]);
  const [rating, setRating] = useState(Number(initialRating) || 0);
  const [isLoading, setIsLoading] = useState();
  const [editorState, setEditorState] = useState("");
  const [hoverRating, setHoverRating] = useState(null);
  const [idx, setIdx] = useState();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [uniqueInfo, setUniqueInfo] = useState();
  const [ip, setIp] = useState();
  const [fingerprint, setFingerprint] = useState("");
  const [reviewTitle, setReviewTitle] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const loadFingerprint = async () => {
      const fp = await FingerprintJS.load();
      const result = await fp.get();
      setFingerprint(result);
    };
    const getIp = async () => {
      const response = await fetch("https://api64.ipify.org?format=json");
      const data = await response.json();
      setIp(data.ip);
    };

    getIp();
    loadFingerprint();
  }, []);

  useEffect(() => {
    if (fingerprint) {
      setUniqueInfo([
        { key: "visitorId", value: fingerprint?.visitorId },
        { key: "ip", value: ip },
        // { key: "platform", value: fingerprint?.components?.platform?.value },
        { key: "browser", value: fingerprint?.components?.vendor?.value },
        { key: "timezone", value: fingerprint?.components?.timezone?.value },
        { key: "language", value: fingerprint?.components?.languages?.value?.[0] },
      ]);
    }
  }, [fingerprint, ip]);

  const handleFileChange = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedPreviews = [...previews];
        updatedPreviews[index] = reader.result;
        setPreviews(updatedPreviews);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (index) => {
    const updatedPreviews = [...previews];
    updatedPreviews[index] = null;
    setPreviews(updatedPreviews);
  };

  const onSubmit = async (data) => {
    if (!data.reviewTitle && !data.editorState && rating === 0) {
      alert("Please fill in all the required fields");
      return;
    }
    setIsLoading(true);
    if (token) {
      const formData = new FormData();
      formData.append("title", reviewTitle);
      formData.append("comment", editorState);
      formData.append("rating", rating);
      formData.append("business_id", business_id);
      formData.append("category_id", category_id);
      uniqueInfo.forEach((item, index) => {
        formData.append(`info[${index}][key]`, item.key);
        formData.append(`info[${index}][value]`, item.value);
      });
      if (isGeolocationEnabled && isGeolocationAvailable) {
        formData.append("longitude", coords?.longitude ?? null);
        formData.append("latitude", coords?.latitude ?? null);
      }
      previews.forEach((preview, index) => {
        if (preview) {
          const fileInput = document.getElementById(`file-upload-${index}`);
          if (fileInput && fileInput.files[0]) {
            formData.append(`images`, fileInput.files[0]);
          }
        }
      });

      try {
        const url = `${REACT_APP_API_URL}review`;
        const response = await apiPost(url, formData, token);
        if (response.success === false) {
          navigate("/auth/login");
        }
        if (response.success === true) {
          setEditorState("");
          setRating(0);
          setIdx(response.payload.record.id);
          setPreviews([null, null, null, null]);
          document.getElementById("OTP").click();
        }
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
      setTimeout(() => {
        toast.error("You are not an authorized user please Login");
        navigate("/auth/login");
      }, 2000);
    }
  };

  const closeModal = () => {
    document.getElementById("OTP").click();
  };

  const getOne = async () => {
    if (!business_id) {
      setLoading(false);
      return;
    }

    setLoading(true);
    const tokenS = token ? token : "";
    try {
      const URL = `${REACT_APP_API_URL}business/${business_id}`;
      const response = await apiGet(URL, {}, tokenS);
      if (response.success) {
        const reviewData = response.data.payload;
        setData(reviewData);
      } else {
        setData(null);
      }
    } catch (error) {
      console.error("Error fetching review details:", error);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOne();
  }, [business_id]);

  console.log(editorState);
  const isFormValid = () => {
    return editorState.trim() === "" || rating === 0;
  };

  return (
    <div className="m-auto my-4" style={{ maxWidth: "500px" }}>
      <div className="mb-4 business_detailing">
        {data?.business?.image ? <img src={IMG_URL + data?.business?.image} /> : <PlaceholderImg />}
        <div>
          <h6 className="fw-bold mb-0">{data?.name}</h6>
          <Link to={`${data?.website}`}>{data?.website}</Link>
        </div>
      </div>

      {/* ${!rating ? "d-none" : ""} */}
      <div className={`review-box-or `}>
        <div className="write__review__box mb-4 px-0">
          <div className="d-flex">
            <div className="write__r__left alig n-self-center d-flex">
              <div className="user__avatar">
                <img src={unknownUser} className="unknown-user" alt="User" />
              </div>
              <Link className="align-self-center">Write a review</Link>
            </div>
            <div className="rating__star">
              {[1, 2, 3, 4, 5].map((star) => (
                <div key={star} className={`star ${star <= (hoverRating || rating) ? "active" : ""}`} onClick={() => setRating(star)} onMouseEnter={() => setHoverRating(star)} onMouseLeave={() => setHoverRating(null)}>
                  <ReactSVG src={RatingStar} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div>
              <div className="mb-3">
                <label htmlFor="reviewTitle" className="form-label">
                  Review Title <span className="text-danger">*</span>
                </label>
                <input className="rounded-3" type="text" id="reviewTitle" value={reviewTitle} onChange={(e) => setReviewTitle(e.target.value)} placeholder="Review Title..." />
              </div>

              <div className="mb-3">
                <label>
                  Review Content <span className="text-danger">*</span>
                </label>
                <textarea className="rounded-3" placeholder="Write a review..." id="reviewText" rows="3" value={editorState} onChange={(e) => setEditorState(e.target.value)}></textarea>
              </div>
            </div>
            {/* <div className="jogit-editor">
              <JoditEditor value={editorState} onChange={(content) => setEditorState(content)} />
            </div> */}
          </div>
          <div className="mt-4">
            <label>
              Add Photos <span className="text-secondary">(Optional)</span>
            </label>
            <div className="d-flex gap-2 mt-2 file__upload__wrap">
              {[0, 1, 2, 3].map((_, index) => (
                <div className="photo-upload" key={index} style={{ position: "relative" }}>
                  <label htmlFor={`file-upload-${index}`} style={{ cursor: "pointer" }}>
                    {previews[index] ? (
                      <img src={previews[index]} alt="preview" />
                    ) : (
                      <div className="camera-icon">
                        <MdOutlinePhotoCamera color={"#17253f34"} size={24} />
                      </div>
                    )}
                  </label>
                  <input type="file" id={`file-upload-${index}`} className="input-upload" onChange={(e) => handleFileChange(e, index)} />
                  {previews[index] && (
                    <button
                      onClick={() => removeImage(index)}
                      className="close-btn"
                      style={{
                        position: "absolute",
                        top: "5px",
                        right: "5px",
                        background: "#ff4d4d",
                        color: "white",
                        border: "none",
                        borderRadius: "50%",
                        width: "24px",
                        height: "24px",
                        cursor: "pointer",
                      }}
                    >
                      &times;
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button type="submit" className={`mt-4 custom-button d-flex align-items-center justify-content-center ${isFormValid() && "disabled"}`}>
              {isLoading ? (
                <Spinner />
              ) : (
                <>
                  Submit Review <ReactSVG src={SubmitArrow} />
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      <button type="button" id="OTP" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div id="otp_modal">
        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel"></h1>
                <button id="dimiss_lay" type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <VerifyOTP evaluate={true} business_id={business_id} review_id={idx} onClose={closeModal} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriteReview;
