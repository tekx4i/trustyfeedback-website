import TotalReviews from "../../../assets/TotalRating.svg";
import TotalResponds from "../../../assets/TotalResponds.svg";
import AverageRating from "../../../assets/AverageRating.svg";
import CornerLeft from "../../../assets/cornerLeft.svg";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { FaArrowRight } from "react-icons/fa";
import "react-circular-progressbar/dist/styles.css";
import "./HomePage.scss";
import { ReactSVG } from "react-svg";
import RatingStar from "../../../assets/Dashboard/RatingStar_01.svg";
import CommentCard from "../../../Shared/DashboardComponents/CommentCard/CommentCard";
import { useContext, useEffect, useState } from "react";
import { apiGet } from "../../../services/userAuth";
import { IMG_URL, REACT_APP_API_URL } from "../../../constants/constants";
import { getStorage } from "../../../services/storage";
import filterIcon from "../../../assets/settings-04.svg";
import { useUserInfo } from "../../../context/UserInfoContext";
import { AuthContext } from "../../../context/UserDashboardSlice";
import { Link } from "react-router-dom";
import PlaceholderImg from "../../../Shared/PlaceholderImg/PlaceholderImg";
import CardDetailLoader from "../../../Shared/Loader/BlogDetailLoader/BlogDetailLoader";
import DoughnutChart from "../../../Shared/Chart";

function HomePage() {
  const [filter, setFilter] = useState(false);
  const [sortOrder, setSortOrder] = useState("desc");
  const { userInfo } = useUserInfo();
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const percentage = 66;
  const [responds, setResponds] = useState();
  const data = [
    { id: 1, count: user?.reviews_count ? user?.reviews_count : 0, description: "Total Reviews", img: TotalReviews },
    { id: 2, count: user?.business?.rating ? user?.business?.rating : 0, description: "Average Ratings", img: AverageRating },
    { id: 3, count: user?.total_comments ? user?.total_comments : 0, description: "Total Responds", img: TotalResponds },
  ];

  const userInfoLocal = getStorage("userInfo");
  const token = getStorage("token");
  const user_id = JSON.parse(userInfoLocal).id;
  const business_id = JSON.parse(userInfoLocal).business_id;
  const role_id = JSON.parse(userInfoLocal).role_id;

  const getReviews = async () => {
    setReviewsLoading(true);
    const params = {
      limit: 5,
      sort: `created_at:${sortOrder}`,
      approved: true,
      ...(role_id !== 3 ? { user_id: user_id } : { business_id: business_id }),
    };

    try {
      const URL = `${REACT_APP_API_URL}review`;
      const response = await apiGet(URL, params, token);
      if (response.success) {
        const dbValues = response?.data?.payload.records;
        setReviews(dbValues);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setReviewsLoading(false);
    }
  };

  const getResponse = async () => {
    setReviewsLoading(true);
    const params = {
      limit: 2,
      author_id: userInfo?.id,
    };

    try {
      const URL = `${REACT_APP_API_URL}comment`;
      const response = await apiGet(URL, params, token);
      if (response.success) {
        const dbValues = response?.data?.payload.records;
        setResponds(dbValues);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setReviewsLoading(false);
    }
  };

  useEffect(() => {
    getReviews();
  }, [sortOrder]);

  useEffect(() => {
    getResponse();
  }, []);

  const toggleFilter = () => setFilter(!filter);

  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 100;

  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="row" id="business__dashboard">
      <div className="col-md-8">
        <h3 id="title">Analytics Overview</h3>
        <div className="cards__section">
          {data?.map((item) => (
            <div className="items" key={item.id}>
              <div>
                <ReactSVG src={item.img} />
              </div>
              <div>
                <h3>{item.count}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div id="filters" className="d-flex justify-content-between align-items-center position-relative">
          <h3>Customer Reviews</h3>
          <div className="d-flex gap-4">
            <p>Showing {reviews.length} reviews</p>
            <p className="d-flex" type="button" onClick={toggleFilter}>
              <ReactSVG src={filterIcon} />
              &nbsp; Filter
            </p>
          </div>
          {filter && (
            <div className="filter__dashboard">
              <button
                onClick={() => {
                  setSortOrder("desc");
                  setFilter(!filter);
                }}
              >
                Sort by Newest
              </button>
              <button
                onClick={() => {
                  setSortOrder("asc");
                  setFilter(!filter);
                }}
              >
                Sort by Old
              </button>
            </div>
          )}
        </div>
        {reviewsLoading ? (
          <CardDetailLoader />
        ) : reviews?.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="ps-3">
              <CommentCard token={token} data={review} />
            </div>
          ))
        ) : (
          "No data found."
        )}
      </div>
      <div className="col-md-4">
        <>
          <div className="progressBar__section">
            <div className="insights">
              <h3>Insights</h3>
              {/* <select className="form-select" name="ratings" id="ratings">
                <option value="rating">Ratings</option>
                <option value="review">Reviews</option>
              </select> */}
            </div>
            {user?.reviews_count && user?.business?.rating && user?.total_comments !== 0 ? <DoughnutChart /> : "No data insights"}
            {/* <div style={{ width: "168px", height: "168px", margin: "auto" }}>
              <CircularProgressbar
                value={percentage}
                text={`${percentage}%`}
                styles={buildStyles({
                  pathColor: "#4558f9",
                  textColor: "#4558f9",
                  trailColor: "#d6d6d6",
                  backgroundColor: "#f0f0f0",
                })}
              />
            </div> */}
          </div>
          <h3 id="responds">Your Responds</h3>
          {reviewsLoading ? (
            <CardDetailLoader />
          ) : responds ? (
            responds?.map((i) => (
              <div className="responds__section mb-3">
                <div className="reply">
                  <ReactSVG src={CornerLeft} />
                  <p className="mb-2">{i?.review?.user?.name}</p>
                </div>
                <div className="review">
                  <div className="profile">
                    {i?.review?.user?.image ? <img className="img" src={IMG_URL + i?.review?.user?.image} alt="Profile" /> : <PlaceholderImg />}
                    <div>
                      <p>{i?.review?.user?.name}</p>
                      <div className="stars">
                        {Array.from({ length: i?.review?.rating || 0 }).map((_, index) => (
                          <div key={index}>
                            <ReactSVG src={RatingStar} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: i?.review?.comment ? i.review.comment.substring(0, 40) + (i.review.comment.length > 40 ? "..." : "") : "",
                      }}
                    />
                  </div>
                  <Link to={`/dashboard/my-reviews/detail/${i?.review?.id}`} className="readMore">
                    Read More{" "}
                    <span>
                      <FaArrowRight color="blue" />
                    </span>
                  </Link>
                  <div className="border mb-2"></div>
                  <div>
                    <p className="">
                      {isExpanded ? i.content : i.content.length > maxLength ? `${i.content.slice(0, maxLength)}...` : i.content}

                      {i.content.length > maxLength && (
                        <span className="btn p-0 text-primary" style={{ fontSize: "12px" }} onClick={toggleText}>
                          {isExpanded ? "Show Less" : "Show More"}
                        </span>
                      )}
                    </p>

                    <p className="fw-bold mb-1">Regards,</p>
                    <p>{userInfo?.business?.name}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            "No data found."
          )}
        </>
      </div>
    </div>
  );
}

export default HomePage;
