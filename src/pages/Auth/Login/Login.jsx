import React, { lazy, Suspense, useState, useEffect } from "react";
import { ReactSVG } from "react-svg";
import { IoArrowBack } from "react-icons/io5";
import { FaLock } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
// assets
import "./Login.scss";
import Loader from "../../../Shared/Loader/Loader.jsx";
import { dummyImg, mail, facebook, apple, direction, google } from "../../../constants/allSVG.js";
import { captchaKey, REACT_APP_API_URL } from "../../../constants/constants.jsx";
import { apiGet, apiPost } from "../../../services/userAuth.js";
import { getStorage, setStorage } from "../../../services/storage.jsx";
import Spinner from "../../../Shared/Loader/Spinner.jsx";
import { IoMdArrowDropdown } from "react-icons/io";
import { FiEye, FiEyeOff } from "react-icons/fi";
import VerifyOTP from "../../VerifyOTP/VerifyOTP.jsx";
import useSEO from "../../../helper/SEOHelper.js";
import SEO from "../../../Shared/SEO/SEO.jsx";
import ReCAPTCHA from "react-google-recaptcha";

const Business = lazy(() => import("../../../Shared/Business/Business.jsx"));

const Login = () => {
  const navigate = useNavigate();
  const [hide, setHide] = useState(false);
  const [isLoading, setIsLoading] = useState();
  const [emailValue, setEmailValue] = useState("");
  const [showPass, setShowPass] = useState();
  const [idx, setIdx] = useState();
  const [captchaValue, setCaptchaValue] = useState();
  const { data } = useSEO(`${REACT_APP_API_URL}page/single/?url=auth/login`);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // if (!captchaValue) {
    //   return alert("CAPTCHA verification is required.");
    // }
    try {
      setIsLoading(true);
      const url = `${REACT_APP_API_URL}auth/login`;
      const params = { email: data.email, password: data.password, role_id: 2 };
      const response = await apiPost(url, params);

      if (response.success) {
        const storage = localStorage;
        storage.setItem("token", response.payload.accessToken);
        setStorage("userInfo", response.payload.user, storage);
        navigate("/dashboard");
      } else {
        setIdx(response.payload.id);
        if (response.status === 400 && response.success === false) {
          document.getElementById("OTP").click();
        }
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleContinue = (email) => {
    setEmailValue(email);
    setHide(true);
  };

  const closeModal = () => {
    document.getElementById("dimiss_lay").click();
  };
  const onChange = (value) => {
    setCaptchaValue(value);
  };

  return (
    <>
      <main className="login__area login-auth">
        <SEO title={data?.meta_title || "TrustyFeedback"} description={data?.meta_description} keywords="TrustyFeedback" />
        <div className="bg__animation__wrap">
          <div className="bg_circle_one"></div>
          <div className="bg_circle_two"></div>
          <div className="bg_circle_three"></div>
          <div className="bg_circle_four"></div>
        </div>
        <section className="login__page__cons">
          <div className="container">
            <div className="text-center logon__con__head">
              <p>Log In Now</p>
              <h1>Read. Write. Discover.</h1>
            </div>
            <div className="login__form__wrap">
              <div className="row m-0">
                <div className="col-md-5 px-0">
                  <div className="login__banner h-100 d">
                    <h3 className="text-center">Be Part of the Millions Giving Feedback Daily!</h3>
                    <div className="log__left__img__wrap">
                      <ReactSVG src={direction} />
                      <div className="lleft__img text-center">
                        <img src={dummyImg} alt="Dummy" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-7 px-0">
                  <div className="log__form__auth">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <h4>Log in or sign up below</h4>
                      <div className="d-flex justify-content-center login__through__social">
                        <button type="button" className="social-button">
                          <ReactSVG src={google} />
                        </button>
                        <button type="button" className="social-button fb">
                          <ReactSVG src={facebook} />
                        </button>
                        <button type="button" className="social-button apple">
                          <ReactSVG src={apple} />
                        </button>
                      </div>
                      <div className="overlap__text">
                        <span className="ov__b"></span> <span className="ovtext">OR</span> <span className="ov__b"></span>
                      </div>
                      {/* {hide && (
                        <div type="button" onClick={() => setHide(!hide)}>
                          <p className="d-flex">
                            <span className="align-self-center">
                              {" "}
                              <IoArrowBack />
                            </span>{" "}
                            &nbsp;
                            <span className="align-self-center">Back</span>
                          </p>
                        </div>
                      )} */}
                      <div className="form__fields">
                        {!hide && (
                          <>
                            <div className="single__field">
                              <label>
                                Enter Email Address
                                <span className="text-danger">*</span>
                              </label>
                              <div className="input-w-icon">
                                <div className="icon">
                                  <ReactSVG src={mail} />
                                </div>
                                <input
                                  id="email"
                                  name="email"
                                  type="email"
                                  placeholder="Enter email address"
                                  {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                      value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                      message: "Invalid email address",
                                    },
                                  })}
                                />
                              </div>
                              {errors.email && <p className="text-danger">{errors.email.message}</p>}
                            </div>
                            <div className="single__field">
                              <button type="button" onClick={() => handleContinue(watch("email"))} className="custom__button">
                                Continue with email
                              </button>
                            </div>
                          </>
                        )}
                        {hide && (
                          <>
                            <div className="field_of mb-3">
                              <div className="single__field">
                                <label>
                                  Enter Email Address
                                  <span className="text-danger">*</span>
                                </label>
                                <div className="input-w-icon">
                                  <div className="icon">
                                    <ReactSVG src={mail} />
                                  </div>
                                  <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="Enter email address"
                                    {...register("email", {
                                      required: "Email is required",
                                      pattern: {
                                        value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                        message: "Invalid email address",
                                      },
                                    })}
                                  />
                                </div>
                              </div>
                            </div>
                            {errors.email && <p className="text-danger">{errors.email.message}</p>}
                            <div className="single__field">
                              <label>
                                Enter Password
                                <span className="text-danger">*</span>
                              </label>
                              <div className="input-w-icon">
                                <div className="icon">
                                  <FaLock color="#A2A8B2" />
                                </div>
                                <div className="input__icon w-100">
                                  <input id="password" name="password" type={!showPass ? "password" : "text"} placeholder="Enter password" {...register("password", { required: "Password is required" })} />
                                  <div className="password__show " style={{ right: "-6px" }} onClick={() => setShowPass(!showPass)}>
                                    {showPass ? <FiEyeOff /> : <FiEye />}
                                  </div>
                                </div>
                              </div>
                              {errors.password && <p className="text-danger">{errors.password.message}</p>}
                            </div>
                            <div className="d-flex justify-content-center mb-3">{/* <ReCAPTCHA sitekey={captchaKey} onChange={onChange} />, */}</div>
                          </>
                        )}
                        {hide ? (
                          <div className="single__field">
                            <button type="submit" className="custom__button-ctm">
                              {isLoading ? <Spinner /> : "Login"}
                            </button>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </form>
                    <div className="d-flex justify-content-between mt-3">
                      <p className="mb-0">
                        Don't have an account ?{" "}
                        <Link className="border-bottom border-primary text-primary" to="/auth/signup">
                          Sign up{" "}
                        </Link>
                      </p>
                      <Link className="align-self-center text-danger border-bottom border-danger" to="/forget-password">
                        Forget Password?
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
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
                <VerifyOTP id={idx} onClose={closeModal} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Suspense fallback={<Loader />}>
        <Business />
      </Suspense>
    </>
  );
};

export default Login;
