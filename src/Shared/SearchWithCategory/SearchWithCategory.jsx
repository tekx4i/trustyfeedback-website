import React, { useState, useEffect, useRef } from "react";
import { ReactSVG } from "react-svg";
import categoryIcon from "../../assets/category.svg";
import arrowDown from "../../assets/arrow-down.svg";
import searchIcon from "../../assets/search.svg";
import "./SearchWithCategory.scss";
import useDebounce from "./useDebounce";
import { apiGet } from "../../services/userAuth";
import { IMG_URL, REACT_APP_API_URL } from "../../constants/constants";
import { Link, useNavigate } from "react-router-dom";
import PlaceholderImg from "../../Shared/PlaceholderImg/PlaceholderImg";
import SearchCard from "../Loader/SearchLoader";
import { useCloseDropDown } from "../../hooks/useDropDownCloser";
import RatingStar from "../../assets/RatingStar_0.svg";

const SearchWithCategory = ({ width }) => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Category");
  const [selectedCatId, setSelectedCatId] = useState();

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
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleCategoryClick = (categoryName, id) => {
    setSelectedCategory(categoryName);
    setSelectedCatId(id);
    setShow(false);
  };

  // Search all functions and states
  const [whileSearch, setWhileSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [noData, setNoData] = useState();
  const dropdownRef = useCloseDropDown(() => setShow(false));

  useEffect(() => {
    if (debouncedSearchTerm.length > 2) {
      setWhileSearch(true);
      getListing(debouncedSearchTerm);
    } else {
      setSuggestions([]);
      setWhileSearch(false);
      setShowSuggestions(false);
    }
  }, [debouncedSearchTerm]);

  // Get all business listings based on search term
  const getListing = async (term) => {
    setSearchLoading(true);

    try {
      let url = `${REACT_APP_API_URL}business`;
      const params = { name: term, category: selectedCatId };
      const response = await apiGet(url, params);
      setNoData(response);
      if (response.success === true) {
        setSuggestions(response.data.payload.records);
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error(error);
      setSuggestions([]);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleSearchSubmit = () => {
    // if (searchTerm) {
    //   getListing(searchTerm);
    //   setSearchTerm("");
    // }
    if (selectedCatId && selectedCategory) {
      navigate(`/listing/${selectedCatId}/${selectedCategory}`);
    }
  };

  const handleBlur = () => {
    setTimeout(() => setShowSuggestions(false), 200);
  };

  // Function to highlight matched text
  const highlightMatch = (text, match) => {
    if (!match) return text;

    const regex = new RegExp(`(${match})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, index) =>
      part.toLowerCase() === match.toLowerCase() ? (
        <span key={index} style={{ color: "var(--blue)" }}>
          {part}
        </span>
      ) : (
        part
      ),
    );
  };

  return (
    <div className="position-relative">
      <div className={`${width ? width : ""} categories__search__box d-flex align-items-center position-relative`}>
        <div id="search" ref={dropdownRef} className="all__categories">
          <button onClick={() => setShow(!show)} className={`show__category d-flex align-items-center ${show ? "active" : ""}`}>
            <ReactSVG src={categoryIcon} /> {selectedCategory ? selectedCategory.slice(0, 6) : ""}
            {selectedCategory.length > 6 ? ".." : ""}
            <span>
              <ReactSVG src={arrowDown} />
            </span>
          </button>
          <ul className={`categories__dropdown ${show ? "active" : "inactive"}`}>
            {loading ? (
              <li>Loading...</li>
            ) : (
              data &&
              data.map((item) => (
                <li className={item.name === selectedCategory ? "text-primary" : ""} type="button" key={item.id} onClick={() => handleCategoryClick(item.name, item.id)}>
                  {item.name}
                </li>
              ))
            )}
          </ul>
        </div>

        <div className="search-box d-flex align-items-center w-100 gap-1">
          <input type="search" placeholder="Search business" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onFocus={() => setShowSuggestions(true)} onBlur={handleBlur} />
          <button disabled={selectedCatId ? false : true} type="button" className="flex justify-center items-center search__btn" onClick={handleSearchSubmit}>
            <ReactSVG src={searchIcon} />
          </button>
        </div>
      </div>

      {showSuggestions && searchTerm && (
        <div className="suggestions-box">
          {searchLoading ? (
            <SearchCard />
          ) : suggestions.length > 0 ? (
            suggestions.map((suggestion) => (
              <Link to={`/listing/listing-detail/${suggestion.id}`} key={suggestion.id} className="suggestion-item">
                <div className="d-flex justify-content-between align-items-center ">
                  <div className="d-flex align-items-center">
                    <div className="me-1">{suggestion.image ? <img src={IMG_URL + suggestion.image} alt="Suggestion" /> : <PlaceholderImg />}</div>
                    <div>
                      <span className="mb-1">{highlightMatch(suggestion.name, searchTerm)}</span>
                      <p style={{ fontSize: 16 }} className="mb-0 text-muted">
                        {suggestion.website}
                      </p>
                    </div>
                  </div>
                  <div className="badge d-flex align-items-center gap-2" style={{ background: "#c2cbf9", color: "black", padding: "0.5rem 0.75rem", borderRadius: "12px" }}>
                    <ReactSVG src={RatingStar} style={{ width: "20px", height: "20px" }} />
                    <span className="fw-bold">{suggestion?.rating ? parseFloat(suggestion.rating.toFixed(1)) : "0.0"}</span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="no-data-found">No results found</div>
          )}
          {noData && noData.length === 0 && <div className="no-data-found">No results found</div>}
        </div>
      )}
    </div>
  );
};

export default SearchWithCategory;
