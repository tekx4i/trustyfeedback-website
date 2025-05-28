import { useEffect, useRef } from "react";

// it will close the dropdown if click outside
const useCloseDropDown = (onClose) => {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleCloseDropDown = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        onClose();
      }
    };
    window.addEventListener("mousedown", handleCloseDropDown);

    return () => {
      window.removeEventListener("mousedown", handleCloseDropDown);
    };
  }, [onClose]);

  return dropdownRef;
};

export { useCloseDropDown };
