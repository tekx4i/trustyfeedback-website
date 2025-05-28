import React, { lazy, Suspense, useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ReactSVG } from "react-svg";
import "./Category.scss";
import Breadcrumb from "../../Shared/BreadCrumb/BreadCrumb";
import SearchWithCategory from "../../Shared/SearchWithCategory/SearchWithCategory";
import rightarrow from "../../assets/btn-arrow.svg";
import Loader from "../../Shared/Loader/Loader";
import NoDataFound from "../../Shared/NoDataFound/NoDataFound";
import { REACT_APP_API_URL } from "../../constants/constants";
import { apiGet } from "../../services/userAuth";
import ReviewsCard from "../../Shared/Loader/ReviewsCard";
import useSEO from "../../helper/SEOHelper";
import SEO from "../../Shared/SEO/SEO";
const CategoryCard = lazy(() => import("./Components/CategoryCard"));
const Pagination = lazy(() => import("../../Shared/Pagination/Pagination"));
const BusinessSearch = lazy(() => import("../../Shared/BusinessSearch/BusinessSearch"));

const Category = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalPage, setTotalPage] = useState(0);
  const [pagePagination, setPagePagination] = useState(searchParams.get("page") ? parseInt(searchParams.get("page")) : 1);
  const [pShow] = useState(12);
  const [tRecords, setTRecords] = useState();
  const { data: SeoData } = useSEO(`${REACT_APP_API_URL}page/single/?url=categories`);

  const getReviews = async () => {
    setLoading(true);
    const params = {
      limit: pShow,
      page: pagePagination,
    };

    try {
      const URL = `${REACT_APP_API_URL}category`;
      const response = await apiGet(URL, params);
      if (response.success) {
        const dbValues = response?.data?.payload.records;
        setData(dbValues);
        setTotalPage(response?.data?.payload?.totalPages || 0);
        setTRecords(response?.data?.payload?.totalRecords);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    setPagePagination(newPage);
    setSearchParams({ page: newPage });
  };

  useEffect(() => {
    getReviews();
  }, [pagePagination]);

  return (
    <main className="category__page">
      <SEO title={SeoData?.meta_title || "TrustyFeedback"} description={SeoData?.meta_description} keywords="TrustyFeedback" />
      <div className="bg__animation__wrap">
        <div className="bg_circle_one"></div>
        <div className="bg_circle_two"></div>
        <div className="bg_circle_three"></div>
        <div className="bg_circle_four"></div>
      </div>
      <section className="all__cat__area">
        <div className="container">
          <div className="cat__archive__head mx-auto">
            <div className="d-flex justify-content-center bread__wrap">
              <Breadcrumb active="Categories" />
            </div>
            <h1 className="text-center">What are you looking for?</h1>
            <SearchWithCategory />
          </div>
          <div className="all__cat__lists__wrap">
            <div className="row">
              <div className="col-sm-8">
                <h2 className="mb-0">Explore companies by category</h2>
              </div>
              <div className="col-sm-4 text-end">
                {/* <Link to={"/"} className="default__btn transparent__btn align-self-center">
                  <span>See More</span>{" "}
                  <span className="btn__icon">
                    <ReactSVG src={rightarrow} />
                  </span>{" "}
                </Link> */}
              </div>
            </div>
            <Suspense fallback={<Loader />}>
              <div className="categories___lists">
                {loading ? [1, 2].map((_, index) => <ReviewsCard key={index} />) : <div className="row">{data && data.length > 0 ? data.map((item, key) => <CategoryCard key={key} data={item} />) : <NoDataFound />}</div>}
                {tRecords > pShow ? (
                  <div className="d-flex justify-content-center">
                    <Pagination total={totalPage} page={pagePagination} setPage={handlePageChange} perPage={pShow} last_page={totalPage} />
                  </div>
                ) : (
                  ""
                )}
              </div>
            </Suspense>
          </div>
        </div>
      </section>
      <div className="have__bg__sbox">
        <BusinessSearch />
      </div>
    </main>
  );
};

export default Category;
