// File: src/App.js

import React, { useState, useEffect } from "react";
import OtpInput from "react-otp-input";
import "./VerifyOTP.scss";
import otpImg from "../../assets/otp.png";
import { apiPost } from "../../services/userAuth";
import { REACT_APP_API_URL } from "../../constants/constants";
import { Toaster, toast, resolveValue } from "react-hot-toast";
import { getStorage } from "../../services/storage";
import { useNavigate } from "react-router-dom";
import Spinner from "../Loader/Spinner";
import { IoIosCloseCircleOutline } from "react-icons/io";

const VerifyOTP = ({ evaluate, getReviews, setOpen, onClose, review_id, business_id, review, busId, status }) => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoadingOTP, setIsLoadingOTP] = useState();
  const token = getStorage("token");
  const [timer, setTimer] = useState(60);
  const [showResend, setShowResend] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newLoading, setNewLoading] = useState();

  useEffect(() => {
    const handleModalOpen = () => {
      setIsModalOpen(true);
      setTimer(60);
      setShowResend(false);
    };

    const handleModalClose = () => {
      setIsModalOpen(false);
      setTimer(60);
      setShowResend(false);
    };

    const modal = document.getElementById("exampleModal");
    if (modal) {
      modal.addEventListener("shown.bs.modal", handleModalOpen);
      modal.addEventListener("hidden.bs.modal", handleModalClose);

      return () => {
        modal.removeEventListener("shown.bs.modal", handleModalOpen);
        modal.removeEventListener("hidden.bs.modal", handleModalClose);
      };
    }
  }, []);

  useEffect(() => {
    let interval;
    if (isModalOpen && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setShowResend(true);
    }
    return () => clearInterval(interval);
  }, [timer, isModalOpen]);

  const handleChange = (otpValue) => {
    setOtp(otpValue);
    setError("");
  };

  const handleSubmit = async () => {
    if (otp.length !== 4) {
      setError("OTP must be 4 digits");
    } else {
      setSubmitted(true);
      setIsLoadingOTP(true);
      if (token) {
        try {
          const url = `${REACT_APP_API_URL}review/verify`;
          const response = await apiPost(url, { otp }, token);

          if (response.success === false) {
            navigate("/auth/login");
          }
          if (response.success === true) {
            // toast.success("Verify OTP successful!");
            setOpen && setOpen(false);
            onClose && onClose();
            setOtp("");
            review === true && status === "ACTIVE" && navigate(`/listing/listing-detail/${busId}`);
            review === true && status === "PENDING" && navigate(`/reviews/review-detail/${review_id}`);
            evaluate === true && navigate(`/listing/listing-detail/${business_id}`);
            getReviews && getReviews();
          }
        } catch (error) {
          // toast.error("Something went wrong. Please try again.");
        } finally {
          setIsLoadingOTP(false);
        }
      } else {
        setIsLoadingOTP(false);
        toast.error("You are not an authorized user please Login");
        navigate("/auth/login");
      }
    }
  };

  const handleResendOTP = async () => {
    setNewLoading(true);
    try {
      const url = `${REACT_APP_API_URL}review/resendOTP/${review_id}`;
      const response = await apiPost(url, {}, token);
      if (response.success) {
        toast.success("OTP resent successfully!");
        setTimer(60);
        setShowResend(false);
        setNewLoading(false);
      }
    } catch (error) {
      toast.error("Failed to resend OTP");
    } finally {
      setNewLoading(false);
    }
  };

  return (
    <div id="otp__verification" style={{ textAlign: "center" }}>
      <div className="d-flex justify-content-end mb-4">
        <button className="btn text-danger" onClick={() => onClose()}>
          <IoIosCloseCircleOutline size={30} />
        </button>
      </div>
      <img src={otpImg} />
      <h4 className="mt-3 mb-0">OTP Verifications</h4>
      <p>Verify your Review with OTP</p>
      <div>
        <OtpInput number={true} shouldAutoFocus={true} placeholder={"0000"} value={otp} onChange={handleChange} numInputs={4} separator={<span className="">-</span>} renderInput={(props) => <input {...props} style={{ border: "1px solid #ccc", borderRadius: "10px", margin: "10px" }} />} />

        {error && <div style={{ color: "red", marginTop: "10px" }}>{error}</div>}
        {!showResend && <div className="mt-2">Time remaining: {timer}</div>}
      </div>

      <button onClick={() => handleSubmit()} type="button" className="default__btn-blue w-100 mt-3">
        {isLoadingOTP ? <Spinner /> : "Verify OTP"}
      </button>

      <button
        onClick={handleResendOTP}
        type="button"
        className="btn text-primary p-0 mt-3 rounded-0"
        style={{
          borderBottom: "1px solid var(--d-blue)",
          fontSize: "12px",
          opacity: showResend ? 1 : 0.3,
          border: 0,
        }}
        disabled={!showResend || isLoadingOTP}
      >
        {newLoading ? <Spinner /> : "Resend OTP"}
      </button>
    </div>
  );
};

export default VerifyOTP;
