import React, { lazy, Suspense, useState, useEffect } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { ReactSVG } from "react-svg";
import "./DashboardAllBusiness.scss";
import Breadcrumb from "../../../../Shared/BreadCrumb/BreadCrumb";
import rightarrow from "../../../../assets/btn-arrow.svg";
import Loader from "../../../../Shared/Loader/Loader";
import { REACT_APP_API_URL } from "../../../../constants/constants";
import { apiGet } from "../../../../services/userAuth";
import BlogDetailLoader from "../../../../Shared/Loader/BlogDetailLoader/BlogDetailLoader";
import NoDataFound from "../../../../Shared/NoDataFound/NoDataFound";
import ReactCountryDropdown from "react-country-dropdown";
import Select from "react-select";
import { FiSearch, FiInfo } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import RatingStar from "../../../../assets/Dashboard/RatingStar_01.svg";
import "../../../SingleCategoryConsumer/Components/Filters/Filters.scss";
const CategoryCard = lazy(() => import("../../../SingleCategoryConsumer/Components/FilterCategoryCard/FilterCategoryCard"));
const ReviewMainBox = lazy(() => import("../../../../Shared/ReviewMainBox/ReviewMainBox"));
const Pagination = lazy(() => import("../../../../Shared/Pagination/Pagination"));
// const PopularSearch = lazy(() => import("./Components/PoppularSearch/PoppularSearch"));

// Helper function to get query params
const getQueryParams = (search) => {
  const params = new URLSearchParams(search);
  return {
    rating: params.get("rating") || null,
    countries: params.get("countries") ? params.get("countries").split(",") : [],
    city: params.get("city") || "",
    verified: params.get("verified") === "true",
    categories: params.get("categories") ? params.get("categories").split(",") : [],
  };
};

const SingleCategoryConsumer = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState();
  const [searchParams] = useSearchParams();
  const [totalPage, setTotalPage] = useState(0);
  const [totalData, setTotalData] = useState(0);
  const [pagePagination, setPagePagination] = useState(searchParams.get("page") ? parseInt(searchParams.get("page")) : 1);
  const [pShow, setPshow] = useState(5);
  const [tRecords, setTRecords] = useState();
  const [plusItem, setPlusItem] = useState(0);
  const [page, setPage] = useState();
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState();
  const { id, name } = useParams();

  // filters
  const { search } = useLocation();
  const queryParams = getQueryParams(search);
  const [ratingSelect, setRatingSelect] = useState(queryParams.rating);
  const [selectedCountries, setSelectedCountries] = useState(queryParams.countries);
  const [city, setCity] = useState(queryParams.city);
  const [verified, setVerified] = useState(queryParams.verified);
  const [selectedCategories, setSelectedCategories] = useState(queryParams.categories);
  const [newCat, setNewCat] = useState([]);

  // Add state for sorting
  const [sortBy, setSortBy] = useState("relevant");

  const formatNameWithSpaces = (str) => {
    return str.replace(/[-_]+/g, " ").trim();
  };

  const formattedName = name ? formatNameWithSpaces(name) : "";
  const createSlug = (str) => {
    return str
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const slugName = name ? createSlug(name) : "";
  useEffect(() => {
    setPagePagination(1);
  }, [id]);

  const getAllBusiness = async () => {
    setLoading(true);
    const hasActiveFilters = (ratingSelect && ratingSelect !== "any") || selectedCountries.length > 0 || city || verified || selectedCategories.length > 0;
    const params = {
      ...(!hasActiveFilters && { category: id }),
      limit: pShow,
      page: searchParams.get("page") ? parseInt(searchParams.get("page")) : 1,
      ...(ratingSelect && ratingSelect !== "any" && { rating: ratingSelect }),
      ...(selectedCountries.length > 0 && { country: selectedCountries.join(",") }),
      ...(city && { postal_code: city }),
      ...(verified && { verified_status: verified }),
      ...(selectedCategories.length > 0 && { categories: selectedCategories.join(",") }),
      sort: sortBy === "rating" ? "rating:desc" : "created_at:desc",
    };
    try {
      const URL = `${REACT_APP_API_URL}business`;
      const response = await apiGet(URL, params);

      if (!response.success || response.status === 404) {
        setData([]);
        setTotalPage(0);
        setTotalData(0);
        setPlusItem(0);
        setPage(1);
        setTRecords(0);
        return;
      }

      const dbValues = response?.data?.payload;
      setData(dbValues?.records);
      setTotalPage(dbValues?.totalPages);
      setTotalData(dbValues?.totalRecords);
      setPlusItem(dbValues?.query?.limit);
      setPage(dbValues?.query?.page);
      setTRecords(dbValues?.totalRecords);
      // navigate(`/listing/${id}/${slugName}`, { replace: true });
    } catch (error) {
      console.error("Error fetching blog details:", error);
      // Clear all data on error
      setData([]);
      setTotalPage(0);
      setTotalData(0);
      setPlusItem(0);
      setPage(1);
      setTRecords(0);
    } finally {
      setLoading(false);
    }
  };

  const getCategoriesData = async () => {
    setReviewsLoading(true);
    const params = {
      parent_id: id,
      limit: 8,
      sort: "created_at:desc",
    };
    try {
      const URL = `${REACT_APP_API_URL}category`;
      const response = await apiGet(URL, params);
      if (response.success === true) {
        const dbValues = response?.data?.payload.records;
        setNewCat(dbValues);
      } else {
      }
    } catch (error) {
      console.error("Error fetching blog details:", error);
    } finally {
      setReviewsLoading(false);
    }
  };

  const getReviews = async () => {
    setReviewsLoading(true);
    const params = {
      limit: 3,
      sort: "created_at:desc",
    };
    try {
      const URL = `${REACT_APP_API_URL}review`;
      const response = await apiGet(URL, params);
      if (response.success === true) {
        const dbValues = response?.data?.payload.records;
        setReviews(dbValues);
        setReviewsLoading(false);
      } else {
      }
    } catch (error) {
      console.error("Error fetching blog details:", error);
    } finally {
      setReviewsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getCategoriesData();
    }
    getReviews();
  }, [id]);

  useEffect(() => {
    getAllBusiness();
  }, [searchParams, pagePagination, id, sortBy]);
  // ================================================
  const ratingFilter = [{ name: "any" }, { name: "3.0", icon: RatingStar }, { name: "4.0", icon: RatingStar }, { name: "4.5", icon: RatingStar }];

  const options = [
    { value: "United States", label: "United States" },
    { value: "UK", label: "UK" },
    { value: "South Africa", label: "South Africa" },
  ];

  // Get query params from URL

  useEffect(() => {
    const params = new URLSearchParams();

    if (ratingSelect) params.set("rating", ratingSelect);
    if (selectedCountries.length > 0) params.set("countries", selectedCountries.join(","));
    if (city) params.set("city", city);
    if (verified) params.set("verified", "ACTIVE");
    if (selectedCategories.length > 0) params.set("categories", selectedCategories.join(","));

    navigate(`?${params.toString()}`, { replace: true });
  }, [ratingSelect, selectedCountries, city, verified, selectedCategories, navigate]);

  const toggleCategory = (categoryId) => {
    setSelectedCategories((prevCategories) => {
      if (prevCategories.includes(categoryId)) {
        return prevCategories.filter((item) => item !== categoryId);
      } else {
        return [...prevCategories, categoryId];
      }
    });
  };

  return (
    <div id="dashboard_listing">
      <Suspense fallback={<Loader />}>
        <main className="single__category__page">
          <div className="">
            <div className="bg_circle_one"></div>
            <div className="bg_circle_two"></div>
            <div className="bg_circle_three"></div>
            <div className="bg_circle_four"></div>
          </div>

          <section className="all__cat__lists__wrap">
            <div className="container">
              <div className="row">
                <div className="col-lg-8">
                  <div className="filter__sorting__area">
                    <div className="d-flex justify-content-between align-items-center">
                      {formattedName && (
                        <h3 id="title" style={{ fontSize: "24px" }} className="text-capitalize">
                          Best in {formattedName}
                        </h3>
                      )}

                      <div id="result" className="sort__by">
                        <div className="total__result__count">
                          <span> {totalData} results</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="all__filter__results">
                    {loading ? (
                      <BlogDetailLoader />
                    ) : data && data.length > 0 ? (
                      data.map((item, key) => <CategoryCard dashboard_layout={true} data={item} key={key} />)
                    ) : (
                      <>
                        <NoDataFound />
                        <h4 className="text-center">No data found!</h4>
                      </>
                    )}
                  </div>
                  <div className="d-flex justify-content-center my-5 filter__pagi_wrap">{tRecords > pShow ? <Pagination total={totalPage} page={pagePagination} setPage={setPagePagination} perPage={pShow} last_page={totalPage} /> : ""}</div>
                </div>
                <div className="col-lg-4">
                  <div className="filters">
                    <div className="d-flex justify-content-between">
                      <h5>Filters</h5>
                      <button
                        className="btn p-0 clear-filter"
                        onClick={() => {
                          setRatingSelect(null);
                          setSelectedCountries([]);
                          setCity("");
                          setVerified(false);
                          setNewCat([]);
                        }}
                      >
                        Clear all filters
                      </button>
                    </div>
                    <hr className="my-3 border-secondary" />

                    <div className="rating__filter">
                      {ratingFilter.map((item, key) => (
                        <button className={`rating-btn ${item.name === ratingSelect ? "selected" : ""}`} key={key} onClick={() => setRatingSelect(item.name === ratingSelect ? null : item.name)}>
                          {item.name}
                          {item.name === "any" ? "" : "+"} {item.icon && <ReactSVG src={item.icon} />}
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

                    <div className="checkbox__filter">
                      <div className="single__checkbox__filter">
                        <label className="form-check-label align-self-center mb-0" htmlFor="flexCheckDefault">
                          Verified <FiInfo color="#828282" />
                        </label>
                        <input className="check-box-ctm" type="checkbox" checked={verified} onChange={() => setVerified(!verified)} id="flexCheckDefault" />
                      </div>
                    </div>

                    <div className="filter__tags">
                      {newCat.map((category) => (
                        <button key={category.id} className={`btn__tags ${selectedCategories.includes(category.id) ? "selected" : ""}`} onClick={() => toggleCategory(category.id)}>
                          {category.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </Suspense>
    </div>
  );
};

export default SingleCategoryConsumer;
