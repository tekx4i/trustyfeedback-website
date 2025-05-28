import React, { lazy, Suspense, useState, useEffect } from "react";
import { ReactSVG } from "react-svg";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useForm, Controller } from "react-hook-form";
import ReactCountryDropdown from "react-country-dropdown";

// Assets
import "../Login/Login.scss";
import { direction, dummyImg } from "../../../constants/allSVG.js";
import Loader from "../../../Shared/Loader/Loader.jsx";
import { captchaKey, REACT_APP_API_URL } from "../../../constants/constants.jsx";
import { apiPost } from "../../../services/userAuth.js";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../../../Shared/Loader/Spinner.jsx";
import VerifyOTP from "./VerifyOTP.jsx";
import CountryPicker from "../../../Shared/CountryPicker/CountryPicker.jsx";
import { FiEye, FiEyeOff } from "react-icons/fi";
import SEO from "../../../Shared/SEO/SEO.jsx";
import useSEO from "../../../helper/SEOHelper.js";
import ReCAPTCHA from "react-google-recaptcha";
const Business = lazy(() => import("../../../Shared/Business/Business.jsx"));

const UserSignup = () => {
  const navigate = useNavigate();
  const [createLoading, setCreateLoading] = useState();
  // const [selectedCountry, setSelectedCountry] = useState("");
  const [userId, setUserId] = useState();
  const [token, setToken] = useState();
  const [showPass, setShowPass] = useState();
  const [showPassC, setShowPassC] = useState();
  const { data } = useSEO(`${REACT_APP_API_URL}page/single/?url=auth/signup`);
  const [captchaValue, setCaptchaValue] = useState();
  // country selection
  const [selectedCountry, setSelectedCountry] = useState("United States");

  const handleChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // if (!captchaValue) {
    //   return alert("CAPTCHA verification is required.");
    // }

    setCreateLoading(true);
    const url = `${REACT_APP_API_URL}auth/register`;
    const params = {
      name: data.name,
      email: data.email,
      password: data.password,
      country: selectedCountry,
      number: data.number,
      role_id: 2,
    };

    try {
      const response = await apiPost(url, params);
      if (response.success === true) {
        setCreateLoading(false);
        setUserId(response.payload.id);
        setTimeout(() => {
          document.getElementById("OTP_AUTH").click();
        }, 500);
        // navigate("/auth/login");
      }
    } catch (error) {
      setCreateLoading(false);
      console.error("Registration failed:", error);
    } finally {
      setCreateLoading(false);
    }
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
              <p>Sign Up Now</p>
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
                        <img src={dummyImg} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-7 px-0">
                  <div className="log__form__auth">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <h4>Sign up below</h4>
                      <div className="form__fields">
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="single__field">
                              <label>
                                Enter Full Name
                                <span className="text-danger">*</span>
                              </label>
                              <input className={errors.name && "border-danger"} placeholder="Enter full name" {...register("name", { required: "Full name is required" })} />
                              {errors.name && <span className="error">{errors.name.message}</span>}
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="single__field">
                              <label>
                                Enter Email Address
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                className={errors.email && "border-danger"}
                                placeholder="Enter email address"
                                {...register("email", {
                                  required: "Email is required",
                                  pattern: {
                                    value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                                    message: "Invalid email address",
                                  },
                                })}
                              />
                              {errors.email && <span className="error">{errors.email.message}</span>}
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="single__field" id="country_picker">
                              <label>
                                Select Country
                                <span className="text-danger">*</span>
                              </label>
                              <CountryPicker selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} handleChange={handleChange} />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="single__field">
                              <label>
                                Enter Phone Number
                                <span className="text-danger">*</span>
                              </label>
                              <Controller
                                name="number"
                                control={control}
                                rules={{ required: "Phone number is required" }}
                                render={({ field }) => (
                                  <PhoneInput
                                    inputProps={{
                                      name: "number",
                                      required: true,
                                    }}
                                    country={"us"}
                                    containerClass={`phone-input-container ${errors.number ? "border-danger-phoneInput" : ""}`}
                                    {...field}
                                  />
                                )}
                              />
                              {errors.number && <span className="error">{errors.number.message}</span>}
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <div className="single__field">
                              <label htmlFor="password">Password</label>
                              <div className="input__icon">
                                <input
                                  className={errors.password && "border-danger"}
                                  type={!showPass ? "password" : "text"}
                                  {...register("password", {
                                    required: "Password is required!",
                                    pattern: {
                                      value: /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[a-zA-Z0-9]).{8,}$/,
                                      message: "Password must be at least 8 characters long, include one uppercase letter, and one special character.",
                                    },
                                  })}
                                  placeholder="Enter your password"
                                />
                                <div className="password__show" onClick={() => setShowPass(!showPass)}>
                                  {showPass ? <FiEyeOff /> : <FiEye />}
                                </div>
                              </div>
                              {errors.password && <span className="error">{errors.password.message}</span>}
                            </div>
                          </div>

                          <div className="col-sm-6">
                            <div className="single__field">
                              <label htmlFor="confirmPassword">Confirm Password</label>
                              <div className="input__icon">
                                <input
                                  className={errors.confirmPassword && "border-danger"}
                                  type={!showPassC ? "password" : "text"}
                                  {...register("confirmPassword", {
                                    required: "Confirm Password is required!",
                                    validate: (value) => value === watch("password") || "Passwords do not match",
                                  })}
                                  placeholder="Confirm your password"
                                />
                                <div className="password__show" onClick={() => setShowPassC(!showPassC)}>
                                  {showPassC ? <FiEyeOff /> : <FiEye />}
                                </div>
                              </div>
                              {errors.confirmPassword && <span className="error">{errors.confirmPassword.message}</span>}
                              {watch("confirmPassword") && watch("confirmPassword") !== watch("password") && <span className="error">Passwords do not match</span>}
                            </div>
                          </div>
                        </div>
                        <div className="d-flex justify-content-center mb-3">{/* <ReCAPTCHA sitekey={captchaKey} onChange={onChange} />, */}</div>
                        <div className="single__field">
                          <button className="default__btn w-100" type="submit">
                            {createLoading ? <Spinner /> : <span>Sign up</span>}
                          </button>
                        </div>
                      </div>
                    </form>
                    <p>
                      Already have account ? <Link to="/auth/login">Log in</Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <button type="button" id="OTP_AUTH" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div id="otp_modal">
        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header d-none">
                <h1 className="modal-title fs-5" id="exampleModalLabel"></h1>
                <button id="dimiss_lay" type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <VerifyOTP id={userId} onClose={closeModal} />
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

export default UserSignup;
