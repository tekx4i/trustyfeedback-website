import { useState, useEffect } from "react";
import { apiGet } from "../services/userAuth";

const useSEO = (url, defaultData = []) => {
  const [data, setData] = useState(defaultData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await apiGet(url);
      if (response.success) {
        setData(response.data.payload);
      } else {
        setError(response.message || "Failed to fetch data.");
      }
    } catch (err) {
      setError(err.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useSEO;
