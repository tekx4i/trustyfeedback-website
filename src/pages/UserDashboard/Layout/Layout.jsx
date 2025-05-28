import React, { useState, useEffect } from "react";
import "./UserDashboardLayout.scss";
import UserHeader from "./Components/Header";
import UserSidebar from "./Components/Sidebar";
import { Outlet } from "react-router-dom";
import { AuthProvider } from "../../../context/UserDashboardSlice";
import { UserInfoProvider } from "../../../context/UserInfoContext";
import MobileHeader from "./Components/MobileHeader";

const UserDashboard = ({ children }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });

  return (
    <AuthProvider>
      <UserInfoProvider>
        <main id="layout__user" className="" style={{ backgroundColor: "#F0F1F8" }}>
          <div className="user_dashboard_layout">
            {windowWidth > 992 ? <UserSidebar /> : ""}
            <section className="dashboard_header">
              {windowWidth > 992 ? <UserHeader /> : <MobileHeader />}
              <section className="layout-body_content">
                <Outlet />
              </section>
            </section>
          </div>
        </main>
      </UserInfoProvider>
    </AuthProvider>
  );
};

export default UserDashboard;
