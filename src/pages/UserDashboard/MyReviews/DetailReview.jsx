import React, { useContext, useEffect, useState } from "react";
import { ReactSVG } from "react-svg";
import { GoThumbsup, GoShareAndroid } from "react-icons/go";
import { format } from "date-fns";
import "../../Reviews/ReviewsDetail/ReviewsDetail.scss";
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
import { MdBlock } from "react-icons/md";
import { AuthContext } from "../../../context/UserDashboardSlice";

const ReviewsDetail = () => {
  const location = useLocation();
  const currentUrl = window.location.origin + location.pathname + location.search;
  const token = getStorage("token");
  const userInfo = JSON.parse(getStorage("userInfo"));
  const shareUrl = `${currentUrl}`;
  const title = "TrustyFeedback";
  const { user } = useContext(AuthContext);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [reply, setReply] = useState();
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
        setLikeCount(reviewData._count?.like || 0);
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

  const handleReplySubmit = async (dataS) => {
    const url = `${REACT_APP_API_URL}comment`;
    const params = { content: dataS.content, review_id: data?.id };
    const response = await apiPost(url, params, token);
    if (response.success === true) {
      setReply(false);
      reset();
      getOne();
    }
  };
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

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
  return (
    <div id="detailed__rview">
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
              <div className="rd__head">
                Review of <a href="#">{data?.business?.name}</a>
              </div>
              <div className="comment__card bg-white">
                {data?.approved_by === null && (
                  <div className={`align-self-start p-2 px-3 rounded-pill bg-warning text-dark mb-3`} style={{ width: "max-content" }}>
                    {data?.approved_by === null && "Pending"}
                  </div>
                )}
                <div className="d-flex justify-content-between">
                  <div className="d-flex">
                    <div className="user__img border rounded-circle">{data?.user?.image ? <img src={IMG_URL + data?.user?.image} /> : <PlaceholderImg />}</div>
                    <div className="user-detail">
                      <h6 className="mb-0">{data?.user?.name ? data?.user?.name : "-"}</h6>
                      <p className="mb-0">{data?.user?.roles?.name ? data?.user?.roles?.name : ""}</p>
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
                </div>
                <div className="comment__detail">
                  {userInfo?.role_id === 3 ? (
                    <div className="rating__star mb-3">
                      {Array.from({ length: data?.rating || 0 }).map((_, index) => (
                        <div key={index}>
                          <ReactSVG src={RatingStar} />
                        </div>
                      ))}
                    </div>
                  ) : (
                    ""
                  )}
                  <span
                    dangerouslySetInnerHTML={{
                      __html: data?.comment,
                    }}
                  />
                  {data?.images.map((i, key) => (
                    <img loading="lazy" src={IMG_URL + i.file_path} />
                  ))}
                  {data && data?.created_at && (
                    <div className="comment__date">
                      <span>Posted Date:</span> {format(new Date(data?.created_at), "MMM dd, yyyy")}
                    </div>
                  )}
                  <hr className="border-secondary" />
                  {data?.approved_by !== null && (
                    <div className="d-flex bottom__share__btn position-relative">
                      <button type="button" className="p-0 text-muted d-flex" onClick={liked ? () => dislikeFunc(data?.id) : () => likeFunc(data?.id)}>
                        <div className="count-likes">{likeCount}</div>
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
                      {data?.comments.length === 0 && userInfo?.business_id === data?.business?.id && (
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
                  )}
                  {/* {data?.comments[0]?.content && ( */}
                  <div className="replied___boxs">
                    <>
                      <div className="">
                        {data?.comments.length === 0 && userInfo?.business_id === data?.business?.id && !reply ? (
                          <form onSubmit={handleSubmit(handleReplySubmit)}>
                            <label>Reply from {data?.business?.name}</label>
                            <textarea {...register("content", { required: "Please enter your reply" })} className="rounded-4" placeholder="Comment here" />
                            {errors.reply && <span className="error">{errors.reply.message}</span>}
                            <button className="default__btn mt-2" type="submit">
                              <span>Submit</span>
                            </button>
                          </form>
                        ) : null}
                        {data?.comments[0]?.content && (
                          <>
                            {data?.comments?.map((i) => (
                              <div className="reply__box mb-2" style={{ backgroundColor: "#eaf0f8" }}>
                                <h6>Reply from {data?.business?.name}</h6>
                                <p>{i?.content}</p>
                              </div>
                            ))}
                          </>
                        )}
                      </div>
                    </>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      )}
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

export default ReviewsDetail;
