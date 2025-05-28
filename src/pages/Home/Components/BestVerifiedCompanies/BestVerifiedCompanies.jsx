import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import CompanyReviewBox from "../../../../Shared/CompanyReviewBox/CompanyReviewBox";
import "./BestVerifiedCompanies.scss";
import { REACT_APP_API_URL } from "../../../../constants/constants";
import { apiGet } from "../../../../services/userAuth";
import ReviewCardLoader from "../../../../Shared/Loader/Home/ReviewCardLoader";
import NoDataFound from "../../../../Shared/NoDataFound/NoDataFound";

const BestVerifiedCompanies = () => {
  const [loading, setLoading] = useState();
  const [loadingCategory, setLoadingCategory] = useState();
  const [isLoad, setIsLoad] = useState();
  const [data, setData] = useState([]);
  const [category, setCategory] = useState();
  const [dataByCategory, setDataByCategory] = useState([]);

  const best__verified__companies = {
    infinite: true,
    variableWidth: true,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    arrows: true,
    dots: false,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 500,
        settings: {
          variableWidth: false,
          slidesToShow: 1,
        },
      },
    ],
  };
  const top__verifiedbanks = {
    infinite: true,
    speed: 5000,
    variableWidth: true,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    arrows: false,
    dots: false,
    pauseOnHover: false,
    centerMode: true,
    responsive: [
      {
        breakpoint: 500,
        settings: {
          variableWidth: false,
          slidesToShow: 1,
        },
      },
    ],
  };
  // Business
  const getBusinessByCategory = async () => {
    setIsLoad(true);
    try {
      const URL = `${REACT_APP_API_URL}business`;
      const params = {
        category: category && category.id && category[0].id,
        limit: 8,
      };
      const response = await apiGet(URL, params);
      if (response.success === true) {
        const dbValues = response.data.payload.records;
        setDataByCategory(dbValues);
        setIsLoad(false);
      }
    } catch (error) {
      setIsLoad(false);
    } finally {
      setIsLoad(false);
    }
  };
  // Business
  const getBusiness = async () => {
    setLoading(true);
    try {
      const URL = `${REACT_APP_API_URL}business`;
      const params = {
        category: category && category.id && category[1].id,
        limit: 8,
        verified_status: "ACTIVE",
        has_reviews: true,
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
  // Category
  const getCategories = async () => {
    setLoadingCategory(true);
    try {
      const URL = `${REACT_APP_API_URL}category`;
      const params = {
        limit: 2,
        has_business: true,
        is_parent: true,
      };
      const response = await apiGet(URL, params);
      if (response.success === true) {
        const dbValues = response.data.payload.records;
        setCategory(dbValues);
        setLoadingCategory(false);
      }
    } catch (error) {
      setLoadingCategory(false);
    } finally {
      setLoadingCategory(false);
    }
  };
  useEffect(() => {
    getBusiness();
    getCategories();
    getBusinessByCategory();
  }, []);

  return (
    <section className="best__verified__companies position-relative">
      <div className="top__insurance__companies">
        <div className="container">
          {category && <h2 className="big_margin"> Best in {category && category[0].name}</h2>}
          {isLoad ? (
            <ReviewCardLoader />
          ) : dataByCategory && dataByCategory.length > 0 ? (
            <Slider {...best__verified__companies} className="">
              {dataByCategory?.map((review, key) => (
                <CompanyReviewBox data={review} key={key} />
              ))}
            </Slider>
          ) : (
            <NoDataFound />
          )}
        </div>
      </div>
      <div className="top__verifiedbanks">
        <div className="container">{category && <h2 className="big_margin text-center"> Top Verified {category && category?.name && category[1].name}</h2>}</div>
        {loading ? (
          <ReviewCardLoader />
        ) : data && data.length > 0 ? (
          <Slider {...top__verifiedbanks}>
            {data.map((review, key) => (
              <CompanyReviewBox data={review} key={key} />
            ))}
          </Slider>
        ) : (
          <NoDataFound />
        )}
      </div>
    </section>
  );
};

export default BestVerifiedCompanies;
