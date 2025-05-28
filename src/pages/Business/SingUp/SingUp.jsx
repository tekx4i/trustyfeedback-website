import React, { useState, useEffect, useRef } from "react";
import { ReactSVG } from "react-svg";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
// Assets
import { signlogo, googleIcon } from "../../../constants/allSVG";
import logo from "../../../assets/Dashboard/Logo_0.svg";
import { captchaKey, REACT_APP_API_URL } from "../../../constants/constants";
import { apiGet, apiPost } from "../../../services/userAuth";
import Spinner from "../../../Shared/Loader/Spinner";
import "./SingUp.scss";
import ReactCountryDropdown from "react-country-dropdown";
import VerifyOTP from "./VerifyOTP";
import { FiEye, FiEyeOff } from "react-icons/fi";
import CountryPicker from "../../../Shared/CountryPicker/CountryPicker";
import SEO from "../../../Shared/SEO/SEO";
import useSEO from "../../../helper/SEOHelper";
import ReCAPTCHA from "react-google-recaptcha";

const SingUp = () => {
  const navigate = useNavigate();
  const selectCategoryRef = useRef();
  const [loading, setLoading] = useState();
  const [createLoading, setCreateLoading] = useState();
  const [data, setData] = useState([]);
  const [category, setCategory] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("United States");
  const [userId, setUserId] = useState();
  const [showPass, setShowPass] = useState();
  const [showPassC, setShowPassC] = useState();
  const [captchaValue, setCaptchaValue] = useState();
  const { data: SeoData } = useSEO(`${REACT_APP_API_URL}page/single/?url=business-signup`);

  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm();

  // Business Categories
  const getCategories = async () => {
    setLoading(true);
    try {
      const URL = `${REACT_APP_API_URL}category`;
      const params = {
        is_parent: true,
      };

      const response = await apiGet(URL, params);
      if (response.data.success === true) {
        const dbValues = response.data.payload.records;
        setData(dbValues);
        setCategory(dbValues.map((item) => ({ value: item.id, label: item.name })));
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    setSelectedCountry("United States");
  }, []);

  const onSubmit = async (data) => {
    if (!selectedCountry) {
      return;
    }
    if (!captchaValue) {
      return alert("CAPTCHA verification is required.");
    }

    setCreateLoading(true);
    const selectedCategoryIds = data?.business_categories?.map((category) => category.value);
    const url = `${REACT_APP_API_URL}auth/register`;
    const params = {
      name: data.name,
      email: data.email,
      country: selectedCountry,
      password: data.password,
      business_name: data.business_name,
      business_address: data.business_address,
      business_phone: data.business_phone,
      business_website: data.business_website,
      business_categories: selectedCategoryIds,
      role_id: 3,
    };

    try {
      const response = await apiPost(url, params);
      if (response.success === true) {
        setCreateLoading(false);
        setUserId(response.payload.id);
        setTimeout(() => {
          document.getElementById("OTP_AUTH").click();
        }, 500);
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

  // country selection ==========
  const handleChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const onChange = (value) => {
    setCaptchaValue(value);
  };

  return (
    <div id="sign_up">
      <SEO title={SeoData?.meta_title || "TrustyFeedback"} description={SeoData?.meta_description} keywords="TrustyFeedback" />

      <div className="bg__animation__wrap">
        <div className="bg_circle_one"></div>
        <div className="bg_circle_two"></div>
        <div className="bg_circle_three"></div>
        <div className="bg_circle_four"></div>
      </div>
      <section className="sing__up__page">
        <div className="row">
          <div className="col-md-5">
            <div className="sign__upleft h-100">
              <div className="sleft__wrap">
                <div className="s_site__logo">
                  <a href="#">
                    <ReactSVG src={logo} />
                  </a>
                </div>
                <div className="signip__feature__lists">
                  <div className="sup__f__single__list d-flex">
                    <div className="sfs__count">01</div>
                    <div className="sfc__content clr__white">
                      <h5>Build credibility with reviews</h5>
                      <p className="mb-0">Collect trustworthy reviews on an open, transparent platform millions of consumers use.</p>
                    </div>
                  </div>
                  <div className="sup__f__single__list d-flex">
                    <div className="sfs__count">02</div>
                    <div className="sfc__content clr__white">
                      <h5>Strengthen your reputation</h5>
                      <p className="mb-0">94% of new users that automated review invites increased their TrustScore</p>
                    </div>
                  </div>
                  <div className="sup__f__single__list d-flex">
                    <div className="sfs__count">03</div>
                    <div className="sfc__content clr__white">
                      <h5>Grow performance</h5>
                      <p className="mb-0">Trustpilot stars and content are proven to convert at higher rates than those of competitors</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-7">
            <div className="sing__up__content">
              <h1 className="text-center">Create your Account</h1>
              <div className="text-center stype__wrap">
                <a href="#" className="singup__type">
                  <span>
                    <ReactSVG src={googleIcon} />
                  </span>{" "}
                  Signup with Google
                </a>
              </div>
              <div className="overlap__text">
                <span className="ov__b"> </span> <span className="ovtext">Or Sign Up with Email</span> <span className="ov__b"></span>
              </div>

              <div className="sign__up__form">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="single__field">
                        <label htmlFor="website">Website</label>
                        <input
                          className={errors.business_website && "border-danger"}
                          {...register("business_website", {
                            required: "Website is required!",
                            pattern: {
                              value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
                              message: "Please enter a valid URL (e.g., https://example.com)",
                            },
                          })}
                          placeholder="Enter your website!"
                        />
                        {errors.business_website && <span className="error">{errors.business_website.message}</span>}
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="single__field">
                        <label htmlFor="companyName">Company Name</label>
                        <input className={errors.business_name && "border-danger"} {...register("business_name", { required: "Company Name is required!" })} placeholder="Enter your Company name" />
                        {errors.business_name && <span className="error">{errors.business_name.message}</span>}
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="single__field">
                        <label htmlFor="name">Full Name</label>
                        <input
                          className={errors.name && "border-danger"}
                          {...register("name", {
                            required: "Full Name is required!",
                            pattern: {
                              value: /^[A-Za-z\s]+$/,
                              message: "Full Name can only contain alphabets and spaces!",
                            },
                          })}
                          placeholder="Enter your full name"
                        />
                        {errors.name && <span className="error">{errors.name.message}</span>}
                      </div>
                    </div>

                    <div className="col-sm-6">
                      <div className="single__field">
                        <label htmlFor="email">Email</label>
                        <input
                          className={errors.email && "border-danger"}
                          {...register("email", {
                            required: "Email is required!",
                            pattern: {
                              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                              message: "Enter a valid email address",
                            },
                          })}
                          type="email"
                          placeholder="Enter your email"
                        />
                        {errors.email && <span className="error">{errors.email.message}</span>}
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="single__field">
                        <label htmlFor="country">Country</label>
                        {/* <div id="country-dropdown">
                          <ReactCountryDropdown
                            defaultCountry="US"
                            onSelect={(country) => {
                              setSelectedCountry(country.name);
                            }}
                          />
                        </div> */}
                        <CountryPicker selectedCountry={selectedCountry} handleChange={handleChange} />
                        {/* {!selectedCountry && <span className="error">Country is required!</span>} */}
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="single__field">
                        <label htmlFor="business_phone">Phone Number</label>
                        {/* <input className={errors.business_phone && "border-danger"} {...register("business_phone", { required: "Phone number is required!" })} placeholder="Enter your Phone Number" /> */}
                        <Controller
                          name="business_phone"
                          control={control}
                          rules={{ required: "Phone number is required" }}
                          render={({ field }) => (
                            <PhoneInput
                              inputProps={{
                                name: "business_phone",
                                required: true,
                              }}
                              country={"us"}
                              containerClass={`phone-input-container ${errors.number ? "border-danger-phoneInput" : ""}`}
                              {...field}
                            />
                          )}
                        />
                        {errors.business_phone && <span className="error">{errors.business_phone.message}</span>}
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

                    <div className="col-sm-12">
                      <div className="single__field">
                        <label htmlFor="business_address">Company Address</label>
                        <input className={errors.business_address && "border-danger"} {...register("business_address", { required: "Address is required!" })} placeholder="Enter your Company Address" />
                        {errors.business_address && <span className="error">{errors.business_address.message}</span>}
                      </div>
                    </div>
                    <div className="col-sm-12">
                      <div className="single__field">
                        <label htmlFor="business_categories">Business Category</label>
                        {loading ? (
                          <p>Loading...</p>
                        ) : (
                          <Controller
                            name="business_categories"
                            control={control}
                            rules={{
                              required: "At least one Business Category is required!",
                              validate: (value) => (value && value.length > 0) || "Please select at least one Business Category.",
                            }}
                            render={({ field: { onChange, value } }) => <Select isSearchable={true} placeholder="Select Categories..." onChange={onChange} isClearable={true} ref={selectCategoryRef} defaultValue={value} isMulti={true} options={category} />}
                          />
                        )}
                        {errors.business_categories && <span className="error">{errors.business_categories.message}</span>}
                      </div>
                    </div>
                    <div className="d-flex justify-content-center mb-3">
                      <ReCAPTCHA sitekey={captchaKey} onChange={onChange} />,
                    </div>

                    {/* <div className="col-12">
                      <div className="single__field checkbox__field">
                        <input {...register("receiveDemo")} type="checkbox" id="reciveDemo" />
                        <label htmlFor="reciveDemo">I'd like to receive a demo of Trustyfeedback’s paid plans.</label>
                      </div>
                    </div> */}
                    <div className="col-12">
                      <div className="single__field">
                        <button type="submit" className="default__btn w-100">
                          <span>{createLoading ? <Spinner /> : "Create free Account"}</span>
                        </button>
                      </div>
                    </div>
                    <div className="col-12">
                      <p className="mb-0 text-center recaptcha__text">This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply. By submitting this form you accept our Privacy Policy.</p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
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
                <VerifyOTP reset={reset} id={userId} onClose={closeModal} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingUp;
