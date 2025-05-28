import React, { useContext, useEffect, useState } from "react";
import { ReactSVG } from "react-svg";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Notifications, dummyUser } from "../../../../constants/allSVG";
import { IoChevronDownOutline } from "react-icons/io5";
import Reward from "../../../../assets/Dashboard/rewards.svg";
import SearchWithCategory from "../../../../Shared/DashboardComponents/SearchWithCategory/SearchWithCategory";
import sharLink from "../../../../assets/Dashboard/export.svg";
import logoutIcon from "../../../../assets/Dashboard/logout.svg";
import popup from "../../../../assets/Dashboard/popup.svg";
import { useDispatch, useSelector } from "react-redux";
import { setIsCompanyDetails, setIsMyAccount } from "../../../../context/slice/dashboardSlice";
import BackButton from "../../../../Shared/Buttons/BackButton";
import { AuthContext } from "../../../../context/UserDashboardSlice";
import { IMG_URL, REACT_APP_API_URL } from "../../../../constants/constants";
import PlaceholderImg from "../../../../Shared/PlaceholderImg/PlaceholderImg";
import { getStorage } from "../../../../services/storage";
import { useUserInfo } from "../../../../context/UserInfoContext";
import { apiGet, apiPost, apiPut } from "../../../../services/userAuth";
import { format } from "date-fns";
import { useDebounce } from "./Hook";
import NotificationsComp from "./Notifications";
import { useNotifications } from "./hooks/useNotifications";
import cart from "../../../../assets/shopping-cart.png";
import CartItem from "./Cart";
const UserHeader = () => {
  const { userInfo } = useUserInfo();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [dropdown, setDropdown] = useState();
  const [loading, setLoading] = useState();
  const isMyAccount = useSelector((state) => state.isMyAccount);
  const isCompanyDetails = useSelector((state) => state.isCompanyDetails);
  const dispatch = useDispatch();
  const location = useLocation();
  const [cartItem, setCartItem] = useState(false);

  const { notifi, setNotification, read, setRead, notific, debouncedMarkRead } = useNotifications();

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("token");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate(userInfo?.role_id === 3 ? "/business/log-in" : "/auth/login");
    }, 2000);
  };

  return (
    <header id="dashboard_header">
      <section className="row">
        <div className="col-sm-6">
          {userInfo?.role_id === 3 ? (
            <h3 className="dashboard_heading">Welcome Back, {user?.name} 👋</h3>
          ) : (
            <>
              {isMyAccount ? (
                <BackButton
                  onClick={() => {
                    navigate("/dashboard");
                    dispatch(setIsMyAccount(false));
                  }}
                />
              ) : isCompanyDetails ? (
                <div className="flex justify-start items-center gap-2">
                  <BackButton
                    onClick={() => {
                      navigate("/dashboard");
                      dispatch(setIsCompanyDetails(false));
                    }}
                  />
                  <SearchWithCategory />
                </div>
              ) : (
                <SearchWithCategory />
              )}
            </>
          )}
        </div>
        <div className="col-lg-6">
          <div className="user-details">
            {/* <div className="user_points">
              <ReactSVG src={Reward} />
              <div className="text-detail">
                <span>150</span> Points
              </div>
            </div> */}

            <button className="notification_bell" onClick={() => setCartItem(!cartItem)}>
              <img src={cart} width="22" height="22" />
            </button>
            <button className="notification_bell" onClick={() => setNotification(!notifi)}>
              <ReactSVG src={Notifications} />
            </button>

            <button className="settings_bell" id="dropdown_header" onClick={() => setDropdown(!dropdown)}>
              {userInfo?.image ? <img src={IMG_URL + userInfo?.image} className="ms-1" /> : <PlaceholderImg />}
              <div>
                <div className="flex mt-2 items-center">
                  <span>{userInfo?.name}</span>
                  <IoChevronDownOutline className="mx-2" />
                </div>
              </div>
            </button>
            <div className={`custom_dropdown`}>
              {dropdown && <div className="backdrop" onClick={() => setDropdown(false)}></div>}
              <div className={`dropdown_ctm_logout  ${dropdown ? "visible_content" : "hidden_content"}`}>
                <div className="profiling">
                  <div className="d-flex">
                    {userInfo?.image ? <img src={IMG_URL + userInfo?.image} /> : <PlaceholderImg />}
                    <div className="align-self-center">
                      <h6>{userInfo?.name}</h6>
                      <span>{userInfo?.email}</span>
                    </div>
                  </div>
                </div>
                <Link
                  to="my-account"
                  onClick={() => {
                    dispatch(setIsMyAccount(true));
                    setDropdown(false);
                  }}
                  className={`pages_link ${location.pathname.includes("my-account") ? "active" : ""}`}
                >
                  <span>Manage my account</span>
                  <ReactSVG src={sharLink} />
                </Link>
                <ul>
                  {userInfo?.role_id === 3 ? (
                    <li>
                      <Link
                        to="my-responds"
                        onClick={() => {
                          dispatch(setIsMyAccount(true));
                          setDropdown(false);
                        }}
                        className={`pages_link ${location.pathname.includes("my-responds") ? "active" : ""}`}
                      >
                        <span>My Responds</span>
                      </Link>
                    </li>
                  ) : (
                    <li>
                      <Link
                        to="my-reviews"
                        onClick={() => {
                          dispatch(setIsMyAccount(true));
                          setDropdown(false);
                        }}
                        className={`pages_link ${location.pathname.includes("my-reviews") ? "active" : ""}`}
                      >
                        <span>My Reviews</span>
                      </Link>
                    </li>
                  )}
                </ul>
                <button className="logout_btn" onClick={() => handleLogout()}>
                  {loading ? (
                    "logging out.."
                  ) : (
                    <>
                      <div>Logout</div> <ReactSVG src={logoutIcon} />
                    </>
                  )}
                </button>
              </div>
            </div>
            <CartItem cart={cartItem} setCart={setCartItem} />
            <NotificationsComp notifi={notifi} setNotification={setNotification} read={read} setRead={setRead} notific={notific} debouncedMarkRead={debouncedMarkRead} />
          </div>
        </div>
      </section>
    </header>
  );
};

export default UserHeader;
