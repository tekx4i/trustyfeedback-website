import { createContext, useState, useContext } from "react";
import { getStorage } from "../services/storage";

const UserInfoContext = createContext();

export const UserInfoProvider = ({ children }) => {
  const initialUserInfo = JSON.parse(getStorage("userInfo") || "{}");
  const [userInfo, setUserInfo] = useState(initialUserInfo);

  const updateUserInfo = (newInfo) => {
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      ...newInfo,
    }));
  };

  return <UserInfoContext.Provider value={{ userInfo, updateUserInfo }}>{children}</UserInfoContext.Provider>;
};

export const useUserInfo = () => useContext(UserInfoContext);
