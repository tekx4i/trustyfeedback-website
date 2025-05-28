import React, { useState } from "react";
import JoditEditor from "jodit-react";
import { useForm } from "react-hook-form";
import { Toaster, toast, resolveValue } from "react-hot-toast";
import SubmitArrow from "../../../../../assets/submit-arrow.svg";
import { MdOutlinePhotoCamera } from "react-icons/md";
import "./WriteReview.scss";
import unknownUser from "../../../../../assets/unknow-user.png";
import RatingStar from "../../../../../assets/Dashboard/RatingStar_01.svg";
import { ReactSVG } from "react-svg";
import { useNavigate } from "react-router-dom";
import { getStorage } from "../../../../../services/storage";
import { REACT_APP_API_URL } from "../../../../../constants/constants";
import { apiPost } from "../../../../../services/userAuth";
import Spinner from "../../../../../Shared/Loader/Spinner";
import VerifyOTP from "../../../../../Shared/VerifyOTP/VerifyOTP";

const WriteReview = ({ getReviews, id, category_id }) => {
  const navigate = useNavigate();
  const token = getStorage("token");
  const [previews, setPreviews] = useState([null, null, null, null]);
  const [rating, setRating] = useState();
  const [isLoading, setIsLoading] = useState();
  const [editorState, setEditorState] = useState("");
  const [hoverRating, setHoverRating] = useState(null);
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
    setIsLoading(true);
    if (token) {
      const formData = new FormData();
      formData.append("comment", editorState);
      formData.append("rating", rating);
      formData.append("business_id", id);
      formData.append("category_id", category_id);

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
          getReviews();
          setEditorState("");
          setRating(0);
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

  return (
    <>
      <div className="write__review__box">
        <div className="d-flex ">
          <div className="write__r__left align-self-center d-flex">
            <div className="user__avatar">
              <img src={unknownUser} className="unknown-user" alt="User" />
            </div>
            <span className="align-self-center">Write a review</span>
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
      <div className={`review-box-or ${!rating ? "d-none" : ""}`}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className="jogit-editor">
              {/* Bind the editorState to the value */}
              <JoditEditor
                value={editorState}
                onChange={(content) => setEditorState(content)} // Update the editorState on content change
              />
            </div>
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
            <button type="submit" className="mt-4 custom-button d-flex align-items-center justify-content-center">
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
                <VerifyOTP getReviews={getReviews} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WriteReview;
