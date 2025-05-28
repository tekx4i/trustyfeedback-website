import React, { useState, useEffect } from "react";
import "./PopularSearch.scss";
import { apiGet } from "../../../../services/userAuth";
import { REACT_APP_API_URL } from "../../../../constants/constants";
import { Link } from "react-router-dom";

const PopularSearch = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState();

  const getCategories = async () => {
    setLoading(true);
    try {
      const URL = `${REACT_APP_API_URL}category`;
      const params = {
        limit: 10,
        is_parent: true,
        has_business: true,
      };
      const response = await apiGet(URL, params);
      if (response.success === true) {
        const dbValues = response.data.payload.records;
        setData(dbValues);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="popular-search ">
      <h5 className="">Popular Search</h5>
      <div className="container">
        <div className="popular-tags">
          {loading
            ? "Loading"
            : data?.length > 0
            ? data.map((item, key) => (
                <Link to={`/listing/${item.id}/${item.name}`} key={key} className="popular-tags-btn">
                  {item.name}
                </Link>
              ))
            : "No categories found."}
        </div>
      </div>
    </div>
  );
};

export default PopularSearch;
