import { useState, useEffect } from "react";
import { apiGet, apiPut } from "../../../../../services/userAuth";
import { REACT_APP_API_URL } from "../../../../../constants/constants";
import { useDebounce } from "../Hook";
import { getStorage } from "../../../../../services/storage";

export const useNotifications = () => {
  const [notifi, setNotification] = useState(false);
  const [read, setRead] = useState(1);
  const [notific, setNotific] = useState([]);
  const token = getStorage("token");

  const getNotifications = async () => {
    try {
      const URL = `${REACT_APP_API_URL}notification`;
      const params = {
        sort: "created_at:desc",
      };
      const response = await apiGet(URL, params, token);
      if (response.success) {
        const notifications = response.data.payload.records;
        setNotific(read === 2 ? notifications.filter((n) => !n.is_read) : notifications);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const debouncedMarkRead = useDebounce(async (id) => {
    const url = `${REACT_APP_API_URL}notification/${id}`;
    const params = {
      is_read: true,
    };

    try {
      const response = await apiPut(url, params, token);
      if (response.success === true) {
        setNotific((prev) => {
          if (read === 2) {
            return prev.filter((n) => n.id !== id);
          } else {
            return prev.map((n) => (n.id === id ? { ...n, is_read: true } : n));
          }
        });
      }
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  }, 300);

  useEffect(() => {
    getNotifications();
  }, [read]);

  return {
    notifi,
    setNotification,
    read,
    setRead,
    notific,
    debouncedMarkRead,
  };
};
