import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "./LookingFor.scss";
import { ReactSVG } from "react-svg";
import { responsiveDesign, rightarrow, rightarrow_hover, dummyImg } from "../../../../constants/allSVG";
import { IMG_URL, REACT_APP_API_URL } from "../../../../constants/constants";
import { apiGet } from "../../../../services/userAuth";
import PlaceholderImg from "../../../../Shared/PlaceholderImg/PlaceholderImg";
import NoDataFound from "../../../../Shared/NoDataFound/NoDataFound";
import { Link } from "react-router-dom";
import LookingForLoader from "../../../../Shared/Loader/Home/LookingForLoader";

const LookingFor = () => {
  const [isHover, setIsHover] = useState(false);
  const [loading, setLoading] = useState();
  const [data, setData] = useState([]);

  const settings = {
    infinite: true,
    speed: 10000,
    variableWidth: true,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    arrows: false,
    centerMode: true,
    dots: false,
    pauseOnHover: false,
    centerPadding: "100px",
  };

  const getCategories = async () => {
    setLoading(true);
    try {
      const URL = `${REACT_APP_API_URL}category`;
      const params = {
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

  const handleHover = () => {
    setIsHover((prev) => !prev);
  };

  return (
    <section className="what__looking__for position-relative">
      <div className="container">
        <div className="what__looking__head">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h2 className="mb-0">What you are looking for?</h2>
            </div>
            <div className="col-md-6 text-end">
              <Link to="/categories" className="default__btn transparent__btn" onMouseEnter={handleHover} onMouseLeave={handleHover}>
                <span>See More</span>{" "}
                <span className="btn__icon">
                  <ReactSVG src={isHover ? rightarrow_hover : rightarrow} />
                </span>{" "}
              </Link>
            </div>
          </div>
        </div>
      </div>
      {loading ? (
        <LookingForLoader />
      ) : data && data.length > 0 ? (
        <div className="services__boxes text-center">
          <Slider {...settings}>
            {data &&
              data.map((item, key) => (
                <div key={key} className="services__box__slide">
                  <div className="single__service__box">
                    <Link to={`/listing/${item.id}/${item?.name}`}>
                      <div className="service__icon">
                        {/* <ReactSVG src={responsiveDesign} /> */}
                        {item?.image ? <img src={IMG_URL + item.image} /> : <PlaceholderImg />}
                      </div>
                      <h5 className="mb-0">
                        {item?.name.substr(0, 12)}
                        {item.name.length > 12 && ".."}
                      </h5>
                    </Link>
                  </div>
                </div>
              ))}
          </Slider>
        </div>
      ) : (
        <NoDataFound />
      )}
    </section>
  );
};

export default LookingFor;
