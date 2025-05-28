import React from "react";
import Sidebar from "../../../../../Shared/Business/Sidebar";
import Header from "../../../../../Shared/Business/Header";

const BuninessHomeLayout = ({ children }) => {
  return (
    <>
      <div className="bg-blue-25 grid grid-flow-row grid-cols-12">
        <Sidebar />
        <Header />
      </div>
      <main>{children}</main>
    </>
  );
};

export default BuninessHomeLayout;
