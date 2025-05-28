import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const RedirectIfAuthenticated = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);

  return !token ? children : null;
};

export default RedirectIfAuthenticated;
