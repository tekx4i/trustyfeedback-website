import React, { useState } from "react";
import "./UserProfile.scss";

const UserProfile = () => {
  const [tabs, setTabs] = useState(1);

  return (
    <section className="profile_users">
      <h4>Profile Overview</h4>

      <div className="custom__tabs">
        <button className={`custom_tab_btn ${tabs === 1 ? "active" : ""}`}>General Info</button>
        <button className={`custom_tab_btn ${tabs === 2 ? "active" : ""}`}>Contact Info</button>
        <button className={`custom_tab_btn ${tabs === 3 ? "active" : ""}`}>Addresses</button>
        <button className={`custom_tab_btn ${tabs === 4 ? "active" : ""}`}>Passowrd</button>
      </div>
    </section>
  );
};

export default UserProfile;
