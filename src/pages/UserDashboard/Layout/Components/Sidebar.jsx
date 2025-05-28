import React, { useContext, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "../../../../assets/Dashboard/Logo_0.svg";
import { ReactSVG } from "react-svg";
import home from "../../../../assets/Dashboard/home-2.svg";
import homeActive from "../../../../assets/Dashboard/home-active.svg";
import bookmark from "../../../../assets/Dashboard/bookmark.svg";
import bookmarkActive from "../../../../assets/Dashboard/archive.svg";
import { useDispatch } from "react-redux";
import { setIsMyAccount } from "../../../../context/slice/dashboardSlice";
import { useUserInfo } from "../../../../context/UserInfoContext";
import { MdPayment } from "react-icons/md";
import { AuthContext } from "../../../../context/UserDashboardSlice";
import { FaArrowRight, FaHistory } from "react-icons/fa";
import { format } from "date-fns";
const UserSidebar = () => {
  const { userInfo } = useUserInfo();
  const dispatch = useDispatch();
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const [isLoading, setLoading] = useState(false);
  setTimeout(() => {
    setLoading(true);
  }, 1000);
  return (
    <aside className="sidebar">
      <ul>
        <li>
          <Link to={userInfo?.role_id === 3 ? "/business" : "/"} className="logo text-center d-block">
            <ReactSVG src={logo} />
          </Link>
        </li>

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
            <NavLink to="/dashboard" className={({ isActive }) => `dashboard_button ${(isActive || location.pathname.startsWith("/dashboard/listing")) && !["/dashboard/bookmark", "/dashboard/billing-info"].includes(location.pathname) ? " active" : ""}`}>
              {({ isActive }) => (
                <>
                  <ReactSVG src={(isActive || location.pathname.startsWith("/dashboard/listing")) && !["/dashboard/bookmark", "/dashboard/billing-info"].includes(location.pathname) ? home : homeActive} />
                  <span>Dashboard</span>
                </>
              )}
            </NavLink>
          </li>
        )}

        <li onClick={() => dispatch(setIsMyAccount(false))}>
          <NavLink to="/dashboard/bookmark" className={({ isActive }) => `dashboard_button ${isActive ? " active" : ""}`}>
            {({ isActive }) => (
              <>
                <ReactSVG src={isActive ? bookmarkActive : bookmark} />
                <span>Bookmark</span>
              </>
            )}
          </NavLink>
        </li>
        <li onClick={() => dispatch(setIsMyAccount(false))}>
          <NavLink to="/dashboard/billing-info" className={({ isActive }) => `dashboard_button ${isActive ? " active" : ""}`}>
            {({ isActive }) => (
              <>
                <MdPayment size={24} color={isActive ? "#fff" : "#eee"} />
                <span>Billing Info</span>
              </>
            )}
          </NavLink>
        </li>
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
      </ul>
      <div className="dashboard_footer">
        {user?.verified_status === "PENDING" ? <p>Upgrade to unlock more features</p> : user?.package?.expiry ? <p>Package expires on: {format(new Date(user.package.expiry), "MMM dd, yyyy")}</p> : isLoading && <p>No Package Found</p>}
        <Link to={userInfo?.role_id === 3 ? "/business/pricing" : "/pricing"} className="default__btn upgrade">
          <span>Upgrade</span>
          <span style={{ marginLeft: "5px" }}>
            <FaArrowRight />
          </span>
        </Link>
      </div>
    </aside>
  );
};

export default UserSidebar;
