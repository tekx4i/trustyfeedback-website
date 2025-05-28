import React, { useState, useContext } from "react";
import { ReactSVG } from "react-svg";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { useDispatch } from "react-redux";
import { IoMdClose } from "react-icons/io";
import { Notifications } from "../../../../constants/allSVG";
import NotificationsComp from "./Notifications";

// assets
import Logo from "../../../../assets/logo_0.svg";
import "../UserDashboardLayout.scss";
import home from "../../../../assets/Dashboard/home-2.svg";
import homeActive from "../../../../assets/Dashboard/home-active.svg";
import bookmark from "../../../../assets/Dashboard/bookmark.svg";
import bookmarkActive from "../../../../assets/Dashboard/archive.svg";
import { useUserInfo } from "../../../../context/UserInfoContext";
import { IMG_URL } from "../../../../constants/constants";
import { AuthContext } from "../../../../context/UserDashboardSlice";
import PlaceholderImg from "../../../../Shared/PlaceholderImg/PlaceholderImg";
import { useNotifications } from "./hooks/useNotifications";
import { MdPayment } from "react-icons/md";
import { FaArrowRight, FaHistory } from "react-icons/fa";
import CartItem from "./Cart";
import cart from "../../../../assets/shopping-cart.png";
import { TbLogout2 } from "react-icons/tb";

const MobileHeader = () => {
  const { user } = useContext(AuthContext);
  const { userInfo } = useUserInfo();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [menuActive, setMenuActive] = useState(false);
  const [cartItem, setCartItem] = useState(false);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  const handleClick = () => {
    toggleMenu();
  };

  function handleLogout() {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("token");
    navigate(userInfo?.role_id === 3 ? "/business/log-in" : "/auth/login");
  }

  const { notifi, setNotification, read, setRead, notific, debouncedMarkRead } = useNotifications();

  return (
    <section id="mobile_header">
      <div className="upper_section position-relative">
        <div className="d-flex gap-2">
          <button className={`burger_menu_btn align-self-center ${menuActive ? "active" : ""}`} onClick={toggleMenu}>
            <div className="bar-1"></div>
            <div className="bar-2"></div>
            <div className="bar-3"></div>
          </button>
          <Link to="/">
            <ReactSVG src={Logo} />
          </Link>
        </div>
        <div className="d-flex gap-2">
          <button className="search_btn" onClick={() => setCartItem(!cartItem)}>
            <img src={cart} width="22" height="22" />
          </button>
          <button className="search_btn" onClick={() => setNotification(!notifi)}>
            {!notifi ? <ReactSVG src={Notifications} /> : <IoMdClose size={28} />}
          </button>
        </div>
      </div>
      {notifi ? (
        <div className="notification_mmobile">
          <NotificationsComp notifi={notifi} setNotification={setNotification} read={read} setRead={setRead} notific={notific} debouncedMarkRead={debouncedMarkRead} />
        </div>
      ) : (
        ""
      )}
      {cartItem && (
        <div className="notification_mmobile">
          <CartItem cart={cartItem} setCart={setCartItem} />
        </div>
      )}
      {menuActive && <div className="sidebar_backdrop" onClick={() => setMenuActive(!menuActive)}></div>}
      <aside style={{ overflow: "scroll" }} className={`sidebar ${menuActive ? "active_sidebar" : ""}`} onClick={() => setMenuActive(!menuActive)}>
        <div className="d-flex justify-content-end">
          <button className="btn">
            <IoMdClose color="#fff" size={22} />
          </button>
        </div>
        <button className="settings_bell" id="dropdown_header" onClick={() => setDropdown(!dropdown)}>
          {userInfo?.image ? <img src={IMG_URL + userInfo?.image} className="ms-1" /> : <PlaceholderImg />}
          <div>
            <div className="text-start items-center mt-3">
              <span>{userInfo?.name}</span>
            </div>
          </div>
        </button>
        <ul>
          {userInfo?.role_id === 3 ? (
            <li onClick={() => dispatch(setIsMyAccount(false))}>
              <NavLink to="/dashboard/business-home" className={({ isActive }) => `dashboard_button ${isActive && location.pathname === "/dashboard/business-home" ? " active" : ""}`}>
                {({ isActive }) => (
                  <>
                    <ReactSVG src={location.pathname === "/dashboard/business-home" && isActive ? home : homeActive} />
                    <span>Dashboard</span>
                  </>
                )}
              </NavLink>
            </li>
          ) : (
            <li onClick={() => dispatch(setIsMyAccount(false))}>
              <NavLink to="/dashboard" className={({ isActive }) => `dashboard_button ${isActive && location.pathname === "/dashboard" ? " active" : ""}`} onClick={() => handleClick()}>
                {({ isActive }) => (
                  <>
                    <ReactSVG src={location.pathname === "/dashboard" && isActive ? home : homeActive} />
                    <span>Dashboard</span>
                  </>
                )}
              </NavLink>
            </li>
          )}
          <li onClick={() => dispatch(setIsMyAccount(false))}>
            <NavLink to="/dashboard/bookmark" className={({ isActive }) => `dashboard_button ${isActive ? " active" : ""}`} onClick={() => handleClick()}>
              {({ isActive }) => (
                <>
                  <ReactSVG src={isActive ? bookmarkActive : bookmark} />
                  <span>Bookmark</span>
                </>
              )}
            </NavLink>
          </li>
          <NavLink to="/dashboard/billing-info" className={({ isActive }) => `dashboard_button ${isActive ? " active" : ""}`}>
            {({ isActive }) => (
              <>
                <MdPayment size={24} color={isActive ? "#fff" : "#eee"} />
                <span>Billing Info</span>
              </>
            )}
          </NavLink>
          {userInfo?.role_id === 3 && (
            <li>
              <NavLink to="/dashboard/customer-story" className={({ isActive }) => `dashboard_button ${isActive ? " active" : ""}`}>
                {({ isActive }) => (
                  <>
                    <FaHistory size={24} color={isActive ? "#fff" : "#eee"} />
                    <span>Story</span>
                  </>
                )}
              </NavLink>
            </li>
          )}
          <NavLink onClick={handleLogout} className={({ isActive }) => `dashboard_button ${isActive ? " active" : ""}`}>
            {({ isActive }) => (
              <>
                <TbLogout2 size={24} color={isActive ? "#fff" : "#eee"} />
                <span>Logout</span>
              </>
            )}
          </NavLink>
          {/* <div className="dashboard_footer">
            {user?.verified_status === "PENDING" ? <p>Upgrade to unlock more features</p> : user?.package?.expiry ? <p>Package expires on: {format(new Date(user.package.expiry), "MMM dd, yyyy")}</p> : ""}
            <Link to="/business/pricing" className="default__btn upgrade">
              <span>Upgrade</span>
              <span style={{ marginLeft: "5px" }}>
                <FaArrowRight />
              </span>
            </Link>
          </div> */}
        </ul>
      </aside>
    </section>
  );
};

export default MobileHeader;
