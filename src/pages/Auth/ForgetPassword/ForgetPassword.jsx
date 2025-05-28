import { useForm } from "react-hook-form";
import { apiPost, apiGet } from "../../../services/userAuth";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import { ReactSVG } from "react-svg";
import { Link } from "react-router-dom";
import { REACT_APP_API_URL } from "../../../constants/constants";
import forgetImg from "../../../assets/forget_password.webp";
import Spinner from "../../../Shared/Loader/Spinner";
import { toast } from "react-toastify";

function ForgetPassword() {
  const [isLoadingForgot, setIsLoadingForgot] = useState(false);
  const [otp, setOtp] = useState(false);
  const [isloadingResetPass, setIsResetPass] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [isloadingCheckFtp, setIsLoadingCheckftp] = useState(false);
  const [errorOpt, setErrorOpt] = useState("");
  const [forgetEmail, setForgetEmail] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [userId, setUserId] = useState();
  const [token, setToken] = useState();
  const [timer, setTimer] = useState(60);
  const [showResend, setShowResend] = useState(false);
  const [newLoading, setNewLoading] = useState();
  const [isLoadingOTP, setIsLoadingOTP] = useState();
  const [userRole, setUserRole] = useState();

  useEffect(() => {
    let interval;
    if (otp && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setShowResend(true);
    }
    return () => clearInterval(interval);
  }, [timer, otp]);

  const navigate = useNavigate();

  const {
    register: registerForgotPass,
    setError,
    reset: resetForgotPass,
    formState: { errors: errorsForgotPass },
    handleSubmit: handleSubmitForGotPass,
  } = useForm({
    shouldFocusError: true,
    keepValues: true,
  });
  const {
    register: registerOtpCheck,
    setError: registerOtpCheckError,
    reset: resetOtpCheck,
    setData: setDataOtp,
    formState: { errors: errorsOtpCheck },
    handleSubmit: handleSubmitOtpCheck,
  } = useForm({
    shouldFocusError: true,
    keepValues: true,
  });
  const {
    register: registerResetPass,
    setError: registerResetPassError,
    reset: resetResetPass,
    watch,
    formState: { errors: errorsResetPass },
    handleSubmit: handleSubmitResetPass,
  } = useForm({
    shouldFocusError: true,
    keepValues: true,
  });

  const password = useRef({});
  password.current = watch("password", "");

  const forgotPasswordSub = (data) => {
    setIsLoadingForgot(true);
    const url = `${REACT_APP_API_URL}auth/forgot`;
    const params = { email: data.forgotemail };
    apiPost(url, params)
      .then((response) => {
        setIsLoadingForgot(false);
        if (response.success === true) {
          setForgetEmail(data.forgotemail);
          setUserId(response.payload.id);
          setUserRole(response.payload.role_id);
          setTimer(60);
          setShowResend(false);
          setTimeout(() => {
            setOtp(true);
          }, 1500);
        } else if (response.success === 409) {
          setError("forgotemail", { type: "manual", message: "The selected email is invalid." });
        }
      })
      .catch(() => {
        setIsLoadingForgot(false);
      });
  };
  const optValidate = () => {
    setIsLoadingCheckftp(true);
    let url = `${REACT_APP_API_URL}auth/verify/${userId}`;
    const params = {
      email: forgetEmail,
      otp: otpValue,
    };
    apiPost(url, params)
      .then((response) => {
        setIsLoadingCheckftp(false);
        if (response.success === true) {
          setToken(response?.payload?.resetToken);
          setTimeout(() => {
            setShowPass(true);
          }, 1500);
        } else if (response.success === 404) {
          setErrorOpt(response.data.message);
        } else {
        }
      })
      .catch((error) => {});
  };
  const passWordReset = (data) => {
    setIsResetPass(true);
    let url = `${REACT_APP_API_URL}auth/reset/${userId}`;
    const params = {
      password: data.confirm_password,
    };
    apiPost(url, params, token)
      .then((response) => {
        setIsResetPass(false);
        if (response.success === true) {
          setTimeout(() => {
            navigate(userRole === 3 ? "/business/log-in" : userRole === 2 ? "/auth/login" : "");
          }, 1500);
        } else if (response.success === 404) {
          registerResetPassError("confirm_password", { type: "manual", message: response.data.message });
        } else {
        }
      })
      .catch((error) => {});
  };

  const handleResendOTP = async () => {
    setNewLoading(true);
    try {
      const url = `${REACT_APP_API_URL}auth/resendOTP/${userId}`;
      const response = await apiGet(url, { type: "reset" });
      if (response.success === true) {
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
    <div className="my-5 h-100  container formbox atrade d-flex align-items-center justify-content-center gap-2  bg-lightGray">
      <div className="row rounded-5 border">
        <div className="col-sm-5 align-self-center ">
          <div className="d-flex justify-content-center m-auto">
            <img style={{ width: "300px", height: "300px", objectFit: "contain" }} src={forgetImg} />
          </div>
        </div>
        <div className="col-sm-7 border-start d-flex flex-column justify-content-center p-5 bg-light" style={{ borderTopRightRadius: "2rem", borderBottomRightRadius: "2rem" }}>
          {showPass ? (
            <div>
              <form onSubmit={handleSubmitResetPass(passWordReset)}>
                <div className="fortydays-trails fallback-font">
                  <div className="" style={{ borderRadius: "20px", lineHeight: "1", margin: "0", border: "1px solid #fff" }}>
                    <div className="single-field-login mb-1" style={{ textAlign: "left", fontSize: "15px" }}>
                      <h3 className="my-4 pt-4">Reset your password</h3>
                      <label htmlFor="password">
                        Password <span className="text-danger">*</span>
                      </label>
                      <input
                        style={{ fontSize: "12px" }}
                        className="p-4 mt-2"
                        type="password"
                        placeholder="New password*"
                        {...registerResetPass("password", {
                          minLength: {
                            value: 8,
                            message: "Password must have at least 8 characters",
                          },
                          required: "This field is required!",
                        })}
                      />
                      <p className="text-danger fs-7 p-1">{errorsResetPass.password?.message}</p>
                    </div>
                    <div className="single-field-login mb-1" style={{ textAlign: "left", fontSize: "15px" }}>
                      <label htmlFor="c-password">
                        Confirm Password <span className="text-danger">*</span>
                      </label>
                      <input
                        style={{ fontSize: "12px" }}
                        className="p-4 mt-2"
                        type="password"
                        placeholder="Confirm password*"
                        {...registerResetPass("confirm_password", {
                          validate: (val) => {
                            if (val !== password.current) {
                              return "The passwords do not match";
                            }
                          },
                        })}
                      />
                      {errorsResetPass.confirm_password && <p className="text-danger fs-7 p-1">{errorsResetPass.confirm_password.message}</p>}
                    </div>
                    <button className={`bg-primary btn p-3 rounded-pill text-white fw-bold w-100 mt-4 ${isloadingResetPass ? "disable-btn" : ""}`} type="submit">
                      {isloadingResetPass ? (
                        <span>
                          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                          &nbsp;
                        </span>
                      ) : (
                        "Update"
                      )}
                    </button>
                  </div>

                  {/* /.message-box */}
                </div>
              </form>
            </div>
          ) : (
            <>
              {" "}
              {otp === true ? (
                <div>
                  <form onSubmit={handleSubmitOtpCheck(optValidate)}>
                    <div className="">
                      <div className="fallback-font p-lg-4 p-0 " style={{ borderRadius: "20px", lineHeight: "1", margin: "0", border: "1px solid #fff" }}>
                        <div className="logo-hand" style={{ lineHeight: "0.7", textAlign: "center", margin: "0 0 8px", display: "block" }}>
                          {/* <ReactSVG src={OtpSend} /> */}
                        </div>
                        {/* /.logo-hand */}
                        <h3 className="text-center py-2 fallback-font">Please check your email</h3>
                        <div className="fallback-font content-a" style={{ textAlign: "center", color: "#373737", fontSize: "12px", fontWeight: "400", lineHeight: "1.4", fontFamily: "'Inter', Arial, sans-serif", margin: "0 0 px" }}>
                          We've just sent a password reset email to your inbox.
                        </div>
                        <OtpInput
                          value={otpValue}
                          onChange={(e) => {
                            setOtpValue(e);
                            setErrorOpt("");
                          }}
                          numInputs={4}
                          containerStyle={{
                            alignItems: "center",
                            marginTop: "18px",
                            justifyContent: "space-between",
                          }}
                          inputStyle={{
                            padding: "13px",
                            borderRadius: "10px",
                            borderColor: "rgba(0, 0, 0, 0.2)",
                            width: "3rem",
                            height: "3rem",
                          }}
                          renderInput={(props) => <input {...props} />}
                        />
                        <p className="text-danger fs-7 p-1">{errorOpt}</p>
                        <button className={`bg-primary btn p-3 rounded-pill text-white fw-bold w-100 mt-4 ${isloadingCheckFtp ? "disable-btn" : ""}`} disabled={isloadingCheckFtp} type="submit">
                          {isloadingCheckFtp ? (
                            <span>
                              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                              &nbsp;
                            </span>
                          ) : (
                            "Submit"
                          )}
                        </button>
                      </div>

                      <div className="d-flex justify-content-center">
                        <button
                          onClick={handleResendOTP}
                          type="button"
                          className="btn text-primary p-0 border-bottom border-primary rounded-0"
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
                      {!showResend && <div className="mt-4">Time remaining for resend OTP : {timer}</div>}

                      {/* /.message-box */}
                    </div>
                  </form>
                </div>
              ) : (
                <div>
                  <h3 className="fw-bold pb-1 ">Forget Password?</h3>

                  <div>
                    <p>Enter your registered login email below to get your unique link to reset the password</p>
                  </div>
                  <form onSubmit={handleSubmitForGotPass(forgotPasswordSub)}>
                    <div className="mt-4">
                      <div className="pt-4">
                        <div className="form-group mb-3 px-1">
                          <label htmlFor="email" className="form-label">
                            Email Address
                          </label>
                          <input className="p-4" style={{ fontSize: "12px" }} name="forgotemail" placeholder="Enter your email address" type="email" {...registerForgotPass("forgotemail", { required: "This field is required!" })} autoComplete="off" />
                          <p className="text-danger fs-7 p-1">{errorsForgotPass.forgotemail?.message}</p>
                        </div>
                      </div>
                    </div>
                    <button className={`bg-primary btn p-3 rounded-pill text-white fw-bold w-100 ${isLoadingForgot ? "disable-btn" : ""}`} type="submit" disabled={isLoadingForgot}>
                      {isLoadingForgot ? (
                        <span>
                          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> &nbsp; Sending code...
                        </span>
                      ) : (
                        "Submit"
                      )}
                    </button>
                  </form>
                  <div className="text-center pt-5">
                    Already have an account?{" "}
                    <Link className="text-primary border-bottom border-primary" to="/auth/login">
                      Login
                    </Link>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
