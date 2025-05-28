import React, { lazy, Suspense, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import "./BlogDetails.scss";
import userImg from "../../../assets/robert.png";
import Loader from "../../../Shared/Loader/Loader";
import { IMG_URL, REACT_APP_API_URL } from "../../../constants/constants";
import { apiGet, apiPost } from "../../../services/userAuth";
import PlaceholderImg from "../../../Shared/PlaceholderImg/PlaceholderImg";
import NoDataFound from "../../../Shared/NoDataFound/NoDataFound";
import BlogDetailLoader from "../../../Shared/Loader/BlogDetailLoader/BlogDetailLoader";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { getStorage } from "../../../services/storage";
import Spinner from "../../../Shared/Loader/Spinner";
const RelatedArticle = lazy(() => import("./Components/RelatedArticle"));
const BreadCrumb = lazy(() => import("../../../Shared/BreadCrumb/BreadCrumb"));

const BlogDetail = () => {
  const token = getStorage("token");
  const navigate = useNavigate();
  const { id, title } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [postLoading, setPostLoading] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const generateSlug = (title) => {
    return title
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
      const URL = `${REACT_APP_API_URL}blog/${id}`;
      const response = await apiGet(URL, {});
      if (response.success) {
        setData(response.data.payload);

        const slug = generateSlug(response.data.payload.title);
        if (!title || title !== slug) {
          navigate(`/blog/blog-detail/${id}/${slug}`, { replace: true });
        }
      } else {
        setData(null);
      }
    } catch (error) {
      console.error("Error fetching blog details:", error);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOne();
  }, [id]);

  const handleReplySubmit = async (dataS) => {
    setPostLoading(true);
    if (token) {
      const url = `${REACT_APP_API_URL}comment`;
      const params = { content: dataS.content, blog_id: data?.id };

      try {
        const response = await apiPost(url, params, token);
        reset();
        if (response.success === true) {
          setReply(true);
          reset();
        }
      } catch {
        setPostLoading(false);
      } finally {
        setPostLoading(false);
      }
    } else {
      setTimeout(() => {
        toast.error("You are not an authorized user. Please login.");
        navigate("/auth/login");
      }, 2000);
    }
  };

  return (
    <div className="single___b__wrap">
      <div className="bg__animation__wrap">
        <div className="bg_circle_one"></div>
        <div className="bg_circle_two"></div>
        <div className="bg_circle_three"></div>
        <div className="bg_circle_four"></div>
      </div>
      {loading ? (
        <div className="my-lg-5 my-3">
          <BlogDetailLoader />
        </div>
      ) : data ? (
        <Suspense fallback={<Loader />}>
          <section className="blog__detail__page">
            <div className="container">
              <div className="d-flex justify-content-center pag__wrap">
                <BreadCrumb active="Blog Detail" title={data?.title || "Blog Detail"} />
              </div>
              <h1 className="text-center">{data?.title}</h1>
              <div className="blog__metas d-flex align-items-center justify-content-center">
                {data?.author?.name || data?.author?.image ? (
                  <div className="singel__meta d-flex align-items-center">
                    <div className="author__avatar">{data?.author?.image ? <img src={IMG_URL + data?.author?.image} alt="Author" className="user-img" /> : <PlaceholderImg />}</div>
                    <p className="mb-0">
                      Article by: <a href="#">{data?.author?.name}</a>
                    </p>
                  </div>
                ) : null}
                {data && data?.createdAt && (
                  <div className="singel__meta">
                    <p className="mb-0">
                      Published: <a href="#">{format(new Date(data?.createdAt), "MMM dd, yyyy")}</a>
                    </p>
                  </div>
                )}
              </div>
              <div className="b__feature__img">{data?.file_url ? <img loading="lazy" src={IMG_URL + data?.file_url} alt="Main banner" /> : <PlaceholderImg />}</div>
              <div className="blog__content">
                <p dangerouslySetInnerHTML={{ __html: data?.content }} />
                <div className="hightlied__text">
                  <h3>Conclusion</h3>
                  <p className="mb-0">
                    Our mission is to make your day better. We get it. We like to squeeze the most out of every day and we want to help you live your best life too. Whether you're working hard or working out, a night owl or an early bird, staying focused or staying Zen, Boost Patches give you that
                    little extra something. We want you to give yourself a boost into better health, fitness, and mindfulness.
                  </p>
                </div>
              </div>
              <div className="leave__eply__form">
                <h3>Leave a Reply</h3>
                <form onSubmit={handleSubmit(handleReplySubmit)}>
                  <div className="row">
                    <div className="col-12">
                      <div className="single__field">
                        <textarea
                          {...register("content", {
                            required: "Please enter your reply",
                          })}
                          placeholder="Leave a comment"
                        ></textarea>
                        {errors.reply && <span className="error">{errors.reply.message}</span>}
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="single__field">
                        <input
                          {...register("name", {
                            required: "Please enter your name",
                          })}
                          type="text"
                          placeholder="Name"
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="single__field">
                        <input
                          {...register("email", {
                            required: "Please enter your email",
                          })}
                          type="email"
                          placeholder="Email"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <button className="default__btn">
                      <span>{postLoading ? <Spinner /> : "Submit"}</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </section>
          <RelatedArticle data={data} />
        </Suspense>
      ) : (
        <div className="py-5 d-flex flex-column align-items-center justify-content-center" style={{ height: "100vh" }}>
          <NoDataFound />
          <h1 className="text-center">No data found!</h1>
        </div>
      )}
    </div>
  );
};

export default BlogDetail;
