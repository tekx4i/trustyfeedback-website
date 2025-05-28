import React, { useState, useEffect } from "react";
import { ReactSVG } from "react-svg";
import { format } from "date-fns";
import { GoShareAndroid } from "react-icons/go";
import "./CommentCard.scss";
import userImg from "../../../../../assets/unknow-user.png";
import RatingStar from "../../../../../assets/Dashboard/RatingStar_0.svg";
import PlaceholderImg from "../../../../../Shared/PlaceholderImg/PlaceholderImg";
import { IMG_URL, REACT_APP_API_URL } from "../../../../../constants/constants";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { apiDeleteNew, apiGet, apiPost } from "../../../../../services/userAuth";
import { toast } from "react-hot-toast";
import { HiThumbUp } from "react-icons/hi";
import { HiOutlineHandThumbDown, HiOutlineHandThumbUp } from "react-icons/hi2";
import { getStorage } from "../../../../../services/storage";
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, LinkedinShareButton, LinkedinIcon } from "react-share";
import Bookmark from "../../../../../assets/bookmark.svg";
import BookmarkActive from "../../../../../assets/archive.svg";
import Spinner from "../../../../../Shared/Loader/Spinner";
import { BiLike, BiSolidLike } from "react-icons/bi";

const CommentCard = ({ data, responds, bgColor }) => {
  const location = useLocation();
  const currentUrl = window.location.origin + location.pathname + location.search;

  const [reviews, setReviews] = useState([]);
  // Social Media links
  const shareUrl = `${currentUrl}`;
  const title = "TrustyFeedback";

  const navigate = useNavigate();
  const [showFullComment, setShowFullComment] = useState(false);
  const [likes, setLikes] = useState({});
  const [likeCount, setLikeCount] = useState(data?._count?.like || 0);
  const token = getStorage("token");
  const userInfo = JSON.parse(getStorage("userInfo"));
  const [favLoading, setFavLoading] = useState({
    loading: false,
    id: 0,
  });
  const [liked, setLiked] = useState({});

  useEffect(() => {
    if (data?.id && data?.like) {
      setLikes((prevLikes) => ({
        ...prevLikes,
        [data.id]: data?.like?.length > 0,
      }));
    }
  }, [data]);

  const toggleComment = () => {
    setShowFullComment(!showFullComment);
  };

  const truncatedComment = data.comment?.slice(0, 200) + "";

  const likeFunc = async (r_id) => {
    if (token) {
      try {
        const url = `${REACT_APP_API_URL}like`;
        const params = { review_id: r_id };
        const response = await apiPost(url, params, token);
        if (response.success === true) {
          // Update local state for likes and like count
          setLikes((prev) => ({
            ...prev,
            [r_id]: true,
          }));
          setLikeCount((prevCount) => prevCount + 1); // Increment like count
        } else {
          toast.error(response.message || "Failed to like the comment.");
        }
      } catch (error) {
        toast.error("An error occurred while liking the comment.");
      }
    } else {
      toast.error("You are not an authorized user. Please login.");
      setTimeout(() => {
        navigate("/auth/login");
      }, 2000);
    }
  };

  const dislikeFunc = async (r_id) => {
    if (token) {
      try {
        const url = `${REACT_APP_API_URL}like`;
        const params = { review_id: r_id };
        const response = await apiDeleteNew(url, params, token);
        if (response.success === true) {
          setLikes((prev) => ({
            ...prev,
            [r_id]: false,
          }));
          setLikeCount((prevCount) => prevCount - 1);
        } else {
          toast.error(response.message || "Failed to unlike the comment.");
        }
      } catch (error) {
        toast.error("An error occurred while unliking the comment.");
      }
    } else {
      toast.error("You are not an authorized user. Please login.");
      setTimeout(() => {
        navigate("/auth/login");
      }, 2000);
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

  return (
    <div className={`comment__card ${bgColor && bgColor}`}>
      <div className="d-flex justify-content-between">
        <div className="d-flex">
          <div className="user__img">{data?.user?.image ? <img src={IMG_URL + data?.user?.image} alt="User" /> : <PlaceholderImg />}</div>
          <div className="user-detail">
            <h6 className="mb-0">{data?.user?.name}</h6>
            <div className="rating__star">
              {Array.from({ length: data?.rating || 0 }).map((_, index) => (
                <div key={index}>
                  <ReactSVG src={RatingStar} />
                </div>
              ))}{" "}
              &nbsp;
              {data?.rating + ".0"}
            </div>
          </div>
        </div>
        {!responds && (
          <>
            {(data && data?.favorites && data?.favorites[0]?.review_id === data.id) || liked[data.id] ? (
              <div onClick={() => favrouiteDelete(data?.id)}>{favLoading.loading && favLoading.id === data?.id ? <Spinner /> : <ReactSVG src={BookmarkActive} />}</div>
            ) : (
              <div onClick={() => favrouite(data?.id)}>{favLoading.loading && favLoading.id === data?.id ? <Spinner /> : <ReactSVG src={Bookmark} />}</div>
            )}
          </>
        )}
      </div>
      <Link to={`/dashboard/my-reviews/detail/${data?.id}`} className="comment__detail">
        <p>
          <h6>{data?.title ? data?.title : ""}</h6>
          <span
            dangerouslySetInnerHTML={{
              __html: showFullComment ? data.comment : truncatedComment,
            }}
          />
          {showFullComment && <div className="my-2">{data?.images && data?.images.map((item, key) => <img key={key} className="images_of_comment" src={IMG_URL + item.file_path} alt={`Comment Image ${key + 1}`} />)}</div>}

          {(data.comment?.length > 200 || data?.images?.length > 0) && (
            <button onClick={toggleComment} className="toggle-btn">
              {showFullComment ? "..less" : "..more"}
            </button>
          )}
        </p>
        {data && data?.created_at && (
          <div className="comment__date">
            <small>
              <span>Posted Date:</span> {format(new Date(data?.created_at), "MMM dd, yyyy")}
            </small>
          </div>
        )}
      </Link>
      <hr className="border-secondary" />
      <div className="d-flex bottom__share__btn">
        {token ? (
          <button type="button" className={`p-0 text-muted d-flex`}>
            <div className="count-likes">{likeCount}</div>
            {likes[data?.id] ? (
              <div
                className="like-btn"
                onClick={() => {
                  dislikeFunc(data?.id);
                }}
              >
                <BiSolidLike size={19} />
                &nbsp;
              </div>
            ) : (
              <div
                onClick={() => {
                  likeFunc(data?.id);
                }}
              >
                <BiLike size={19} />
              </div>
            )}
          </button>
        ) : (
          <button
            className="p-0 text-muted d-flex"
            onClick={() => {
              toast.error("You need to log in to like this comment.");
              navigate("/auth/login");
            }}
          >
            <div className="count-likes">{likeCount}</div>
            <div>
              <HiOutlineHandThumbUp />
            </div>
          </button>
        )}

        <button className="p-0 text-muted ms-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
          <GoShareAndroid color="" /> Share
        </button>

        {/* Modal for Sharing */}
        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-5">
              <div className="modal-header px-4">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Social Media
                </h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body px-4 py-4 pb-5">
                <div className="gap-2 d-flex">
                  <h5 className="align-self-center mb-0">Share on :</h5>
                  <FacebookShareButton url={shareUrl} quote={title}>
                    <FacebookIcon size={32} round />
                  </FacebookShareButton>
                  <TwitterShareButton url={shareUrl} title={title}>
                    <TwitterIcon size={32} round />
                  </TwitterShareButton>
                  <LinkedinShareButton url={shareUrl}>
                    <LinkedinIcon size={32} round />
                  </LinkedinShareButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
