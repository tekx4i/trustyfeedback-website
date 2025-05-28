import React from "react";
import { ReactSVG } from "react-svg";
import logo from "../../assets/logo_0.svg";

const Loader = () => {
  return (
    <div className="loader d-flex justify-content-center my-5 py-5">
      <div className="spinner-grow align-self-center" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <ReactSVG src={logo} />
    </div>
  );
};

export default Loader;
