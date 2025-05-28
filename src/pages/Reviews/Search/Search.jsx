import React, { useState, useEffect, useRef } from "react";
import { ReactSVG } from "react-svg";
import categoryIcon from "../../../assets/category.svg";
import arrowDown from "../../../assets/arrow-down.svg";
import searchIcon from "../../../assets/search.svg";
import "./Search.scss";
import useDebounce from "../../../Shared/SearchWithCategory/useDebounce";
import { apiGet } from "../../../services/userAuth";
import { IMG_URL, REACT_APP_API_URL } from "../../../constants/constants";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import PlaceholderImg from "../../../Shared/PlaceholderImg/PlaceholderImg";
import SearchCard from "../../../Shared/Loader/SearchLoader";
import CompanyReviewBox from "../CompanyReviewBox/CompanyReviewBox";
import NoDataFound from "../../../Shared/NoDataFound/NoDataFound";
import Slider from "react-slick";
import Pagination from "../../../Shared/Pagination/Pagination";
import ReviewCardLoader from "../../../Shared/Loader/SingleCardLoader";
import { useCloseDropDown } from "../../../hooks/useDropDownCloser";

const SearchWithCategory = ({ width, select, setSelect }) => {
  const settings = {
    infinite: false,
    variableWidth: true,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    cssEase: "linear",
    arrows: false,
    dots: true,
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

  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCatId, setSelectedCatId] = useState(select?.category_id || null);
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
  const [getData, setGetData] = useState([]);
  const [searchParams] = useSearchParams();
  const [totalPage, setTotalPage] = useState(0);
  const [totalData, setTotalData] = useState(0);
  const [pagePagination, setPagePagination] = useState(searchParams.get("page") ? parseInt(searchParams.get("page")) : 1);
  const [pShow, setPshow] = useState(3);
  const [plusItem, setPlusItem] = useState(0);
  const [page, setPage] = useState();
  const dropdownRef = useCloseDropDown(() => setShow(false));
  const [tRecords, setTRecords] = useState();

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

  useEffect(() => {
    getListing();
  }, [searchParams, pagePagination, selectedCatId]);

  // Get all business listings based on search term
  const getListing = async (term) => {
    if (term || selectedCategory || select?.business_id) {
      setSearchLoading(true);
      try {
        let url = `${REACT_APP_API_URL}business`;
        const params = {
          name: term,
          category: selectedCatId,
          business_id: select?.business_id,
          limit: pShow,
          page: searchParams.get("page") ? parseInt(searchParams.get("page")) : 1,
        };
        const response = await apiGet(url, params);
        setNoData(response);
        if (response.success === true) {
          const dbValues = response?.data?.payload;
          setSuggestions(response.data.payload.records);
          setTotalPage(dbValues?.totalPages);
          setTotalData(dbValues?.totalRecords);
          setPlusItem(dbValues?.query?.limit);
          setPage(dbValues?.query?.page);
          setShowSuggestions(true);
          setTRecords(dbValues.totalRecords);
        } else {
          setSuggestions([]);
        }
      } catch (error) {
        console.error(error);
        setSuggestions([]);
      } finally {
        setSearchLoading(false);
      }
    }
  };

  const handleSearchSubmit = () => {
    if (!selectedCatId || !selectedCategory) {
      alert("Please select a category before searching.");
      return;
    }
    getListing();
  };

  const handleBlur = () => {
    setTimeout(() => setShowSuggestions(false), 200);
  };

  // get All business
  const getAllBusiness = async () => {
    const params = {
      limit: 12,
    };
    try {
      const URL = `${REACT_APP_API_URL}business`;
      const response = await apiGet(URL, params);
      if (response.success === true) {
        const dbValues = response?.data?.payload;
        setGetData(dbValues?.records);
      } else {
      }
    } catch (error) {
      console.error("Error fetching blog details:", error);
    } finally {
    }
  };

  // useEffect(() => {
  //   getAllBusiness();
  // }, []);

  useEffect(() => {
    if (select?.category_id) {
      setSelectedCatId(select.category_id);
      const category = data.find((cat) => cat.id === select.category_id);
      if (category) {
        setSelectedCategory(category.name);
      }
    }
    if (select?.business_id) {
      setSearchTerm("");
    }
  }, [select?.category_id, select?.business_id, data]);

  return (
    <div className="position-relative" id="review-search">
      {!selectedCategory && <p className="text-danger mt-2">Please select a category to enable the search.</p>}

      <div className={`${width ? width : ""} mb-4 categories__search__box d-flex align-items-center position-relative`}>
        <div ref={dropdownRef} className="all__categories">
          <button
            onClick={() => {
              setSelect("");
              setShow(!show);
            }}
            className={`show__category d-flex align-items-center ${show ? "active" : ""}`}
          >
            <ReactSVG src={categoryIcon} /> {selectedCategory ? selectedCategory.slice(0, 6) : "Category"}
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
                <li className={item?.name === selectedCategory ? "text-primary" : ""} type="button" key={item.id} onClick={() => handleCategoryClick(item.name, item.id)}>
                  {item?.name}
                </li>
              ))
            )}
          </ul>
        </div>

        <div className="search-box d-flex align-items-center w-100 gap-1">
          <input type="search" placeholder="Search business" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onFocus={() => setShowSuggestions(true)} onBlur={handleBlur} disabled={!selectedCatId} />
          <button disabled={!selectedCatId} type="button" className="flex justify-center items-center search__btn" onClick={handleSearchSubmit}>
            <ReactSVG src={searchIcon} />
          </button>
        </div>
      </div>

      {suggestions.length > 0 && <p>{suggestions ? "Note : Please select any business!" : ""} </p>}
      <div className="row">
        {searchLoading ? (
          [1, 2, 3].map((_, index) => (
            <div className="col-sm-4 mb-3" key={index}>
              <ReviewCardLoader />
            </div>
          ))
        ) : selectedCatId && suggestions.length === 0 ? (
          <NoDataFound message="No businesses found in this category" />
        ) : (
          suggestions.length > 0 &&
          suggestions?.map((suggestion, key) => (
            <div
              onClick={() => {
                setSelect({ business_id: suggestion.id, category_id: selectedCatId });
                window.scrollBy({
                  top: 400,
                  behavior: "smooth",
                });
              }}
              key={suggestion.id}
              className="col-sm-4 mb-3"
            >
              <CompanyReviewBox select={select} data={suggestion} key={key} />
            </div>
          ))
        )}
      </div>
      <div className="d-flex justify-content-center  filter__pagi_wrap">{suggestions.length > 0 && <div className="my-5"> {tRecords > pShow ? <Pagination total={totalPage} page={pagePagination} setPage={setPagePagination} perPage={pShow} last_page={totalPage} /> : ""}</div>}</div>
    </div>
  );
};

export default SearchWithCategory;
