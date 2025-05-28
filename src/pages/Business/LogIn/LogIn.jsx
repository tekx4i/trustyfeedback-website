import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { ReactSVG } from "react-svg";
// assets
import { googleIcon, sitelogoBlack, keyIcon, ReviewsSmallBox } from "../../../constants/allSVG";
import { captchaKey, REACT_APP_API_URL } from "../../../constants/constants";
import { apiGet, apiPost } from "../../../services/userAuth";
import Spinner from "../../../Shared/Loader/Spinner";
import { setStorage } from "../../../services/storage";
import "./LogIn.scss";
import { FiEye, FiEyeOff } from "react-icons/fi";
import VerifyOTP from "../../VerifyOTP/VerifyOTP";
import logo from "../../../assets/logo_0.svg";
import useSEO from "../../../helper/SEOHelper";
import SEO from "../../../Shared/SEO/SEO";
import ReCAPTCHA from "react-google-recaptcha";

const LogIn = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [showPass, setShowPass] = useState();
  const [idx, setIdx] = useState();
  const [captchaValue, setCaptchaValue] = useState();
  const { data } = useSEO(`${REACT_APP_API_URL}page/single/?url=business-login`);

  // Check if user has previously selected "Remember me"
  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    const savedPassword = localStorage.getItem("password");
    const savedRememberMe = localStorage.getItem("rememberMe");

    if (savedEmail && savedPassword && savedRememberMe === "true") {
      setRememberMe(true);
      // Pre-fill the form with saved credentials
      setValue("email", savedEmail);
      setValue("password", savedPassword);
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue, // to prefill the form values
  } = useForm();

  const onSubmit = async (data) => {
    if (!captchaValue) {
      return alert("CAPTCHA verification is required.");
    }
    try {
      setIsLoading(true);
      const url = `${REACT_APP_API_URL}auth/login`;
      const params = { email: data.email, password: data.password, role_id: 3 };
      const response = await apiPost(url, params);

      if (response.success) {
        const storage = rememberMe ? localStorage : sessionStorage;

        // Save token and user info
        localStorage.setItem("token", response.payload.accessToken);
        setStorage("userInfo", response.payload.user, storage);

        // Save email and password
        storage.setItem("email", data.email);
        storage.setItem("password", data.password);

        // Save rememberMe status
        localStorage.setItem("rememberMe", rememberMe.toString());

        navigate("/dashboard/business-home");
      } else {
        setIsLoading(false);
        setIdx(response.payload.id);
        if (response.status === 400 && response.success === false) {
          document.getElementById("OTP").click();
        }
      }
    } catch {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRememberMe = (e) => {
    setRememberMe(e.target.checked);
  };

  const closeModal = () => {
    document.getElementById("dimiss_lay").click();
  };

  const getReviews = async () => {
    setLoading(true);
    try {
      const URL = `${REACT_APP_API_URL}review`;
      const response = await apiGet(URL, { limit: 2 });
      if (response.success) {
        setReviews(response.data.payload.records || []);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getReviews();
  }, []);

  const onChange = (value) => {
    setCaptchaValue(value);
  };

  return (
    <div id="log_in">
      <SEO title={data?.meta_title || "TrustyFeedback"} description={data?.meta_description} keywords="TrustyFeedback" />
      <div className="bg__animation__wrap ">
        <div className="bg_circle_one"></div>
        <div className="bg_circle_two"></div>
        <div className="bg_circle_three"></div>
        <div className="bg_circle_four"></div>
      </div>
      <section className="log__in__page">
        <div className="container position-relative">
          <div className="banner__review__boxs">
            {reviews?.length !== 0 && <ReviewsSmallBox loading={loading} data={reviews[0]} />}
            {reviews?.length !== 1 && <ReviewsSmallBox loading={loading} data={reviews[1]} />}
          </div>
          <div className="login_form_wrapper">
            <div className="login__form__area">
              <div className="login__head text-center">
                <a href="#" className="logo_img">
                  <ReactSVG src={logo} />
                </a>
                <h1>Log in to TrustyFeedback Business</h1>
                <p>To stay connected with us, please log in using your personal details.</p>
              </div>
              <div className="login__form sign__up__form">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="single__field">
                    <label htmlFor="">Email</label>
                    <input className={errors.email && "border-danger"} {...register("email", { required: "Email is required!" })} type="email" placeholder="Email..." />
                    {errors.email && <span className="error">{errors.email.message}</span>}
                  </div>
                  <div className="single__field">
                    <label htmlFor="">Password</label>
                    <div className="input__icon">
                      <input className={errors.password && "border-danger"} type={!showPass ? "password" : "text"} {...register("password", { required: "Password is required!" })} placeholder="******************" />
                      <div className="password__show" onClick={() => setShowPass(!showPass)}>
                        {showPass ? <FiEyeOff /> : <FiEye />}
                      </div>
                    </div>
                    {errors.password && <span className="error">{errors.password.message}</span>}
                  </div>
                  <div className="d-flex justify-content-center mb-3">
                    <ReCAPTCHA sitekey={captchaKey} onChange={onChange} />,
                  </div>
                  <div className="single__field d-flex justify-content-between">
                    <div className="checkbox__field m-0">
                      <input type="checkbox" id="rememberMe" checked={rememberMe} onChange={handleRememberMe} />
                      <label htmlFor="rememberMe">Remember me</label>
                    </div>
                    <Link to="/forget-password" className="forgot__pas">
                      Forgot Password?
                    </Link>
                  </div>
                  <div className="single__field">
                    <button type="submit" className="default__btn w-100">
                      <span>{isLoading ? <Spinner /> : "Login"}</span>
                    </button>
                  </div>
                </form>
                <div className="overlap__text">
                  <span className="ov__b"> </span> <span className="ovtext">Or continue with</span> <span className="ov__b"></span>
                </div>
                <div className="text-center stype__wrap">
                  <a href="#" className="singup__type">
                    <span>
                      <ReactSVG src={googleIcon} />
                    </span>{" "}
                    Log In With Google
                  </a>
                  <a href="#" className="singup__type">
                    <span>
                      <ReactSVG src={keyIcon} />
                    </span>{" "}
                    Signup with Google
                  </a>
                </div>
                <div className="have__another__account text-center">
                  Don’t have an account yet? <Link to="/business/sign-up">Log In With SSO</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
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
    </div>
  );
};

export default LogIn;
