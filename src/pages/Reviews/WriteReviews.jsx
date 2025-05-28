import React, { lazy, Suspense, useEffect, useState } from "react";
import JoditEditor from "jodit-react";
import { useForm } from "react-hook-form";
import { ReactSVG } from "react-svg";
import { MdOutlinePhotoCamera } from "react-icons/md";
import "./Reviews.scss";
import dummyImg from "../../assets/Auth/Group 1707478686.png";
import RatingStar from "../../assets/RatingStar_0.svg";
import SubmitArrow from "../../assets/submit-arrow.svg";
import Loader from "../../Shared/Loader/Loader.jsx";
import { apiPost } from "../../services/userAuth.js";
import { REACT_APP_API_URL } from "../../constants/constants.jsx";
import { useNavigate } from "react-router-dom";
import { getStorage } from "../../services/storage.jsx";
import Spinner from "../../Shared/Loader/Spinner.jsx";
import VerifyOTP from "../../Shared/VerifyOTP/VerifyOTP";
import { useGeolocated } from "react-geolocated";
import useSEO from "../../helper/SEOHelper.js";
import SEO from "../../Shared/SEO/SEO.jsx";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
const Breadcrumb = lazy(() => import("../../Shared/BreadCrumb/BreadCrumb.jsx"));
const SearchWithCategory = lazy(() => import("./Search/Search.jsx"));

const WriteReview = () => {
  // GeoLocation
  const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
  });

  const navigate = useNavigate();
  const token = getStorage("token");
  const [previews, setPreviews] = useState([null, null, null, null]);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [editorState, setEditorState] = useState("");
  const [select, setSelect] = useState({ business_id: "", category_id: "" });
  const [idx, setIdx] = useState();
  const [busId, setBusId] = useState();
  const [status, setStatus] = useState();
  const [ip, setIp] = useState();
  const [uniqueInfo, setUniqueInfo] = useState();
  const [reviewTitle, setReviewTitle] = useState("");
  const { data } = useSEO(`${REACT_APP_API_URL}page/single/?url=write-a-review`);

  const [fingerprint, setFingerprint] = useState("");

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
    if (token && select) {
      const formData = new FormData();
      formData.append("title", reviewTitle);
      formData.append("comment", editorState);
      formData.append("rating", rating);
      formData.append("business_id", select?.business_id);
      formData.append("category_id", select?.category_id);
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
        setRating(0);
        setEditorState("");
        setSelect("");
        document.getElementById("OTP").click();
        setBusId(response.payload.record.business_id);
        setStatus(response.payload.record.status);
        setIdx(response.payload.record.id);
      } catch (error) {
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
      setTimeout(() => {
        alert("You are not an authorized user please Login");
        navigate("/auth/login");
      }, 2000);
    }
  };

  const handleBack = () => {
    setSelect({ business_id: "", category_id: "" });
  };

  const closeModal = () => {
    document.getElementById("dimiss_lay").click();
  };

  const isFormValid = () => {
    return rating > 0 && editorState.trim() !== "";
  };

  return (
    <Suspense fallback={<Loader />}>
      <SEO title={data?.meta_title || "TrustyFeedback"} description={data?.meta_description} keywords="TrustyFeedback" />
      <main className="write__review__box write__review__box-auth">
        <div className="container">
          <section className="write_r__head">
            <div className="text-center write_r__wrap mx-auto">
              <div className="d-flex justify-content-center">
                <Breadcrumb active="Write a review" />
              </div>
              <h1>Write a Review on Products & Services</h1>
              <SearchWithCategory select={select} setSelect={setSelect} />
            </div>
          </section>

          {select.business_id && select.category_id ? (
            <section className="write__review__form">
              <div className="row m-0">
                <div className="col-lg-6 p-0">
                  <div className="write__review__banner h-100">
                    <div className="write__review__top text-center clr__white">
                      <p className="mb-0">Can't Wait to Read Your Thoughts!</p>
                      <h3>Select a Company & Contribute Your Feedback Today!</h3>
                    </div>
                    <div className="d-flex justify-content-center">
                      <img src={dummyImg} alt="Dummy" />
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 p-0">
                  <div className="log-form-auth">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div>
                        {/* <div className="jodit-editor-container jogit-editor">
                          <JoditEditor value={editorState} onChange={(content) => setEditorState(content)} />
                        </div> */}
                        <div>
                          <div>
                            <label htmlFor="reviewTitle" className="form-label">
                              Review Title <span className="text-danger">*</span>
                            </label>
                            <input type="text" id="reviewTitle" value={reviewTitle} onChange={(e) => setReviewTitle(e.target.value)} placeholder="Review Title..." />
                          </div>

                          <div className="mb-3">
                            <label>
                              Review Content <span className="text-danger">*</span>
                            </label>
                            <textarea placeholder="Write a review..." id="reviewText" rows="3" value={editorState} onChange={(e) => setEditorState(e.target.value)}></textarea>
                          </div>
                        </div>
                      </div>
                      <div className="rating__star">
                        <label className="mb-0">How do you rate?</label>
                        <div className="d-flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <div className={`star-icon ${star <= (hoverRating || rating) ? "active" : ""} ${star <= hoverRating ? "hover" : ""}`} key={star} onClick={() => setRating(star)} onMouseEnter={() => setHoverRating(star)} onMouseLeave={() => setHoverRating(0)} style={{ cursor: "pointer" }}>
                              <ReactSVG src={RatingStar} />
                            </div>
                          ))}
                        </div>
                      </div>
                      <hr />
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
                        <button type="submit" className={`mt-4 custom-button d-flex align-items-center justify-content-center ${select && isFormValid() ? "" : "disabled"}`} disabled={!isFormValid()}>
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
                </div>
              </div>
            </section>
          ) : (
            <div className="text-center mt-4">{/* <p>Please select a category and business to write a review</p> */}</div>
          )}
        </div>
      </main>
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
                <VerifyOTP review={true} status={status} busId={busId} review_id={idx} onClose={closeModal} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default WriteReview;
