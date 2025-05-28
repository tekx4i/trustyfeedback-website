import React, { lazy, Suspense, useState, useEffect } from "react";
import "./Stories.scss";
import Loader from "../../../Shared/Loader/Loader";
import NoDataFound from "../../../Shared/NoDataFound/NoDataFound";
import BlogLoader from "../../../Shared/Loader/Blog/Blog";
import { REACT_APP_API_URL } from "../../../constants/constants";
import { apiGet } from "../../../services/userAuth";
import ReviewCardLoader from "../../../Shared/Loader/Home/ReviewCardLoader";
import Pagination from "../../../Shared/Pagination/Pagination";
import { useSearchParams } from "react-router-dom";
const FloatingBlog = lazy(() => import("../../../Shared/FloatingBlogs/FloatingBlogs"));
const BlogBox = lazy(() => import("../../../Shared/BlogBox/BlogBox"));
const BreadCrumb = lazy(() => import("../../../Shared/BreadCrumb/BreadCrumb"));
const BusinessPagination = lazy(() => import("../../../Shared/BusinessPagination/BusinessPagination"));
const FooterReuestDemoCta = lazy(() => import("../../../Shared/FooterReuestDemoCta/FooterReuestDemoCta"));

const Blog = () => {
  const [loading, setLoading] = useState();
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalPage, setTotalPage] = useState(0);
  const [pagePagination, setPagePagination] = useState(searchParams.get("page") ? parseInt(searchParams.get("page")) : 1);
  const [pShow] = useState(12);
  const [tRecords, setTRecords] = useState();

  const getStories = async () => {
    setLoading(true);
    try {
      const URL = `${REACT_APP_API_URL}story`;
      const params = {
        limit: 4,
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

  const getAllStories = async () => {
    setLoading(true);
    try {
      const URL = `${REACT_APP_API_URL}story`;
      const params = {
        limit: pShow,
        page: pagePagination,
      };
      const response = await apiGet(URL, params);
      if (response.success === true) {
        const dbValues = response.data.payload.records;
        setAllData(dbValues);
        setTotalPage(response?.data?.payload?.totalPages || 0);
        setTRecords(response?.data?.payload?.totalRecords);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  const handlePageChange = (newPage) => {
    setPagePagination(newPage);
    setSearchParams({ page: newPage });
  };

  useEffect(() => {
    getStories();
  }, []);
  useEffect(() => {
    getAllStories();
  }, [pagePagination]);
  return (
    <Suspense fallback={<Loader />}>
      <div className="our__blog__page">
        <section className="page___banner fill__sec">
          <div className="container text-center clr__white banner__breadcrumb breadcrumb__center">
            <BreadCrumb active="Customer Stories" extra={"Resources"} />
            <h1 className="mb-0">Customer Stories</h1>
          </div>
        </section>
        {/* <section className="select___filterarea sec__padding">
          <div className="container">
            <h3 className="text-center">Join 980,000+ companies and brands using Trustpilot now!</h3>
            <div className="s__filter__wrap mx-auto">
              <select name="" id="">
                <option value="">Choose Industry</option>
                <option value="">Choose Industry 1</option>
                <option value="">Choose Industry 2</option>
                <option value="">Choose Industry 3</option>
              </select>
            </div>
          </div>
        </section> */}

        <section className="floating__blogs mt-5">
          <div className="container">
            <h2 className="big_margin">Featured articles</h2>
            <div className="f__blogs__wrap clearfix">{loading ? <BlogLoader /> : data && data.length > 0 ? data.slice(0, 4)?.map((item, key) => <FloatingBlog stories={true} data={item} key={key} />) : <NoDataFound />}</div>
          </div>
        </section>
        <section className="get__from__search sec__padding">
          <div className="container">
            <h2>Get Seen in Search</h2>

            {loading ? <ReviewCardLoader /> : <div className="row gap-30">{allData && allData.length > 0 ? allData.map((item, key) => <BlogBox stories={true} data={item} key={key} extraClass="col-lg-4 col-sm-6" />) : <p>No data available</p>}</div>}
            {/* <div className="d-flex justify-content-center pagination__wrap ">
              <BusinessPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </div> */}
            {tRecords > pShow ? (
              <div className="d-flex justify-content-center">
                <Pagination total={totalPage} page={pagePagination} setPage={handlePageChange} perPage={pShow} last_page={totalPage} />
              </div>
            ) : (
              ""
            )}
          </div>
        </section>
        <FooterReuestDemoCta />
      </div>
    </Suspense>
  );
};

export default Blog;
