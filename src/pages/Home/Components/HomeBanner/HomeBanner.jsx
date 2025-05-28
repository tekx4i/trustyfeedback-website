import React, { useState, useEffect } from "react";
import { ReactSVG } from "react-svg";
import SearchWithCategory from "../../../../Shared/SearchWithCategory/SearchWithCategory";
import direction from "../../../../assets/direction.svg";
import ReviewsSmallBox from "../../../../Shared/ReviewsSmallBox/ReviewsSmallBox";
import "./HomeBanner.scss";
import { REACT_APP_API_URL } from "../../../../constants/constants";
import { apiGet } from "../../../../services/userAuth";

const HomeBanner = () => {
  const [loading, setLoading] = useState();
  const [data, setData] = useState([]);

  const getBusiness = async () => {
    setLoading(true);
    try {
      const URL = `${REACT_APP_API_URL}review`;
      const params = {
        sort: "rating:desc",
        limit: 2,
        verified_status: "ACTIVE",
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
    getBusiness();
  }, []);

  return (
    <section className="customer__home__banner position-relative">
      <div className="banner__review__boxs">
        {data?.length !== 0 && <ReviewsSmallBox loading={loading} data={data[0]} />}
        {data?.length > 1 && <ReviewsSmallBox loading={loading} data={data[1]} />}
      </div>
      <div className="container">
        <div className="banner__content text-center mx-auto position-relative">
          <h1>
            Find Top Businesses & Services, <strong>Trusted by Your Reviews</strong>
          </h1>
          <p>Millions of unbiased reviews. Trusted by 700 Million+ users</p>
          <div className="arr_direction">
            <ReactSVG src={direction} />
          </div>
          <SearchWithCategory />
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;
