import { Fragment, useState, useRef, useEffect } from "react";
import "./MyAccount.scss";
import { ProfileOverviewHelperFunction } from "../../../helper/MyAccountHelper";
import SaveButton from "../../../Shared/Buttons/SaveButton";
import PlaceholderImg from "../../../Shared/PlaceholderImg/PlaceholderImg";
import ChangeAvatarButton from "../../../Shared/Buttons/ChangeAvatarButton";
import RemoveButton from "../../../Shared/Buttons/RemoveButton";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Controller, useForm } from "react-hook-form";
import { getStorage, setStorage } from "../../../services/storage";
import { IMG_URL, REACT_APP_API_URL } from "../../../constants/constants.jsx";
import { apiPost, apiPut } from "../../../services/userAuth.js";
import { useUserInfo } from "../../../context/UserInfoContext";
import { FiEye, FiEyeOff } from "react-icons/fi";
import CountryPicker from "../../../Shared/CountryPicker/CountryPicker.jsx";

const MyAccount = () => {
  const userInfo = getStorage("userInfo");
  const userInfoParsed = JSON.parse(userInfo);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [sentImage, setSentImage] = useState(null);
  const fileInputRef = useRef(null);
  const [showPass, setShowPass] = useState();
  const [showPassC, setShowPassC] = useState();

  const token = getStorage("token");
  const [sentLoading, setSentLoading] = useState();
  const profileOverviewList = ProfileOverviewHelperFunction();
  const [isActive, setIsActive] = useState(localStorage.getItem("ActiveTab") || "General Info");
  const [genealInfo, setGeneralInfo] = useState(
    profileOverviewList[0]?.general_info?.map((item) => ({
      ...item,
      value: userInfoParsed?.[item.value] || item.value,
    })),
  );
  // const [contactInfo, setContactInfo] = useState(
  //   profileOverviewList[1].contact_info.map((item) => ({
  //     ...item,
  //     value: userInfoParsed?.[item.value] || item.value,
  //   })),
  // );
  // const [addresses, setAddresses] = useState(
  //   profileOverviewList[2].address.map((item) => ({
  //     ...item,
  //     value: userInfoParsed?.[item.value] || item.value,
  //   })),
  // );
  const [password, setPassword] = useState(profileOverviewList[1].password);
  const [changeAvatar, setChangeAvatar] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);

  const { updateUserInfo } = useUserInfo();

  const handleChangeGeneralInfo = (e, index) => {
    setGeneralInfo((prev) => {
      const newValue = [...prev];
      newValue[index].value = e.target.value;
      return newValue;
    });
  };

  const handleChangeAddresses = (e, index) => {
    setAddresses((prev) => {
      const newValue = [...prev];
      newValue[index].value = e.target.value;
      return newValue;
    });
  };

  const handleChangePassword = (e, index) => {
    setPassword((prev) => {
      const newValue = [...prev];
      newValue[index].value = e.target.value;
      return newValue;
    });
  };

  // ====================== generalInfo =======================
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    defaultValues: genealInfo?.reduce((acc, item) => {
      acc[item.label] = item.value;
      return acc;
    }, {}),
  });

  const onSubmit = async (data) => {
    setSentLoading(true);
    try {
      const url = `${REACT_APP_API_URL}user/me`;
      const formData = new FormData();
      formData.append("role_id", userInfoParsed.role_id);
      formData.append("name", data.name || userInfoParsed.name);
      formData.append("country", selectedCountry || userInfoParsed.country);
      formData.append("postal_code", data.postal_code || userInfoParsed.postal_code);
      formData.append("number", data.number || userInfoParsed.number);
      formData.append("address", data.address || userInfoParsed.address);
      formData.append("website", data.website || userInfoParsed.business?.website); // Update website

      if (data.password) {
        formData.append("password", data.password);
      }

      if (sentImage) {
        formData.append("image", sentImage);
      }

      const response = await apiPut(url, formData, token);
      if (response.success === true) {
        const updatedUserInfo = {
          ...userInfoParsed,
          name: data.name || userInfoParsed.name,
          country: selectedCountry || userInfoParsed.country,
          postal_code: data.postal_code || userInfoParsed.postal_code,
          number: data.number || userInfoParsed.number,
          address: data.address || userInfoParsed.address,
          business: {
            ...userInfoParsed.business,
            website: data.website || userInfoParsed.business?.website,
            phone: data?.phone || userInfoParsed.business?.phone,
            address: data?.address || userInfoParsed.business?.address,
          },
          image: response.payload.image || userInfoParsed.image,
        };
        setStorage("userInfo", updatedUserInfo);
        updateUserInfo(updatedUserInfo);
      }
    } catch (error) {
      console.error("Error updating website:", error);
      setSentLoading(false);
    } finally {
      setSentLoading(false);
    }
  };

  // ====================== generalInfo =======================
  const newPassword = watch("confirm_password", "");

  // image add/remove

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploadingAvatar(true);
      try {
        if (uploadedImage) URL.revokeObjectURL(uploadedImage);
        setUploadedImage(URL.createObjectURL(file));
        setSentImage(file);
      } finally {
        setIsUploadingAvatar(false);
      }
    }
  };

  const handleRemoveImage = () => {
    setShowConfirmModal(true);
  };

  const confirmImageRemoval = () => {
    if (uploadedImage) {
      URL.revokeObjectURL(uploadedImage);
    }
    const updatedUserInfo = {
      ...userInfoParsed,
      image: "",
    };
    setStorage("userInfo", updatedUserInfo);
    setUploadedImage(null);
    setSentImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setShowConfirmModal(false);
  };

  // country selection
  const [selectedCountry, setSelectedCountry] = useState(userInfoParsed.country || "");

  const handleChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  useEffect(() => {
    localStorage.setItem("ActiveTab", isActive);
  }, [isActive]);

  return (
    <div className="my__accounts">
      <h3 className="">Profile Overview</h3>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="">
          <ul className="custom__tab ">
            {profileOverviewList?.map((items) => (
              <Fragment key={items.id}>
                <li onClick={() => setIsActive(items.label)} className={`custom__tab-btn ${isActive === items.label ? "active" : ""} `}>
                  {items?.label}
                  <div className={`${isActive === items.label && "active_bar"} `} />
                </li>
              </Fragment>
            ))}
          </ul>
        </div>
        <div>
          {isActive === profileOverviewList[0].label && (
            <div className="min_body">
              <div className="profile__account">
                {uploadedImage ? <img src={uploadedImage} alt="Preview" className="uploaded-image" /> : userInfoParsed.image ? <img src={`${IMG_URL}${userInfoParsed.image}`} alt="Preview" className="uploaded-image" /> : <PlaceholderImg className="" />}
                <button onClick={handleImageChange} className="change_img" disabled={isUploadingAvatar}>
                  {isUploadingAvatar ? <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> : "Change Avatar"}
                  <Controller
                    name="image"
                    control={control}
                    render={({ field }) => (
                      <input
                        type="file"
                        className="change_img_file"
                        accept="image/*"
                        ref={(e) => {
                          field.ref(e);
                          fileInputRef.current = e;
                        }}
                        onChange={handleImageChange}
                        disabled={isUploadingAvatar}
                      />
                    )}
                  />
                </button>
                {(uploadedImage || userInfoParsed.image) && <RemoveButton onClick={handleRemoveImage} />}
              </div>
              <div className="row">
                {genealInfo?.map((items, index) => (
                  <div key={items.id} className="col-md-6">
                    <label className="account_label">{items.label}</label>
                    <input
                      style={{ opacity: items.name === "email" ? 0.5 : 1 }}
                      readOnly={items.name === "email" ? true : false}
                      {...register(items.name, { required: false })}
                      placeholder={items.placeholder}
                      value={items.value}
                      onChange={(e) => handleChangeGeneralInfo(e, index)}
                      className={`account_input ${errors[items.label] ? "is-invalid" : ""}`}
                    />
                  </div>
                ))}
                <div className="col-md-6 mb-4">
                  <label className="account_label">Country</label>
                  <CountryPicker selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} handleChange={handleChange} />
                </div>
              </div>
            </div>
          )}

          {/* contact info */}

          {/* password */}
          {isActive === profileOverviewList[1].label && (
            <div className="min_body inner__page">
              <div className="row">
                <div className="col-12">
                  <label className="account_label">Password</label>
                  <div className="input__icon ">
                    <input
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 8,
                          message: "Password must be at least 8 characters long",
                        },
                      })}
                      placeholder={"*********"}
                      type={!showPass ? "password" : "text"}
                      className="account_input"
                    />
                    <div className="password__show " onClick={() => setShowPass(!showPass)}>
                      {showPass ? <FiEyeOff /> : <FiEye />}
                    </div>
                  </div>
                  {errors.password && <span className="text-danger">{errors.password.message}</span>}
                </div>

                <div className="col-12">
                  <label className="account_label">Confirm Password</label>
                  <div className="input__icon">
                    <input
                      {...register("confirm_password", {
                        required: "Confirm password is required",
                        validate: (value) => value === watch("password") || "Passwords do not match",
                      })}
                      placeholder={"*********"}
                      type={!showPassC ? "password" : "text"}
                      className="account_input"
                    />
                    <div className="password__show " onClick={() => setShowPassC(!showPassC)}>
                      {showPassC ? <FiEyeOff /> : <FiEye />}
                    </div>
                  </div>

                  {errors.confirm_password && <span className="text-danger">{errors.confirm_password.message}</span>}
                </div>
              </div>
            </div>
          )}
          {/* Billing Info
          <div className="min_body inner__page"></div> */}
        </div>
        <div className="min_body">
          <SaveButton loading={sentLoading} title="Save Changes" onClick={handleSubmit(onSubmit)} className={""} />
        </div>
      </form>
      <div className={`modal fade ${showConfirmModal ? "show" : ""}`} style={{ display: showConfirmModal ? "block" : "none" }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header border-0">
              <h4 className="modal-title text-center fw-bold mb-0 w-100">Confirm Removal</h4>
              {/* <button type="button" className="btn-close" onClick={() => setShowConfirmModal(false)}></button> */}
            </div>
            <div className="modal-body text-center mt-0 pt-2">Are you sure you want to remove this image?</div>
            <div className="modal-footer border-0 d-flex justify-content-center">
              <button type="button" className="btn btn-light border rounded-pill px-4" onClick={() => setShowConfirmModal(false)}>
                Cancel
              </button>
              <button type="button" className="btn btn-danger rounded-pill px-4" onClick={confirmImageRemoval}>
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
      {showConfirmModal && <div className="modal-backdrop fade show"></div>}
    </div>
  );
};

export default MyAccount;
