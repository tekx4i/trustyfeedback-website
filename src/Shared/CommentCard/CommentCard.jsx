import React, { useState, useEffect, useContext } from "react";
import { ReactSVG } from "react-svg";
import { format } from "date-fns";
import { GoShareAndroid } from "react-icons/go";
import "./CommentCard.scss";
import RatingStar from "../../assets/Dashboard/RatingStar_0.svg";
import PlaceholderImg from "../../Shared/PlaceholderImg/PlaceholderImg";
import { IMG_URL, REACT_APP_API_URL } from "../../constants/constants";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getStorage } from "../../services/storage";
import Bookmark from "../../assets/bookmark.svg";
import BookmarkActive from "../../assets/archive.svg";
import Spinner from "../../Shared/Loader/Spinner";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { MdBlock } from "react-icons/md";
import { apiDeleteNew, apiPost } from "../../services/userAuth";
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, LinkedinShareButton, LinkedinIcon } from "react-share";
import { HiReply, HiThumbUp } from "react-icons/hi";
import { IoCloseSharp } from "react-icons/io5";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/UserDashboardSlice";

const CommentCard = ({ data, responds, bgColor }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const location = useLocation();
  const currentUrl = window.location.origin + location.pathname + location.search;
  const [showShareOptions, setShowShareOptions] = useState(false);
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
  const { user } = useContext(AuthContext);
  const [favLoading, setFavLoading] = useState({
    loading: false,
    id: 0,
  });
  const [liked, setLiked] = useState(false);

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
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  // inappropriate
  const reportSubmit = async () => {
    if (message.trim() === "") {
      alert("Message cannot be empty!");
      return;
    }

    const url = `${REACT_APP_API_URL}review/report`;
    const params = { reason: message, review_id: data?.id };
    const response = await apiPost(url, params, token);
    if (response.success === true) {
      document.getElementById("closeModal__").click();
    }
    setMessage("");
  };

  const [likedBook, setLikedBook] = useState({});
  const [reply, setReply] = useState();

  const handleReplySubmit = async (dataS) => {
    const url = `${REACT_APP_API_URL}comment`;
    const params = { content: dataS.content, review_id: data?.id };
    const response = await apiPost(url, params, token);
    if (response.success === true) {
      setReply(true);
      reset();
    }
  };

  // Like functionality
  const likeFunc = async (r_id) => {
    if (token) {
      try {
        const url = `${REACT_APP_API_URL}like`;
        const params = { review_id: r_id };
        const response = await apiPost(url, params, token);
        if (response.success) {
          setLiked(false);
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
          setLiked(true);
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
        {userInfo?.role_id !== 3 ? (
          <div className="rating__star">
            {Array.from({ length: data?.rating || 0 }).map((_, index) => (
              <div key={index}>
                <ReactSVG src={RatingStar} />
              </div>
            ))}
          </div>
        ) : (
          <>
            {user?.role_id === 3 && user?.verified_status === "ACTIVE" && (
              <button className="btn" data-bs-toggle="modal" data-bs-target="#inApp">
                <MdBlock /> Inappropriate
              </button>
            )}
          </>
        )}
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
      <div className="d-flex justify-content-between bottom__share__btn">
        <div className="d-flex">
          <button type="button" onClick={!liked ? () => dislikeFunc(data?.id) : () => likeFunc(data?.id)}>
            {!liked ? (
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
      <div className="d-flex flex-wrap bottom__share__btn w-100 mt-4">
        {data?.comments?.map((i) => (
          <div className="reply__of_review">
            <h6>Reply from you</h6>
            <p className="mb-0">{i.content}</p>
          </div>
        ))}
      </div>
      <div className="modal fade" id="inApp" tabIndex="-1" aria-labelledby="inAppLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="inAppLabel">
                Report a Review
              </h1>
              <button id="closeModal__" type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="form-floating">
                <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea" value={message} onChange={handleInputChange}></textarea>
                <label htmlFor="floatingTextarea">Message..</label>
              </div>
              <button className="btn btn-primary mt-3 submit__report" onClick={reportSubmit}>
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
