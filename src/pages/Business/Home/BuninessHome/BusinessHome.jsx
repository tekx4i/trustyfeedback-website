import React from "react";
import Sidebar from "../../../../Shared/Business/Sidebar";
import Header from "../../../../Shared/Business/Header";
import BuninessHomeLayout from "./Layout/BuninessHomeLayout";
import AnalyticsOverview from "../Component/AnalyticsOverview/AnalyticsOverview";

const BusinessHome = () => {
  return (
    // <div className="bg-blue-25 flex">
    //   <Sidebar />
    //   <Header />
    // </div>
    <BuninessHomeLayout>
      <AnalyticsOverview />
    </BuninessHomeLayout>
  );
};

export default BusinessHome;
