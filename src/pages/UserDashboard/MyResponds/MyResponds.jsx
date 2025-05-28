import React, { useState, useEffect, lazy } from "react";
import { REACT_APP_API_URL } from "../../../constants/constants";
import { apiGet } from "../../../services/userAuth";
import { getStorage } from "../../../services/storage";
import { IoChevronDownSharp } from "react-icons/io5";
import "./MyResponds.scss";
import { useSearchParams } from "react-router-dom";
import Spinner from "../../../Shared/Loader/Spinner";
import { format } from "date-fns";
import Pagination from "../../../Shared/Pagination/Pagination";
import CardDetailLoader from "../../../Shared/Loader/BlogDetailLoader/BlogDetailLoader";
const Reviews = lazy(() => import("../../../Shared/CommentCard/CommentCard"));

const MyResponds = () => {
  const [loading, setLoading] = useState();
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const token = getStorage("token");
  const parsedInfo = getStorage("userInfo");
  const userInfo = JSON.parse(parsedInfo);
  const [dropDown, setDropDown] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [searchParams] = useSearchParams();
  const [totalPage, setTotalPage] = useState(0);
  const [pendingTotalRecords, setPendingTotalRecords] = useState(0);
  const [limit, setLimit] = useState(10);
  const [tRecords, setTRecords] = useState();
  const [pendingPagination, setPendingPagination] = useState(searchParams.get("page") ? parseInt(searchParams.get("page")) : 1);

  const getReviews = async () => {
    setLoading(true);
    try {
      const URL = `${REACT_APP_API_URL}review`;
      const params = {
        user_id: parsedInfo.id,
        limit: limit,
        approved: true,
        sort: "created_at:desc",
        ...(selectedDate && { created_at: format(new Date(selectedDate), "yyyy-MM-dd") }),
        page: searchParams.get("page") ? parseInt(searchParams.get("page")) : pendingPagination,
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
    getReviews();
  }, [searchParams, pendingPagination, selectedDate, limit]);

  return (
    <div id="my_responds">
      <div id="respond" className="d-flex justify-content-between">
        <h4>Your Responses to Consumers</h4>
        <div>
          <div className="px-0 d-flex gap-2">
            {dropDown ? (
              <input className="bg-transparent border border-dark p-2" type="date" onChange={(e) => setSelectedDate(e.target.value)} />
            ) : (
              <button className="p_btn" onClick={() => setDropDown(!dropDown)}>
                Sort by <IoChevronDownSharp />
              </button>
            )}
          </div>
        </div>
      </div>
      <div id="card">{loading ? <CardDetailLoader /> : reviews?.length > 0 ? reviews.map((item, key) => <Reviews responds={true} key={key} data={item} bgColor={"bg-white"} />) : <p>No reviews found.</p>}</div>
      <div className="d-flex justify-content-center">{pendingTotalRecords > limit && <Pagination total={totalPage} page={pendingPagination} setPage={setPendingPagination} perPage={limit} last_page={totalPage} />}</div>
    </div>
  );
};

export default MyResponds;
