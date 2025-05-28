import React, { useState, useEffect } from "react";
import { ReactSVG } from "react-svg";
import { GoThumbsup, GoShareAndroid } from "react-icons/go";
import "./CommentCard.scss";
import userImg from "../../../assets/unknow-user.png";
import RatingStar from "../../../assets/RatingStar_0.svg";
import Bookmark from "../../../assets/bookmark.svg";
import BookmarkActive from "../../../assets/archive.svg";
import PlaceholderImg from "../../PlaceholderImg/PlaceholderImg";
import { format } from "date-fns";
import { REACT_APP_API_URL } from "../../../constants/constants";
import { apiDeleteNew, apiGet, apiPost } from "../../../services/userAuth";
import { HiReply, HiThumbUp } from "react-icons/hi";
import { HiOutlineHandThumbDown, HiOutlineHandThumbUp } from "react-icons/hi2";
import { Link, useLocation } from "react-router-dom";
import Spinner from "../../../Shared/Loader/Spinner";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, LinkedinShareButton, LinkedinIcon } from "react-share";
import { IoCloseSharp } from "react-icons/io5";
import { useForm } from "react-hook-form";

const CommentCard = ({ token, data, key }) => {
  const title = "TrustyFeedback";
  const location = useLocation();
  const currentUrl = window.location.origin + location.pathname + location.search;
  // Social Media links
  const shareUrl = `${currentUrl}`;
  const [reviews, setReviews] = useState([]);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(data?._count?.like || 0);
  const [favLoading, setFavLoading] = useState({
    loading: false,
    id: 0,
  });
  const [likedBook, setLikedBook] = useState({});
  const [reply, setReply] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Like functionality
  const likeFunc = async (r_id) => {
    if (token) {
      try {
        const url = `${REACT_APP_API_URL}like`;
        const params = { review_id: r_id };
        const response = await apiPost(url, params, token);
        if (response.success) {
          setLiked(true);
          setLikeCount((prevCount) => prevCount + 1);
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

  // Dislike functionality
  const dislikeFunc = async (r_id) => {
    if (token) {
      try {
        const url = `${REACT_APP_API_URL}like`;
        const params = { review_id: r_id };
        const response = await apiDeleteNew(url, params, token);
        if (response.success) {
          setLiked(false);
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
          setLikedBook({
            ...likedBook,
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
        setLikedBook({
          ...likedBook,
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

  const handleReplySubmit = async (dataS) => {
    const url = `${REACT_APP_API_URL}comment`;
    const params = { content: dataS.content, review_id: data?.id };
    const response = await apiPost(url, params, token);
    if (response.success === true) {
      setReply(true);
      reset();
    }
  };

  return (
    <div className="user_dashboard w-100">
      <div className="d-flex justify-content-between">
        <div className="d-flex">
          <div className="user__img">{data?.business?.image ? <img src={IMG_URL + data?.business?.image} /> : <PlaceholderImg />}</div>
          <div className="user-detail">
            <h6 className="mb-0">{data?.user?.name}</h6>
            <div className="rating__star">
              {Array.from({ length: data?.rating || 0 }).map((_, index) => (
                <div key={index}>
                  <ReactSVG src={RatingStar} />
                </div>
              ))}
              &nbsp; {data?.rating.toFixed(1)}
            </div>
          </div>
        </div>
        <div>
          <div className="" type="button">
            {(data?.favorites && data?.favorites[0]?.review_id === data.id) || likedBook[data.id] ? (
              <div onClick={() => favrouiteDelete(data?.id)}>{favLoading.loading && favLoading.id === data?.id ? <Spinner /> : <ReactSVG src={BookmarkActive} />}</div>
            ) : (
              <div onClick={() => favrouite(data?.id)}>{favLoading.loading && favLoading.id === data?.id ? <Spinner /> : <ReactSVG src={Bookmark} />}</div>
            )}
          </div>
        </div>
      </div>
      <div className="comment__detail">
        <h6 className="mb-2">{data.title ? data.title : ""}</h6>

        <Link to={`/dashboard/my-reviews/detail/${data.id}`}>
          {data?.comment && (
            <span
              dangerouslySetInnerHTML={{
                __html: data?.comment.slice(0, 250) + `${data?.comment.length > 250 ? "..." : ""}`,
              }}
            />
          )}
          {data && data?.created_at && (
            <div className="comment__date">
              <small>
                <span>Posted Date:</span> {format(new Date(data?.created_at), "MMM dd, yyyy")}
              </small>
            </div>
          )}
        </Link>
        <hr className="border-secondary" />
        <div className="d-flex justify-content-between bottom__share__btn">
          <div className="d-flex">
            <button type="button" onClick={liked ? () => dislikeFunc(data?.id) : () => likeFunc(data?.id)}>
              {liked ? (
                <div>
                  <BiSolidLike size={19} />
                </div>
              ) : (
                <div>
                  <BiLike size={19} />
                </div>
              )}
              <span>{likeCount}</span>
            </button>
            <div className="position-relative">
              <button className="p-0 text-muted ms-2" onClick={() => setShowShareOptions(!showShareOptions)}>
                {!showShareOptions ? (
                  <>
                    <GoShareAndroid color="" /> Share
                  </>
                ) : (
                  <div className="text-danger" onClick={() => setShowShareOptions(!showShareOptions)}>
                    <IoCloseSharp size={20} color="red" /> Close
                  </div>
                )}
              </button>
              {showShareOptions && (
                <div
                  className="position-absolute bg-white shadow p-3 rounded-pill share-options-popup"
                  style={{
                    minWidth: "max-content",
                    bottom: "30px",
                    left: 0,
                    zIndex: 1000,
                  }}
                >
                  <div className="gap-2 d-flex">
                    <h5 className="align-self-center mb-0"></h5>
                    <FacebookShareButton url={shareUrl} quote={title}>
                      <FacebookIcon size={32} round />
                    </FacebookShareButton>
                    <TwitterShareButton url={shareUrl} title={title}>
                      <TwitterIcon size={32} round />
                    </TwitterShareButton>
                    <LinkedinShareButton url={shareUrl}>
                      <LinkedinIcon size={32} round />
                    </LinkedinShareButton>
                    {/* <div className="ms-3 align-self-center" onClick={() => setShowShareOptions(!showShareOptions)}>
                  <IoCloseSharp size={22} color="red" />
                </div> */}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div>
            <button onClick={() => setReply(!reply)} className="text-dark">
              <HiReply /> &nbsp;Reply
            </button>
          </div>
        </div>
      </div>
      {reply && (
        <form className="mt-4" onSubmit={handleSubmit(handleReplySubmit)}>
          <label>Reply from {data?.business?.name}</label>
          <textarea {...register("content", { required: "Please enter your reply" })} className="rounded-4" placeholder="Comment here" />
          {errors.reply && <span className="error">{errors.reply.message}</span>}
          <button className="default__btn mt-2" type="submit">
            <span>Submit</span>
          </button>
        </form>
      )}
    </div>
  );
};

export default CommentCard;
