import React, { useEffect, useState } from "react";
import { ReactSVG } from "react-svg";
import { GoThumbsup, GoShareAndroid } from "react-icons/go";
import { format } from "date-fns";
import "./ReviewsDetail.scss";
import userImg from "../../../assets/unknow-user.png";
import RatingStar from "../../../assets/Dashboard/RatingStar_0.svg";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { IMG_URL, REACT_APP_API_URL } from "../../../constants/constants";
import { apiDeleteNew, apiGet, apiPost } from "../../../services/userAuth";
import PlaceholderImg from "../../../Shared/PlaceholderImg/PlaceholderImg";
import BlogDetailLoader from "../../../Shared/Loader/BlogDetailLoader/BlogDetailLoader";
import { getStorage } from "../../../services/storage";
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, LinkedinShareButton, LinkedinIcon } from "react-share";
import { HiThumbUp } from "react-icons/hi";
import { HiOutlineHandThumbDown, HiOutlineHandThumbUp } from "react-icons/hi2";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { FaRegComments } from "react-icons/fa6";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { IoCloseSharp } from "react-icons/io5";
import verified from "../../../assets/verified.svg";

const ReviewsDetail = () => {
  const location = useLocation();
  const currentUrl = window.location.origin + location.pathname + location.search;
  const token = getStorage("token");
  const userInfo = JSON.parse(getStorage("userInfo"));
  const shareUrl = `${currentUrl}`;
  const title = "TrustyFeedback";

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [reply, setReply] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [showShareOptions, setShowShareOptions] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Fetch review data
  const getOne = async () => {
    if (!id) {
      setLoading(false);
      return;
    }

    setLoading(true);
    const tokenS = token ? token : "";
    try {
      const URL = `${REACT_APP_API_URL}review/${id}`;
      const response = await apiGet(URL, {}, tokenS);
      if (response.success) {
        const reviewData = response.data.payload;
        setData(reviewData);
        setLikeCount(reviewData._count?.like || 0); // Set total like count
        setLiked(reviewData?.like?.some((like) => like.author_id === userInfo?.id));
      } else {
        setData(null);
      }
    } catch (error) {
      console.error("Error fetching review details:", error);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOne();
  }, [id]);

  // Like functionality
  const likeFunc = async (r_id) => {
    if (token) {
      try {
        const url = `${REACT_APP_API_URL}like`;
        const params = { review_id: r_id };
        const response = await apiPost(url, params, token);
        if (response.success) {
          setLiked(true); // User has liked the review
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
        navigate("/auth/login"); // Redirect to login page
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
          setLiked(false); // User has unliked the review
          setLikeCount((prevCount) => prevCount - 1); // Decrement like count
        } else {
          toast.error(response.message || "Failed to unlike the comment.");
        }
      } catch (error) {
        toast.error("An error occurred while unliking the comment.");
      }
    } else {
      toast.error("You are not an authorized user. Please login.");
      setTimeout(() => {
        navigate("/auth/login"); // Redirect to login page
      }, 2000);
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
    <>
      {loading ? (
        <div className="my-3">
          <BlogDetailLoader />
        </div>
      ) : (
        <main className="review__single">
          <div className="bg__animation__wrap">
            <div className="bg_circle_one"></div>
            <div className="bg_circle_two"></div>
            <div className="bg_circle_three"></div>
            <div className="bg_circle_four"></div>
          </div>
          <section className="review__single__page">
            <div className="container">
              <div style={{ display: "flex", gap: 10 }} className="rd__head">
                Review of <a href="#">{data?.business?.name}</a>
                {data?.business?.verified_status === "ACTIVE" && (
                  <span>
                    <ReactSVG src={verified} />
                  </span>
                )}
              </div>
              <div className="comment__card">
                <div className="d-flex justify-content-between">
                  <div className="d-flex">
                    <div className="user__img">{data?.user?.image ? <img src={IMG_URL + data?.user?.image} /> : <PlaceholderImg />}</div>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }} className="user-detail">
                      <h6 className="mb-0">{data?.user?.name ? data?.user?.name : "-"}</h6>
                      {data?.user?.verified_status === "ACTIVE" && <ReactSVG src={verified} />}
                      {/* <p className="mb-0">{data?.user?.roles?.name ? data?.user?.roles?.name : ""}</p> */}
                    </div>
                  </div>
                  <div className="rating__star">
                    {Array.from({ length: data?.rating || 0 })?.map((_, index) => (
                      <div key={index}>
                        <ReactSVG src={RatingStar} />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="comment__detail">
                  <div className="mb-4">
                    <h6>{data?.title}</h6>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: data?.comment,
                      }}
                    />
                  </div>
                  {data?.images.map((i, key) => (
                    <img loading="lazy" src={IMG_URL + i.file_path} />
                  ))}
                  {data && data?.created_at && (
                    <div className="comment__date">
                      <span>Posted Date:</span> {format(new Date(data?.created_at), "MMM dd, yyyy")}
                    </div>
                  )}
                  <hr className="border-secondary" />
                  <div className="d-flex bottom__share__btn position-relative">
                    <button type="button" className="p-0 text-muted d-flex" onClick={liked ? () => dislikeFunc(data?.id) : () => likeFunc(data?.id)}>
                      <p className="count-likes align-self-center mb-0">{likeCount}</p>
                      {liked ? (
                        <div>
                          <BiSolidLike size={19} />
                        </div>
                      ) : (
                        <div>
                          <BiLike size={19} />
                        </div>
                      )}
                    </button>

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
                    {userInfo?.business_id === data?.business?.id && (
                      <button className="p-0 text-muted ms-2" onClick={() => setReply(!reply)}>
                        <FaRegComments color="" /> Reply
                      </button>
                    )}
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
                        </div>
                      </div>
                    )}
                  </div>
                  {userInfo?.business_id === data?.business?.id ? (
                    <div className="replied___boxs">
                      <>
                        <div className="reply__box">
                          {data?.comments[0]?.content ? (
                            <>
                              <h6>Reply from {data?.business?.name}</h6>
                              <p>{data?.comments[0]?.content}</p>
                            </>
                          ) : (
                            <form onSubmit={handleSubmit(handleReplySubmit)}>
                              <label>Reply from {data?.business?.name}</label>
                              <textarea {...register("content", { required: "Please enter your reply" })} className="rounded-4" placeholder="Comment here" />
                              {errors.reply && <span className="error">{errors.reply.message}</span>}
                              <button className="default__btn mt-2" type="submit">
                                <span>Submit</span>
                              </button>
                            </form>
                          )}
                        </div>
                      </>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </section>
        </main>
      )}
    </>
  );
};

export default ReviewsDetail;
