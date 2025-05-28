import React, { lazy, Suspense, useState, useEffect } from "react";
import JoditEditor from "jodit-react";
import { useForm } from "react-hook-form";
import { ReactSVG } from "react-svg";
import { MdOutlinePhotoCamera } from "react-icons/md";
import "../../../Reviews/Reviews.scss";
import dummyImg from "../../../../assets/Auth/Group 1707478686.png";
import RatingStar from "../../../../assets/RatingStar_0.svg";
import SubmitArrow from "../../../../assets/submit-arrow.svg";
import Loader from "../../../../Shared/Loader/Loader.jsx";
import { apiPost } from "../../../../services/userAuth.js";
import { IMG_URL, REACT_APP_API_URL } from "../../../../constants/constants.jsx";
import { useNavigate } from "react-router-dom";
import { getStorage } from "../../../../services/storage.jsx";
import Spinner from "../../../../Shared/Loader/Spinner.jsx";
const Breadcrumb = lazy(() => import("../../../../Shared/BreadCrumb/BreadCrumb.jsx"));
const SearchWithCategory = lazy(() => import("../../../Reviews/Search/Search.jsx"));
import VerifyOTP from "../../../../Shared/VerifyOTP/VerifyOTP";
import { useGeolocated } from "react-geolocated";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

const WriteReview = ({ data, setOpen, getReviews }) => {
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
  const [reviewTitle, setReviewTitle] = useState("");
  const [ip, setIp] = useState();
  const [uniqueInfo, setUniqueInfo] = useState();
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

  const [select, setSelect] = useState({
    business_id: data?.business_id || "",
    category_id: data?.category_id || "",
  });
  console.log(data, "--dd-");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: data?.id,
      comment: data?.comment,
      title: data?.title,
      rating: data?.rating,
      business_id: data?.business_id,
      category_id: data?.category_id,
      images: data?.images || [],
    },
  });

  useEffect(() => {
    if (data) {
      setEditorState(data?.comment || "");
      setReviewTitle(data?.title || "");
      setRating(data?.rating || 0);
      setSelect({
        business_id: data?.business_id || "",
        category_id: data?.category_id || "",
      });
      const initialPreviews = Array(4).fill(null);
      if (data?.images && Array.isArray(data.images)) {
        data?.images.forEach((image, index) => {
          if (index < 4) initialPreviews[index] = image;
        });
      }
      setPreviews(initialPreviews);
    }
  }, [data]);

  const handleFileChange = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedPreviews = [...previews];
        updatedPreviews[index] = {
          file_path: reader.result,
          isNew: true,
          file: file,
        };
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

  const onSubmit = async (formData) => {
    setIsLoading(true);
    if (token && select) {
      const submitFormData = new FormData();
      submitFormData.append("title", reviewTitle);
      submitFormData.append("comment", editorState);
      submitFormData.append("rating", rating);
      submitFormData.append("business_id", select?.business_id);
      submitFormData.append("category_id", select?.category_id);
      uniqueInfo.forEach((item, index) => {
        submitFormData.append(`info[${index}][key]`, item.key);
        submitFormData.append(`info[${index}][value]`, item.value);
      });
      if (isGeolocationEnabled && isGeolocationAvailable) {
        submitFormData.append("longitude", coords?.longitude ?? null);
        submitFormData.append("latitude", coords?.latitude ?? null);
      }
      previews.forEach((preview) => {
        if (preview) {
          if (preview.isNew && preview.file) {
            submitFormData.append("images", preview.file);
          } else if (!preview.isNew && preview.file_path) {
            fetch(IMG_URL + preview.file_path)
              .then((res) => res.blob())
              .then((blob) => {
                const file = new File([blob], preview.file_path.split("/").pop(), { type: blob.type });
                submitFormData.append("images", file);
              });
          }
        }
      });

      try {
        const url = `${REACT_APP_API_URL}review`;
        const response = await apiPost(url, submitFormData, token);
        if (response.success === false) {
          navigate("/auth/login");
        }
        setRating(0);
        setEditorState("");
        setSelect("");
        getReviews();
        document.getElementById("OTP").click();
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

  return (
    <Suspense fallback={<Loader />}>
      <main id="my_reviews_edit" className="write__review__box py-0 write__review__box-auth">
        <div className="container">
          <section className="write__review__form py-0">
            <div className="row m-0">
              <div className="col-lg-12 p-0">
                <div className="log-form-auth border-0 bg-transparent p-0">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                      {/* <div className="jogit-editor">
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
                                <img src={previews[index].isNew ? previews[index].file_path : IMG_URL + previews[index].file_path} alt="preview" />
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
                      <button type="submit" className={`mt-4 custom-button d-flex align-items-center justify-content-center ${select ? "" : "disabled"}`}>
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
        </div>
      </main>
      <button type="button" id="OTP" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModalVerify">
        Launch demo modal
      </button>
      <div id="otp_modal">
        <div className="modal fade" id="exampleModalVerify" tabindex="-1" aria-labelledby="exampleModalVerifyLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalVerifyLabel"></h1>
                <button id="dimiss_lay" type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <VerifyOTP setOpen={setOpen} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default WriteReview;
