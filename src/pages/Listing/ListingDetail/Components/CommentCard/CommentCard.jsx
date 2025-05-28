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
import { apiDeleteNew, apiPost } from "../../../../../services/userAuth";
import { toast } from "react-hot-toast";
import { HiThumbUp } from "react-icons/hi";
import { HiOutlineHandThumbDown, HiOutlineHandThumbUp } from "react-icons/hi2";
import { getStorage } from "../../../../../services/storage";
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, LinkedinShareButton, LinkedinIcon } from "react-share";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { IoCloseSharp } from "react-icons/io5";
import verifiedIcon from "../../../../../assets/approved-icon.svg";

const CommentCard = ({ data, business_id, getReviews }) => {
  const title = "TrustyFeedback";

  const navigate = useNavigate();
  const [showFullComment, setShowFullComment] = useState(false);
  const [likes, setLikes] = useState({});
  const [likeCount, setLikeCount] = useState(data?._count?.like || 0);
  const token = getStorage("token");
  const userInfo = JSON.parse(getStorage("userInfo"));
  const [showShareOptions, setShowShareOptions] = useState(false);

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

  const truncatedComment = data.comment?.length > 50 ? data.comment?.slice(0, 50) + "..." : data.comment;

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

  return (
    <div className="comment__card">
      <Link to={`/reviews/review-detail/${data?.id}`} className="d-flex justify-content-between">
        <div className="d-flex">
          <div className="user__img">{data?.user?.image ? <img src={IMG_URL + data?.user?.image} alt="User" /> : <PlaceholderImg />}</div>
          <div className="user-detail">
            <h6 className="mb-0 d-flex">
              {data?.user?.name} &nbsp;
              {data?.verified_status === "ACTIVE" && <ReactSVG src={verifiedIcon} />}
            </h6>
            {/* <p className="mb-0">{Badge}</p> */}
          </div>
        </div>
        <div className="rating__star">
          {Array.from({ length: data?.rating || 0 })?.map((_, index) => (
            <div key={index}>
              <ReactSVG src={RatingStar} />
            </div>
          ))}
        </div>
      </Link>
      <div className="comment__detail">
        <div className="mt-2 mb-3">{data?.images && data?.images.map((item, key) => <img key={key} className="images_of_comment" src={IMG_URL + item.file_path} alt={`Comment Image ${key + 1}`} />)}</div>
        <h6 className="mb-2">{data?.title ? data?.title : ""}</h6>
        <p>
          <span
            dangerouslySetInnerHTML={{
              __html: showFullComment ? data.comment : truncatedComment,
            }}
          />
          {data.comment?.length > 50 && (
            <button onClick={toggleComment} className="btn btn-link p-0 ms-1" style={{ fontSize: "12px" }}>
              {showFullComment ? "Show Less" : "Show More"}
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
      </div>
      <hr className="border-secondary" />
      <div className="d-flex bottom__share__btn">
        {token ? (
          <button type="button" className={`p-0 text-muted d-flex`}>
            <p className="count-likes mb-0 align-self-center">{likeCount}</p>
            {likes[data?.id] ? (
              <div
                className="like-btn align-self-center"
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
            className="p-0 text-muted d-flex align-self-center"
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
    </div>
  );
};

export default CommentCard;
