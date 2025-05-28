import React, { useState, useEffect } from "react";
import { ReactSVG } from "react-svg";
import Categories from "../../../../assets/Dashboard/category-2.svg";
import { Link } from "react-router-dom";
import dummyImg from "../../../../assets/Dashboard/dummy_0.png";
import { REACT_APP_API_URL } from "../../../../constants/constants";
import { apiGet } from "../../../../services/userAuth";
import PlaceholderImg from "../../../../Shared/PlaceholderImg/PlaceholderImg";
import NoDataFound from "../../../../Shared/NoDataFound/NoDataFound";
import Spinner from "../../../../Shared/Loader/Spinner";

const TopCategories = () => {
  const [loading, setLoading] = useState();
  const [data, setData] = useState([]);

  const getCategories = async () => {
    setLoading(true);
    try {
      const URL = `${REACT_APP_API_URL}category`;
      const params = {};
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
    <section className="top_categories">
      <div className="header">
        <ReactSVG src={Categories} />
        <h3>Top Categories</h3>
      </div>
      <div className="section_category">
        {loading ? (
          <div className="text-center">
            <Spinner /> Loading..
          </div>
        ) : (
          <ul>
            {data && data.length > 0 ? (
              data.map((item, key) => (
                <li>
                  <Link to={`/dashboard/listing/${item.id}/${item.name}`}>
                    <div className="img-icon">{item.image ? <img src={IMG_URL + item.image} /> : <PlaceholderImg />}</div>
                    <span>
                      {item.name.substr(0, 17)}
                      {item.name.length > 17 && ".."}
                    </span>
                  </Link>
                </li>
              ))
            ) : (
              <NoDataFound />
            )}
          </ul>
        )}
      </div>
    </section>
  );
};

export default TopCategories;
