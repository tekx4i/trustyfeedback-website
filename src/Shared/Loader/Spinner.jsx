import React from "react";

const Spinner = () => {
  return (
    <div class="spinner-grow spinner-grow-sm" style={{ position: "relative", zIndex: 999 }} role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  );
};

export default Spinner;
