import React, { lazy, Suspense, useState, useEffect } from "react";
import "./index.scss";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { REACT_APP_API_URL } from "../../../constants/constants";
import { apiGet } from "../../../services/userAuth";
import BlogDetailLoader from "../../../Shared/Loader/BlogDetailLoader/BlogDetailLoader";
import NoDataFound from "../../../Shared/NoDataFound/NoDataFound";
import { getStorage } from "../../../services/storage";
import { ReactSVG } from "react-svg";
import dummyReview from "../../../assets/dummyReview.svg";
import arroC from "../../../assets/arroC.svg";
const Breadcrumb = lazy(() => import("../../../Shared/BreadCrumb/BreadCrumb"));
const BasicInfo = lazy(() => import("./Components/BasicInfo/BasicInfo"));
const CommentCard = lazy(() => import("./Components/CommentCard/CommentCard"));
const SideContent = lazy(() => import("./Components/SideContent/SideContent"));
const Pagination = lazy(() => import("../../../Shared/Pagination/Pagination"));

const ListingDetail = () => {
  const tokenS = getStorage("token");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState();
  const [reviewsLoading, setReviewsLoading] = useState();
  const [data, setData] = useState();
  const [reviews, setReviews] = useState([]);
  const { id, name } = useParams();
  const [totalPage, setTotalPage] = useState(0);
  const [pagePagination, setPagePagination] = useState(searchParams.get("page") ? parseInt(searchParams.get("page")) : 1);
  const [pShow, setPshow] = useState(10);
  const [tRecords, setRecords] = useState();

  const formatNameWithSpaces = (str) => {
    return str.replace(/[-_]+/g, " ").trim();
  };

  const formattedName = name ? formatNameWithSpaces(name) : "";

  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const getOne = async () => {
    if (!id) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const URL = `${REACT_APP_API_URL}business/${id}`;
      const response = await apiGet(URL, {}, tokenS);
      if (response.success === true) {
        setData(response?.data?.payload);

        const slug = generateSlug(response.data.payload.name);
        if (!name || name !== slug) {
          navigate(`/dashboard/company-details/${id}/${slug}`, { replace: true });
        }
      } else {
      }
    } catch (error) {
      console.error("Error fetching blog details:", error);
    } finally {
      setLoading(false);
    }
  };

  const getReviews = async () => {
    setReviewsLoading(true);
    const params = {
      business_id: id,
      limit: 10,

      page: searchParams.get("page") ? parseInt(searchParams.get("page")) : 1,
    };
    try {
      const URL = `${REACT_APP_API_URL}review`;
      const token = tokenS ? tokenS : "";
      const response = await apiGet(URL, params, token);
      if (response.success === true) {
        const dbValues = response?.data?.payload.records;
        setReviews(dbValues);
        setTotalPage(response?.data?.payload?.totalPages);
        setReviewsLoading(false);
        setRecords(response?.data?.payload?.totalRecords);
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
      getOne();
    }
  }, [id]);

  useEffect(() => {
    getReviews();
  }, [id, searchParams, pagePagination]);

  return (
    <div id="whole_main">
      <div className="listing__detail__page">
        <div className="bg__animation__wrap">
          <div className="bg_circle_one"></div>
          <div className="bg_circle_two"></div>
          <div className="bg_circle_three"></div>
          <div className="bg_circle_four"></div>
        </div>
        <Suspense>
          {loading ? (
            <div className="my-3 ">
              <BlogDetailLoader />
            </div>
          ) : (
            <div className="listing__detail">
              <div className="container">
                <Breadcrumb active={formattedName} />
                <div className="all__listings__re">
                  <div className="row">
                    <div className="col-lg-8">
                      <BasicInfo formattedName={formattedName} data={data} />
                      {reviews?.length > 0 && <h4>My Reviews</h4>}
                      {reviews && reviewsLoading ? (
                        <div className="mt-3">
                          <BlogDetailLoader />
                        </div>
                      ) : reviews.length > 0 ? (
                        reviews.map((item, key) => <CommentCard saved_business={true} getReviews={getReviews} business_id={data?.id} key={key} data={item} />)
                      ) : (
                        "No reviews yet."
                      )}
                      {reviews && reviews.length === 0 ? "" : <div className="d-flex justify-content-center listing__pag">{tRecords > pShow && <Pagination total={totalPage} page={pagePagination} setPage={setPagePagination} perPage={pShow} last_page={totalPage} />}</div>}
                    </div>
                    <div className="col-lg-4">
                      <SideContent data={data} />
                      <div className="card_l">
                        <h6>Share Your Experience with {formattedName}</h6>
                        <Link className="review_write" to="/write-a-review">
                          Write a Review
                        </Link>
                        <div className="arrow">
                          <ReactSVG src={arroC} />
                        </div>
                        <div className="arrow_cs">
                          <ReactSVG src={dummyReview} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Suspense>
      </div>
    </div>
  );
};

export default ListingDetail;
