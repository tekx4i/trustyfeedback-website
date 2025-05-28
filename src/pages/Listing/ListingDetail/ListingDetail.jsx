import React, { lazy, Suspense, useState, useEffect } from "react";
import "./ListingDetail.scss";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { REACT_APP_API_URL } from "../../../constants/constants";
import { apiGet } from "../../../services/userAuth";
import BlogDetailLoader from "../../../Shared/Loader/BlogDetailLoader/BlogDetailLoader";
import NoDataFound from "../../../Shared/NoDataFound/NoDataFound";
import { getStorage } from "../../../services/storage";
import unknownUser from "../../../assets/unknow-user.png";
import { ReactSVG } from "react-svg";
import RatingStar from "../../../assets/Dashboard/RatingStar_01.svg";
import "./Components/WriteReview/WriteReview.scss";

const Breadcrumb = lazy(() => import("../../../Shared/BreadCrumb/BreadCrumb"));
const BasicInfo = lazy(() => import("./Components/BasicInfo/BasicInfo"));
const WriteReview = lazy(() => import("./Components/WriteReview/WriteReview"));
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
  const [tRecords, setTRecords] = useState();
  const [hoverRating, setHoverRating] = useState(null);
  const [rating, setRating] = useState();

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
      const response = await apiGet(URL, {});
      if (response.success === true) {
        setData(response?.data?.payload);

        const slug = generateSlug(response.data.payload.name);
        if (!name || name !== slug) {
          navigate(`/listing/listing-detail/${id}/${slug}`, { replace: true });
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
      // limit: pShow,
      // page: searchParams.get("page") ? parseInt(searchParams.get("page")) : 1,
    };
    try {
      const URL = `${REACT_APP_API_URL}review`;
      const token = tokenS ? tokenS : "";
      const response = await apiGet(URL, params);
      if (response.success === true) {
        const dbValues = response?.data?.payload.records;
        setReviews(dbValues);
        setTotalPage(response?.data?.payload?.totalPages);
        setReviewsLoading(false);
        setTRecords(response?.data?.payload?.totalRecords);
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

  const handleRatingClick = (star) => {
    setRating(star);
    setTimeout(() => {
      navigate(`/evaluate/${id}/${data?.categories[0]?.category_id}/${star}`);
    }, 1000);
  };

  return (
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
              <BasicInfo formattedName={formattedName} data={data} />
              <div className="all__listings__re">
                <div className="row">
                  <div className="col-lg-8">
                    <div className="write__review__box">
                      <div className="d-flex ">
                        <div className="write__r__left alig n-self-center d-flex">
                          <div className="user__avatar">
                            <img src={unknownUser} className="unknown-user" alt="User" />
                          </div>
                          <Link className="align-self-center" to={`/evaluate/${id}/${data?.categories[0]?.category_id}`}>
                            Write a review
                          </Link>
                        </div>
                        <div className="rating__star">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <div key={star} className={`star ${star <= (hoverRating || rating) ? "active" : ""}`} onClick={() => handleRatingClick(star)} onMouseEnter={() => setHoverRating(star)} onMouseLeave={() => setHoverRating(null)}>
                              <ReactSVG src={RatingStar} />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    {/* <WriteReview getReviews={getReviews} category_id={data?.categories[0].id} id={data?.id} /> */}
                    {reviews && reviewsLoading ? (
                      <div className="mt-3">
                        <BlogDetailLoader />
                      </div>
                    ) : reviews.length > 0 ? (
                      reviews.map((item, key) => <CommentCard getReviews={getReviews} business_id={data?.id} key={key} data={item} />)
                    ) : (
                      <div className="mt-3">
                        <NoDataFound />
                      </div>
                    )}
                    {reviews && reviews.length === 0 ? "" : <div className="d-flex justify-content-center listing__pag">{tRecords > pShow ? <Pagination total={totalPage} page={pagePagination} setPage={setPagePagination} perPage={pShow} last_page={totalPage} /> : ""}</div>}
                  </div>
                  <div className="col-lg-4">
                    <SideContent data={data} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Suspense>
    </div>
  );
};

export default ListingDetail;
