import { useState, useEffect, useContext } from "react";
import MyReviewLayout from "./Layout/MyReviewLayout";
import { useMyReviews } from "../../../hooks/useTanstackQuery";
import PlaceholderImg from "../../../Shared/PlaceholderImg/PlaceholderImg";
import RatingStar from "../../../assets/Dashboard/RatingStar_0.svg";
import { ReactSVG } from "react-svg";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import "./index.scss";
import { IMG_URL, REACT_APP_API_URL } from "../../../constants/constants";
import { apiDeleteNew, apiGet } from "../../../services/userAuth";
import verifiedIcon from "../../../assets/approved-icon.svg";
import detailArrow from "../../../assets/detail-arrow.svg";
import reward from "../../../assets/reward.svg";
import { format } from "date-fns";
import { getStorage } from "../../../services/storage";
import Pagination from "../../../Shared/Pagination/Pagination";
import { IoChevronDownSharp } from "react-icons/io5";
import { GoPencil } from "react-icons/go";
import bin from "../../../assets/trash-01.svg";
import Spinner from "../../../Shared/Loader/Spinner";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import EditReview from "./Components/EditReview";
import { Sheet } from "react-modal-sheet";
import NoDataFound from "../../../Shared/NoDataFound/NoDataFound";
import SingleCardLoader from "../../../Shared/Loader/SingleCardLoader";
import Bookmark from "../../../assets/bookmark.svg";
import BookmarkActive from "../../../assets/archive.svg";

const MyReviews = () => {
  const { myReviewsData } = useMyReviews();
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState();
  const userInfo = getStorage("userInfo");
  const parsedInfo = JSON.parse(userInfo);
  const token = getStorage("token");
  const [searchParams] = useSearchParams();
  const [dropDown, setdropDown] = useState();
  const [selectedDate, setSelectedDate] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState({
    id: 0,
    loading: false,
  });
  // pagination
  const [totalPage, setTotalPage] = useState(0);
  const [pagePagination, setPagePagination] = useState(searchParams.get("page") ? parseInt(searchParams.get("page")) : 1);
  const [pShow, setPshow] = useState(10);
  const [limit, setLimit] = useState(2);
  const [data, setData] = useState();
  const [isOpen, setOpen] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState(null);
  const [editLoading, setEditLoading] = useState(false);
  const [sheetContentLoading, setSheetContentLoading] = useState({
    loading: false,
    id: 0,
  });
  const [favLoading, setFavLoading] = useState({
    loading: false,
    id: 0,
  });
  const [liked, setLiked] = useState({});
  const [tRecords, setTRecords] = useState();
  const [activeTab, setActiveTab] = useState("approved");
  const [pending, setPending] = useState([]);
  const [pendingPagination, setPendingPagination] = useState(searchParams.get("page") ? parseInt(searchParams.get("page")) : 1);
  const [pendingTotalPages, setPendingTotalPages] = useState(0);
  const [pendingTotalRecords, setPendingTotalRecords] = useState(0);
  const [pendingLoading, setPendingLoading] = useState(false);
  const [ratingFilter, setRatingFilter] = useState("desc");

  const getPendingReviews = async () => {
    setPendingLoading(true);
    try {
      const URL = `${REACT_APP_API_URL}review`;
      const params = {
        user_id: parsedInfo.id,
        // limit: limit,
        approved: false,
        sort: `rating:${ratingFilter}`,
        ...(selectedDate && { created_at: format(new Date(selectedDate), "yyyy-MM-dd") }),
        page: searchParams.get("page") ? parseInt(searchParams.get("page")) : pendingPagination,
      };
      const response = await apiGet(URL, params, token);
      if (response.success) {
        setPending(response.data.payload.records || []);
        setPendingTotalPages(response?.data?.payload?.totalPages);
        setPendingTotalRecords(response.data.payload.totalRecords);
      }
    } catch (error) {
      console.error("Error fetching pending reviews:", error);
    } finally {
      setPendingLoading(false);
    }
  };

  const getReviews = async () => {
    setLoading(true);
    try {
      const URL = `${REACT_APP_API_URL}review`;
      const params = {
        user_id: parsedInfo.id,
        limit: limit,
        approved: true,
        sort: `rating:${ratingFilter}`,
        ...(selectedDate && { created_at: format(new Date(selectedDate), "yyyy-MM-dd") }),
        page: searchParams.get("page") ? parseInt(searchParams.get("page")) : pagePagination,
      };
      const response = await apiGet(URL, params, token);
      if (response.success) {
        setReviews(response.data.payload.records || []);
        setTotalPage(response?.data?.payload?.totalPages);
        setTRecords(response.data.payload.totalRecords);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "approved") {
      getReviews();
    } else {
      getPendingReviews();
    }
  }, [searchParams, pagePagination, pendingPagination, ratingFilter, limit, activeTab]);

  // Fetch review data
  const getOne = async (id) => {
    if (!id) return;

    setSheetContentLoading({
      loading: true,
      id: id,
    });
    const tokenS = token ? token : "";
    try {
      const URL = `${REACT_APP_API_URL}review/${id}`;
      const response = await apiGet(URL, {}, tokenS);
      if (response.success) {
        const reviewData = response.data.payload;
        setData(reviewData);
        setSheetContentLoading({
          loading: false,
          id: id,
        });
      } else {
        setData(null);
      }
    } catch (error) {
      console.error("Error fetching review details:", error);
      setData(null);
    } finally {
      setSheetContentLoading({
        loading: false,
        id: id,
      });
    }
  };

  const handleEditClick = async (id) => {
    setSheetContentLoading({
      loading: true,
      id: id,
    });
    try {
      await getOne(id);
      setSelectedReviewId(id);
      setOpen(true);
    } finally {
      setSheetContentLoading({
        loading: false,
        id: id,
      });
    }
  };

  // Fetch favourite review data
  const favrouite = async (id) => {
    if (!id) return;
    setFavLoading({
      loading: true,
      id: id,
    });
    const tokenS = token ? token : "";
    try {
      const URL = `${REACT_APP_API_URL}review/favorite/${id}`;
      const response = await apiGet(URL, {}, tokenS);
      if (response.success) {
        const reviewData = response.data.payload;
        if (response.success === true) {
          setLiked({
            ...liked,
            [id]: true,
          });

          setReviews((prevReviews) =>
            prevReviews?.map((review) => {
              if (review.id === id) {
                return {
                  ...review,
                  favorites: [{ review_id: id }],
                };
              }
              return review;
            }),
          );
        }
      }
    } catch (error) {
      console.error("Error updating favorite:", error);
    } finally {
      setFavLoading({
        loading: false,
        id: id,
      });
    }
  };

  // Fetch favourite review data
  const favrouiteDelete = async (id) => {
    if (!id) return;
    setFavLoading({
      loading: true,
      id: id,
    });
    const tokenS = token ? token : "";
    try {
      const URL = `${REACT_APP_API_URL}review/favorite/${id}`;
      const response = await apiDeleteNew(URL, {}, tokenS);
      if (response.success) {
        setLiked({
          ...liked,
          [id]: false,
        });

        setReviews((prevReviews) =>
          prevReviews?.map((review) => {
            if (review.id === id) {
              return {
                ...review,
                favorites: [],
              };
            }
            return review;
          }),
        );
      }
    } catch (error) {
      console.error("Error updating favorite:", error);
    } finally {
      setFavLoading({
        loading: false,
        id: id,
      });
    }
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    if (tabName === "approved") {
      setPagePagination(1);
    } else {
      setPendingPagination(1);
    }
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete("page");
    navigate(`?${newSearchParams.toString()}`);
  };

  return (
    <MyReviewLayout reviewsLength={reviews?.length}>
      <div className="d-flex justify-content-between recent_review" style={window.innerWidth < 768 ? { margin: "5px 10px 14px" } : { marginBottom: "30px" }}>
        <div>
          <h3 className="text-body text-2xl">Your Recent Reviews</h3>
          <div className="review-tabs">
            <button className={`tab-btn ${activeTab === "approved" ? "active" : ""}`} onClick={() => handleTabClick("approved")}>
              Approved Reviews
            </button>
            <button className={`tab-btn ${activeTab === "pending" ? "active" : ""}`} onClick={() => handleTabClick("pending")}>
              Pending Reviews
            </button>
          </div>
        </div>
        <div className="filter_dropdown align-self-center row" style={window.innerWidth < 768 ? { marginTop: "-110px", minWidth: "0px" } : { marginTop: "-90px", minWidth: "350px" }}>
          {/* <div className="col-sm-6 px-0">
            {dropDown ? (
              <input style={{ width: "100%" }} className=" bg-transparent border border-dark p-2" type="date" onChange={(e) => setSelectedDate(e.target.value)} />
            ) : (
              <button style={{ width: "100%", height: "41px", lineHeight: "22px" }} className="p_btn" onClick={() => setdropDown(!dropDown)}>
                Sort by <IoChevronDownSharp />
              </button>
            )}
          </div> */}
          <div className={window.innerWidth < 768 ? "mb-2 col-sm-6" : "col-sm-6"}>
            <select style={{ lineHeight: "22px" }} className="bg-transparent border border-dark p-2" value={ratingFilter} onChange={(e) => setRatingFilter(e.target.value)}>
              <option value="desc">Most Rating</option>
              <option value="asc">Least Rating</option>
            </select>
          </div>
          <div className="col-sm-6">
            <select style={{ lineHeight: "22px" }} className="bg-transparent border border-dark p-2" value={limit} onChange={(e) => setLimit(Number(e.target.value))}>
              <option value={2}>2 per page</option>
              <option value={10}>10 per page</option>
              <option value={50}>50 per page</option>
            </select>
          </div>
        </div>
      </div>
      <div id="reviews_main_lay">
        {activeTab === "approved" ? (
          <>
            {reviews.length > 0 ? (
              <div className="row">
                {loading ? (
                  <div className="row">
                    {[1, 2].map((i) => (
                      <div className="col-sm-6">
                        <SingleCardLoader />
                      </div>
                    ))}
                  </div>
                ) : (
                  reviews.map((item) => (
                    <div className="col-md-6">
                      <div className="main__review__box">
                        <div className="main__review__wrap">
                          <div className="d-flex justify-content-between">
                            <div className="mreview__head d-flex align-items-center">
                              <div className="mreview__img">
                                {item.user?.image ? <img src={IMG_URL + item.user?.image} /> : <PlaceholderImg />}
                                <div className="user_verified">{item.verified_status === "VERIFIED" ? <ReactSVG src={verifiedIcon} /> : ""}</div>
                              </div>

                              <div className="mreview__meta">
                                <h4>{item.user?.name}</h4>
                                <div className="review_stars d-flex">
                                  <div className="d-flex">
                                    {Array.from({ length: item.rating || 0 }).map((_, index) => (
                                      <ReactSVG key={index} src={RatingStar} />
                                    ))}
                                  </div>
                                  {item?.rating ? parseFloat(item.rating.toFixed(0)) : "0.0"}.0
                                </div>
                              </div>
                            </div>
                            {item.approved_by !== null ? (
                              <div className="" type="button">
                                {(item?.favorites && item?.favorites[0]?.review_id === item.id) || liked[item.id] ? (
                                  <div onClick={() => favrouiteDelete(item?.id)}>{favLoading.loading && favLoading.id === item?.id ? <Spinner /> : <ReactSVG src={BookmarkActive} />}</div>
                                ) : (
                                  <div onClick={() => favrouite(item?.id)}>{favLoading.loading && favLoading.id === item?.id ? <Spinner /> : <ReactSVG src={Bookmark} />}</div>
                                )}
                              </div>
                            ) : (
                              <div className={`align-self-start p-2 px-3 rounded-pill bg-warning text-dark`}>{item.approved_by === null && "Pending"}</div>
                            )}
                          </div>
                          <h6 className="fw-bold mb-2">{item.title ? item.title : ""}</h6>
                          <p className="reviews_dangerous_html">
                            <span
                              dangerouslySetInnerHTML={{
                                __html: item.comment.slice(0, 150) + (item.comment.length > 150 ? "..." : ""),
                              }}
                            />
                          </p>
                          <Link to={`/dashboard/my-reviews/detail/${item.id}`} className="read_review">
                            Read Review <ReactSVG src={detailArrow} />
                          </Link>
                          <div className="review_bottom d-flex align-items-center d-flex justify-content-between">
                            <div className="d-flex gap-1">
                              <div className="revies_buss_logo"> {item?.business?.image ? <img src={IMG_URL + item?.business?.image} alt="avatarReview" /> : <PlaceholderImg />}</div>
                              <div className="review__bottom__meta">
                                <h5>{item.business?.name} </h5>
                                <p className="mb-0">
                                  <span>
                                    <Link target="_blank" to={item.business?.website}>
                                      {item.business?.website}
                                    </Link>
                                  </span>{" "}
                                  <ReactSVG src={reward} />
                                </p>
                              </div>
                            </div>
                            <div className={`d-flex gap-1 ${window.innerWidth < 768 && "mt-3"}`}>
                              <button className="edit_btn_layout" onClick={() => handleEditClick(item.id)}>
                                {sheetContentLoading.loading && sheetContentLoading.id === item.id ? (
                                  <Spinner />
                                ) : (
                                  <>
                                    <GoPencil /> Edit
                                  </>
                                )}
                              </button>

                              <button className="delete_btn_layout" data-bs-toggle="modal" data-bs-target={`#exampleModal${item.id}`}>
                                <ReactSVG src={bin} /> Delete
                              </button>
                            </div>

                            {/* delete Modal */}
                            <div className="modal fade" id={`exampleModal${item.id}`} tabindex="-1" aria-labelledby={`exampleModalLabel${item.id}`} aria-hidden="true">
                              <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content p-4 rounded-5">
                                  <div className="modal-header d-none">
                                    <h1 className="modal-title fs-5" id={`exampleModalLabel${item.id}`}>
                                      Modal title
                                    </h1>
                                    <button id="delete_Modal" type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                  </div>
                                  <div className="modal-body text-center">
                                    <h3 className="d-flex justify-content-center gap-2">Delete</h3>
                                    <p className="mt-4 mb-0">Are you sure you want to delete review?</p>
                                  </div>
                                  <div className="d-flex justify-content-center gap-3 my-3">
                                    <button type="button" className="delete_default_btn bg-light border text-dark" data-bs-dismiss="modal">
                                      Close
                                    </button>
                                    <button type="button" className="delete_default_btn red__btn" onClick={() => deleteReviews(item.id)}>
                                      {deleteLoading.loading && deleteLoading.id === item.id ? <Spinner /> : "Delete"}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            ) : (
              <NoDataFound />
            )}
            <div className="d-flex justify-content-center">{tRecords > limit && <Pagination total={totalPage} page={pagePagination} setPage={setPagePagination} perPage={pShow} last_page={totalPage} />}</div>
          </>
        ) : (
          <>
            {pendingLoading ? (
              <div className="row">
                {[1, 2].map((i) => (
                  <div key={i} className="col-sm-6">
                    <SingleCardLoader />
                  </div>
                ))}
              </div>
            ) : pending.length > 0 ? (
              <div className="row">
                {pending.map((item) => (
                  <div className="col-md-6">
                    <div className="main__review__box">
                      <div className="main__review__wrap ">
                        <div className="d-flex justify-content-between">
                          <div className="mreview__head d-flex align-items-center">
                            <div className="mreview__img">
                              {item.user?.image ? <img src={IMG_URL + item.user?.image} /> : <PlaceholderImg />}
                              <div className="user_verified">{item.verified_status === "VERIFIED" ? <ReactSVG src={verifiedIcon} /> : ""}</div>
                            </div>

                            <div className="mreview__meta">
                              <h4>{item.user?.name}</h4>
                              <div className="review_stars d-flex">
                                <div className="d-flex">
                                  {Array.from({ length: item.rating || 0 }).map((_, index) => (
                                    <ReactSVG key={index} src={RatingStar} />
                                  ))}
                                </div>
                                {item?.rating ? parseFloat(item.rating.toFixed(0)) : "0.0"}.0
                              </div>
                            </div>
                          </div>
                          {item.approved_by !== null ? (
                            <div className="" type="button">
                              {(item?.favorites && item?.favorites[0]?.review_id === item.id) || liked[item.id] ? (
                                <div onClick={() => favrouiteDelete(item?.id)}>{favLoading.loading && favLoading.id === item?.id ? <Spinner /> : <ReactSVG src={BookmarkActive} />}</div>
                              ) : (
                                <div onClick={() => favrouite(item?.id)}>{favLoading.loading && favLoading.id === item?.id ? <Spinner /> : <ReactSVG src={Bookmark} />}</div>
                              )}
                            </div>
                          ) : (
                            <div className={`align-self-start p-2 px-3 rounded-pill bg-warning text-dark`}>{item.approved_by === null && "Pending"}</div>
                          )}
                        </div>
                        <h6 className="fw-bold mb-2">{item.title ? item.title : ""}</h6>

                        <p className="reviews_dangerous_html">
                          <span
                            dangerouslySetInnerHTML={{
                              __html: item.comment.slice(0, 150) + (item.comment.length > 150 ? "..." : ""),
                            }}
                          />
                        </p>
                        <Link to={`/dashboard/my-reviews/detail/${item.id}`} className="read_review">
                          Read Review <ReactSVG src={detailArrow} />
                        </Link>
                        <div className="review_bottom d-flex align-items-center d-flex justify-content-between">
                          <div className="d-flex gap-1">
                            <div className="revies_buss_logo"> {item?.business?.image ? <img src={IMG_URL + item?.business?.image} alt="avatarReview" /> : <PlaceholderImg />}</div>
                            <div className="review__bottom__meta">
                              <h5>{item.business?.name} </h5>
                              <p className="mb-0">
                                <span>
                                  <Link target="_blank" to={item.business?.website}>
                                    {item.business?.website}
                                  </Link>
                                </span>{" "}
                                <ReactSVG src={reward} />
                              </p>
                            </div>
                          </div>
                          {/* <div className="d-flex gap-2">
                            <button className="edit_btn_layout" onClick={() => handleEditClick(item.id)}>
                              {sheetContentLoading.loading && sheetContentLoading.id === item.id ? (
                                <Spinner />
                              ) : (
                                <>
                                  <GoPencil /> Edit
                                </>
                              )}
                            </button>

                            <button className="delete_btn_layout" data-bs-toggle="modal" data-bs-target={`#exampleModal${item.id}`}>
                              <ReactSVG src={bin} /> Delete
                            </button>
                          </div> */}

                          {/* delete Modal */}
                          <div className="modal fade" id={`exampleModal${item.id}`} tabindex="-1" aria-labelledby={`exampleModalLabel${item.id}`} aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered">
                              <div className="modal-content p-4 rounded-5">
                                <div className="modal-header d-none">
                                  <h1 className="modal-title fs-5" id={`exampleModalLabel${item.id}`}>
                                    Modal title
                                  </h1>
                                  <button id="delete_Modal" type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body text-center">
                                  <h3 className="d-flex justify-content-center gap-2">Delete</h3>
                                  <p className="mt-4 mb-0">Are you sure you want to delete review?</p>
                                </div>
                                <div className="d-flex justify-content-center gap-3 my-3">
                                  <button type="button" className="delete_default_btn bg-light border text-dark" data-bs-dismiss="modal">
                                    Close
                                  </button>
                                  <button type="button" className="delete_default_btn red__btn" onClick={() => deleteReviews(item.id)}>
                                    {deleteLoading.loading && deleteLoading.id === item.id ? <Spinner /> : "Delete"}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="d-flex justify-content-center">{pendingTotalRecords > limit && <Pagination total={pendingTotalPages} page={pendingPagination} setPage={setPendingPagination} perPage={pShow} last_page={pendingTotalPages} />}</div>
              </div>
            ) : (
              <NoDataFound />
            )}
          </>
        )}
      </div>
      <Sheet
        isOpen={isOpen}
        onClose={() => {
          setOpen(false);
          setSelectedReviewId(null);
        }}
        detent="content-height"
        onBackdropClick={() => {
          setOpen(false);
          setSelectedReviewId(null);
        }}
        style={{
          maxWidth: "600px",
          width: "100%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Sheet.Container style={{ borderRadius: "16px 16px 0 0" }}>
          <Sheet.Header />
          <Sheet.Content
            style={{
              overflow: "auto",
              maxHeight: "90vh",
              padding: "20px",
            }}
          >
            {sheetContentLoading.loading && sheetContentLoading.id === selectedReviewId ? (
              <div className="d-flex justify-content-center py-5">
                <Spinner />
              </div>
            ) : (
              <EditReview getReviews={getReviews} setOpen={setOpen} data={data} onClose={() => setOpen(false)} />
            )}
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </Sheet>
    </MyReviewLayout>
  );
};

export default MyReviews;
