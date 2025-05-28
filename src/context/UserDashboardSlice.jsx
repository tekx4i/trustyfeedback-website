import React, { createContext, useState, useEffect } from "react";
import { apiGet } from "../services/userAuth";
import { REACT_APP_API_URL } from "../constants/constants";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const fetchUser = async () => {
    try {
      setLoading(true);
      const URL = `${REACT_APP_API_URL}auth/me`;
      const params = {};
      const response = await apiGet(URL, params, token);
      if (response.success) {
        setUser(response.data.payload);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error during authentication:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  return <AuthContext.Provider value={{ user, setUser, loading }}>{children}</AuthContext.Provider>;
};
