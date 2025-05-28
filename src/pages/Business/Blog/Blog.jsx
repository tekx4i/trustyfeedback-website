import React, { lazy, Suspense, useState, useEffect } from "react";
import "./Blog.scss";
import Loader from "../../../Shared/Loader/Loader";
import NoDataFound from "../../../Shared/NoDataFound/NoDataFound";
import BlogLoader from "../../../Shared/Loader/Blog/Blog";
import { REACT_APP_API_URL } from "../../../constants/constants";
import { apiGet } from "../../../services/userAuth";
import ReviewCardLoader from "../../../Shared/Loader/Home/ReviewCardLoader";
import Pagination from "../../../Shared/Pagination/Pagination";
import { useParams, useSearchParams } from "react-router-dom";
import useSEO from "../../../helper/SEOHelper";
import SEO from "../../../Shared/SEO/SEO";
const FloatingBlog = lazy(() => import("../../../Shared/FloatingBlogs/FloatingBlogs"));
const BlogBox = lazy(() => import("../../../Shared/BlogBox/BlogBox"));
const BreadCrumb = lazy(() => import("../../../Shared/BreadCrumb/BreadCrumb"));
const BusinessPagination = lazy(() => import("../../../Shared/BusinessPagination/BusinessPagination"));
const FooterReuestDemoCta = lazy(() => import("../../../Shared/FooterReuestDemoCta/FooterReuestDemoCta"));

const Blog = () => {
  const [loading, setLoading] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const [categoryLoading, setCategoryLoading] = useState();
  const [featureData, setFeatureData] = useState([]);
  const [category, setCategory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [blogs, setBlogs] = useState([]);
  const [activeButton, setActiveButton] = useState(0);
  const [selectedId, setSelectedId] = useState();
  const [featureId, setFeatureId] = useState();
  const [selectedName, setSelectedName] = useState();
  const [totalPage, setTotalPage] = useState(0);
  const [pShow, setPshow] = useState(1);
  const [tRecords, setTRecords] = useState();
  const { id } = useParams();
  const [pagePagination, setPagePagination] = useState(searchParams.get("page") ? parseInt(searchParams.get("page")) : 1);
  const { data } = useSEO(`${REACT_APP_API_URL}page/single/?url=business/blog`);

  const getBlogs = async () => {
    setLoading(true);
    setBlogs([]);
    try {
      const URL = `${REACT_APP_API_URL}blog`;
      const params = {
        category_id: selectedId,
        limit: pShow,
        page: searchParams.get("page") ? parseInt(searchParams.get("page")) : 1,
      };

      const response = await apiGet(URL, params);
      if (response.success === true) {
        const dbValues = response.data.payload.records;
        setBlogs(dbValues);
        setTotalPage(response?.data?.payload?.totalPages);
        setTRecords(response?.data?.payload?.totalRecords);
        setCategoryLoading(false);
      }
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const getCategories = async () => {
    setCategoryLoading(true);
    try {
      const URL = `${REACT_APP_API_URL}blog/category`;
      const params = {};
      const response = await apiGet(URL, params);
      if (response.success === true) {
        const dbValues = response.data.payload.records;
        setCategory(dbValues);
        setCategoryLoading(false);
      }
    } catch (error) {
      setCategoryLoading(false);
    } finally {
      setCategoryLoading(false);
    }
  };

  const getFeatureBlogs = async () => {
    setLoading(true);
    try {
      const URL = `${REACT_APP_API_URL}blog`;
      const params = {
        category_id: featureId,
      };
      const response = await apiGet(URL, params);
      if (response.success === true) {
        const dbValues = response.data.payload.records;
        setFeatureData(dbValues);
        setCategoryLoading(false);
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

  useEffect(() => {
    if (featureId) {
      getFeatureBlogs();
    }
  }, [featureId]);

  useEffect(() => {
    if (selectedId) {
      getBlogs();
    }
  }, [selectedId, pagePagination]);

  useEffect(() => {
    if (category.length > 0) {
      const foundCategory = category?.find((cat) => cat.id == id);

      if (foundCategory) {
        setSelectedId(foundCategory.id);
        setFeatureId(category[0].id);
        setSelectedName(foundCategory.name);
        setActiveButton(category.indexOf(foundCategory));
      } else {
        setSelectedId(category[0].id);
        setFeatureId(category[0].id);
        setSelectedName(category[0].name);
        setActiveButton(0);
      }
    }
  }, [category, id]);

  const handleButtonClick = (index, id, name) => {
    setActiveButton(index);
    setSelectedId(id); // Directly use the passed `id`
    setSelectedName(name);
    setSearchParams(); // Clear search params for fresh pagination
    setPagePagination(1); // Reset to the first page
  };

  return (
    <Suspense fallback={<Loader />}>
      <SEO title={data?.meta_title || "TrustyFeedback"} description={data?.meta_description} keywords="TrustyFeedback" />
      <div className="our__blog__page">
        <section className="page___banner fill__sec">
          <div className="container text-center clr__white banner__breadcrumb breadcrumb__center">
            <BreadCrumb active="Customer Stories" extra={"Resources"} />
            <h1 className="mb-0">Our Blogs</h1>
          </div>
        </section>
        {/* <section className="select___filterarea sec__padding">
          <div className="container">
            <h3 className="text-center">Join 980,000+ companies and brands using Trustpilot now!</h3>
            <div className="s__filter__wrap mx-auto">
              <select name="" id="">
                <option value="">Choose Industry</option>
                {category && category.length > 0 && category.map((item) => <option value={item.id}>{item.name}</option>)}
              </select>
            </div>
          </div>
        </section> */}
        <section className="filter__bar sec__padding">
          <div className="container">
            <div className="filter__wrap scrollable-0">
              {category?.map((items, index) => (
                <button key={index} className={activeButton === index ? "active" : ""} onClick={() => handleButtonClick(index, items.id, items.name)}>
                  {items?.name}
                </button>
              ))}
            </div>
          </div>
        </section>
        <section className="floating__blogs ">
          <div className="container">
            <h2 className="big_margin">Featured articles</h2>
            <div className="f__blogs__wrap clearfix">{loading ? <BlogLoader /> : featureData && featureData.length > 0 ? featureData.slice(0, 4).map((item, key) => <FloatingBlog business={"business"} data={item} key={key} />) : <NoDataFound />}</div>
          </div>
        </section>
        <section className="get__from__search sec__padding">
          <div className="container">
            <h2>{selectedName && selectedName}</h2>

            {loading ? <ReviewCardLoader /> : <div className="row gap-30">{blogs && blogs.length > 0 ? blogs.map((item, key) => <BlogBox data={item} key={key} extraClass="col-lg-4 col-sm-6" />) : <p>No data available.</p>}</div>}

            {blogs && blogs.length === 0 ? "" : <div className="d-flex justify-content-center pagination__wrap">{tRecords > pShow ? <Pagination total={totalPage} page={pagePagination} setPage={setPagePagination} perPage={pShow} last_page={totalPage} /> : ""}</div>}
          </div>
        </section>
        <FooterReuestDemoCta />
      </div>
    </Suspense>
  );
};

export default Blog;
