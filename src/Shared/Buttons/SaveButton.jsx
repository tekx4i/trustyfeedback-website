import React from "react";
import Spinner from "../../Shared/Loader/Spinner";

const SaveButton = ({ onClick, title, className, loading }) => {
  return (
    <button type="submit" onClick={onClick} className="sav_btn_account">
      {loading ? <Spinner /> : title}
    </button>
  );
};

export default SaveButton;
