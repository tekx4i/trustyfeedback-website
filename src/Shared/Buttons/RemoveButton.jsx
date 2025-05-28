import React from "react";

const RemoveButton = ({ onClick }) => {
  return (
    <>
      <button type="button" className="remov_btn" onClick={onClick}>
        Remove
      </button>
    </>
  );
};

export default RemoveButton;
