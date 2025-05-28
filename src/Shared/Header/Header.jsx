import React, { useState, useEffect } from "react";
import { ReactSVG } from "react-svg";
import { Link, NavLink } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import { GoArrowLeft, GoChevronDown } from "react-icons/go";

import rightarrow from "../../assets/right-arrow.svg";
import logoText from "../../assets/logo_text.svg";
import logobg from "../../assets/logo_bg.svg";
import logoalphabet from "../../assets/logo_alphabet.svg";
import logo from "../../assets/logo_0.svg";
import "./Header.scss";
import { IMG_URL, REACT_APP_API_URL } from "../../constants/constants";
import { Placeholder } from "react-bootstrap";
import { apiGet } from "../../services/userAuth";
import MenuLoader from "../Loader/MenuLoader";
import SidebarLogo from "../../assets/Dashboard/Logo_0.svg";

const Header = ({ business }) => {
  const [sidebar, setSidebar] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [dropdown, setDropdown] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [businessData, setBusinessData] = useState([]);

  const getMenu = async () => {
    setLoading(true);
    const params = {};

    try {
      const URL = `${REACT_APP_API_URL}menu/location/user-top-menu`;
      const response = await apiGet(URL, params);
      if (response.success) {
        const dbValues = response?.data?.payload?.items;
        setData(dbValues);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const getBusinessMenu = async () => {
    setLoading(true);
    const params = {};

    try {
      const URL = `${REACT_APP_API_URL}menu/location/business-top-menu`;
      const response = await apiGet(URL, params);
      if (response.success) {
        const dbValues = response?.data?.payload?.items;
        setBusinessData(dbValues);
      } else {
        setBusinessData([]);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUserInfo = localStorage.getItem("userInfo");

    if (token && storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, []);

  const handleSidebar = () => {
    setSidebar((prev) => !prev);
  };

  useEffect(() => {
    getMenu();
    getBusinessMenu();
  }, []);

  console.log(businessData);

  return (
    <header className={`site__header ${business && "business-header"}`}>
      <div className="container">
        <div className="row align-items-center">
          <div className={business === true ? "col-2" : "col-3"}>
            <div className="main__logo">
              {/* <Link to="/">
                <span className="log__head">
                  <span className="logo__bg">
                    {" "}
                    <ReactSVG src={logobg} />{" "}
                  </span>
                  <span className="logo__alphabet">
                    {" "}
                    <ReactSVG src={logoalphabet} />
                  </span>
                </span>
                <span className="logo__text">
                  <ReactSVG src={logoText} />
                </span>
              </Link> */}
              <Link to={userInfo?.role_id === 3 ? "/business" : "/"}>
                <img src={logo} />
              </Link>
            </div>
          </div>
          <div className={business === true ? "col-10" : "col-9"}>
            <div className={`header__menu ${sidebar ? "active" : ""}`}>
              {/* {sidebar && (
                <div style={{ display: "flex", justifyContent: "center", marginBottom: "30px" }}>
                  <ReactSVG src={SidebarLogo} />
                </div>
              )} */}
              <ul>
                {!isLoading && (
                  <li>
                    <NavLink className={({ isActive }) => (isActive ? "active" : "")} to="/write-a-review" onClick={handleSidebar}>
                      {business === true && (
                        <div className="flex items-center mt-1">
                          <IoIosArrowRoundBack size={20} /> For Consumers
                        </div>
                      )}
                    </NavLink>
                  </li>
                )}
                {isLoading ? (
                  <MenuLoader />
                ) : business ? (
                  businessData?.map((nav) => (
                    <li key={nav.id || nav.url}>
                      <NavLink className={({ isActive }) => (isActive ? "active" : "")} to={nav?.page?.url} onClick={handleSidebar}>
                        {nav?.page?.title}
                      </NavLink>
                    </li>
                  ))
                ) : (
                  data?.map((nav) => (
                    <li key={nav.id || nav.url}>
                      <NavLink className={({ isActive }) => (isActive ? "active" : "")} to={nav?.page?.url} onClick={handleSidebar}>
                        {nav?.page?.title}
                      </NavLink>
                    </li>
                  ))
                )}
                <li className="login_user">
                  {userInfo ? (
                    <NavLink to={userInfo?.role_id === 3 ? "/dashboard/business-home" : "/dashboard"} className={({ isActive }) => (isActive ? "active" : "")} onClick={handleSidebar}>
                      <ReactSVG src={rightarrow} />
                      {userInfo.image ? <img style={{ width: "30px", height: "30px", borderRadius: "100%" }} src={IMG_URL + userInfo.image} alt="user" /> : <img style={{ width: "30px", height: "30px", borderRadius: "100%" }} src="https://placehold.co/600x400" />}
                      <span className="ms-2 align-self-center">{userInfo.name}</span>
                    </NavLink>
                  ) : (
                    <NavLink to={`${business === true ? "/business/log-in" : "/auth/login"}`} className={({ isActive }) => (isActive ? "active" : "")} onClick={handleSidebar}>
                      <ReactSVG src={rightarrow} />
                      <span>Log In</span>
                    </NavLink>
                  )}
                </li>
                {!userInfo && (
                  <li className="menu_btn">
                    <Link to={business === true ? "/business/sign-up" : "/business"} className="default__btn">
                      <span>{business === true ? "Create free account" : "For Businesses"}</span>
                    </Link>
                  </li>
                )}
              </ul>
            </div>
            <div className={`mobile__toggle ${sidebar ? "active" : ""}`} onClick={handleSidebar}>
              <span className="menu-toggle-bar--top"></span>
              <span className="menu-toggle-bar--middle"></span>
              <span className="menu-toggle-bar--bottom"></span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
