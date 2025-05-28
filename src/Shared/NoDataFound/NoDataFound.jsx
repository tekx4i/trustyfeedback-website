import React from "react";
import notFound from "../../assets/no-data-found.png";

const NoDataFound = () => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <img src={notFound} style={{ width: "200px", height: "200px", objectFit: "contain" }} alt="Not Found" />
    </div>
  );
};

export default NoDataFound;
