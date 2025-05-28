import React, { useState, useEffect } from "react";
import { ReactSVG } from "react-svg";
import Select from "react-select";
import { FiSearch, FiInfo } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import "./Filters.scss";
import RatingStar from "../../../../assets/Dashboard/RatingStar_01.svg";
import ReactCountryDropdown from "react-country-dropdown";

// Helper function to get query params
const getQueryParams = (search) => {
  const params = new URLSearchParams(search);
  return {
    rating: params.get("rating") || null,
    countries: params.get("countries") ? params.get("countries").split(",") : [],
    city: params.get("city") || "",
    timeRange: params.get("timeRange") || "",
    verified: params.get("verified") === "true",
    claimed: params.get("claimed") === "true",
    categories: params.get("categories") ? params.get("categories").split(",") : [],
  };
};

const Filters = () => {
  const ratingFilter = [{ name: "any" }, { name: "3.0+", icon: RatingStar }, { name: "4.0+", icon: RatingStar }, { name: "4.5+", icon: RatingStar }];

  const options = [
    { value: "United States", label: "United States" },
    { value: "UK", label: "UK" },
    { value: "South Africa", label: "South Africa" },
  ];

  const categories = ["Animal", "Cats & Dogs", "Pet Stores", "Horses & Riding", "Animal Parks & Zoo"]; // Define available categories

  const { search } = useLocation();
  const navigate = useNavigate();

  // Get query params from URL
  const queryParams = getQueryParams(search);

  const [ratingSelect, setRatingSelect] = useState(queryParams.rating);
  const [selectedCountries, setSelectedCountries] = useState(queryParams.countries);
  const [city, setCity] = useState(queryParams.city);
  const [timeRange, setTimeRange] = useState(queryParams.timeRange);
  const [verified, setVerified] = useState(queryParams.verified);
  const [claimed, setClaimed] = useState(queryParams.claimed);
  const [selectedCategories, setSelectedCategories] = useState(queryParams.categories);

  useEffect(() => {
    const params = new URLSearchParams();

    if (ratingSelect) params.set("rating", ratingSelect);
    if (selectedCountries.length > 0) params.set("countries", selectedCountries.join(","));
    if (city) params.set("city", city);
    if (timeRange) params.set("timeRange", timeRange);
    if (verified) params.set("verified", "true");
    if (claimed) params.set("claimed", "true");
    if (selectedCategories.length > 0) params.set("categories", selectedCategories.join(","));

    navigate(`?${params.toString()}`, { replace: true });
  }, [ratingSelect, selectedCountries, city, timeRange, verified, claimed, selectedCategories, navigate]);

  const toggleCategory = (category) => {
    setSelectedCategories((prevCategories) => {
      if (prevCategories.includes(category)) {
        return prevCategories.filter((item) => item !== category);
      } else {
        return [...prevCategories, category];
      }
    });
  };

  return (
    <div className="filters">
      <div className="d-flex justify-content-between">
        <h5>Filters</h5>
        <button
          className="btn p-0 clear-filter"
          onClick={() => {
            setRatingSelect(null);
            setSelectedCountries([]);
            setCity("");
            setTimeRange("");
            setVerified(false);
            setClaimed(false);
            setSelectedCategories([]);
          }}
        >
          Clear all filters
        </button>
      </div>
      <hr className="my-3 border-secondary" />

      <div className="rating__filter">
        {ratingFilter?.map((item, key) => (
          <button className={`rating-btn ${item.name === ratingSelect ? "selected" : ""}`} key={key} onClick={() => setRatingSelect(item.name === ratingSelect ? null : item.name)}>
            {item?.name} {item?.icon && <ReactSVG src={item.icon} />}
          </button>
        ))}
      </div>

      <hr className="my-3 border-secondary" />

      <div className="search__select__filter">
        <ReactCountryDropdown
          defaultCountry="US"
          onSelect={(country) => {
            setSelectedCountries([country.name]);
          }}
        />

        <div className="d-flex position-relative">
          <div className="icon-of-input">
            <FiSearch />
          </div>
          <input className="icon-input" placeholder="City or ZipCode" value={city} onChange={(e) => setCity(e.target.value)} />
        </div>
      </div>

      <div className="time__range__select">
        <label>Time Range</label>
        <Select placeholder="Select Time" isMulti options={options} value={options.filter((option) => option.value === timeRange)} onChange={(selected) => setTimeRange(selected ? selected[0]?.value : "")} className="basic-multi-select" classNamePrefix="select" />
      </div>

      <div className="checkbox__filter">
        <div className="single__checkbox__filter">
          <label className="form-check-label align-self-center mb-0" htmlFor="flexCheckDefault">
            Verified <FiInfo color="#828282" />
          </label>
          <input className="check-box-ctm" type="checkbox" checked={verified} onChange={() => setVerified(!verified)} id="flexCheckDefault" />
        </div>
        <div className="single__checkbox__filter">
          <label className="form-check-label align-self-center mb-0" htmlFor="flexCheckDefault">
            Claimed <FiInfo color="#828282" />
          </label>
          <input className="check-box-ctm" type="checkbox" checked={claimed} onChange={() => setClaimed(!claimed)} id="flexCheckDefault" />
        </div>
      </div>

      <div className="filter__tags">
        {categories?.map((category) => (
          <button key={category} className={`btn__tags ${selectedCategories.includes(category) ? "selected" : ""}`} onClick={() => toggleCategory(category)}>
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Filters;
