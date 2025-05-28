import React, { useState, useRef, useEffect } from "react";
import JoditEditor from "jodit-react";
import { useForm } from "react-hook-form";
import { apiDeleteNew, apiGet, apiPost, apiPut } from "../../../services/userAuth";
import { IMG_URL, REACT_APP_API_URL } from "../../../constants/constants";
import { getStorage } from "../../../services/storage";
import { Link, useNavigate } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import { GoPencil } from "react-icons/go";
import Spinner from "../../../Shared/Loader/Spinner";
import TableLoader from "../../../Shared/Loader/TableLoader";
import { FaEdit, FaRegEye } from "react-icons/fa";
import { MdOutlineModeEdit } from "react-icons/md";

const DashboardStories = () => {
  const { register, handleSubmit, reset } = useForm();
  const [dataOne, setDataOne] = useState([]);

  const {
    register: editRegister,
    handleSubmit: editHandleSubmit,
    setValue,
  } = useForm({
    defaultValues: {
      id: dataOne?.id,
      title: dataOne?.title,
      content: dataOne?.comment,
      imageUrl: dataOne?.images || [],
    },
  });

  const token = getStorage("token");
  const navigate = useNavigate();
  const [addLoading, setAddLoading] = useState();
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const editor = useRef(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState();
  const [loadingOne, setLoadingOne] = useState();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    setAddLoading(true);
    if (token) {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("content", content);
      if (image) {
        const imageBlob = await fetch(image).then((response) => response.blob());
        formData.append("imageUrl", imageBlob, imageBlob.name);
      }
      try {
        const url = `${REACT_APP_API_URL}story`;
        const response = await apiPost(url, formData, token);

        if (response.success === true) {
          setAddLoading(false);
          getStories();
          document.getElementById("story__id").click();
          reset();
          setContent("");
          setImage(null);
        }
      } catch (err) {
        setAddLoading(false);
      } finally {
        setAddLoading(false);
      }
    }
  };

  const getStories = async () => {
    setLoading(true);
    const tokenS = token ? token : "";
    try {
      const URL = `${REACT_APP_API_URL}story`;
      const response = await apiGet(URL, {}, tokenS);
      if (response.success) {
        const res = response.data.payload.records;
        setData(res);
      }
    } catch (error) {
      console.error("Error fetching review details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStories();
  }, []);

  useEffect(() => {
    setContent(dataOne.content || "");
    setImage(dataOne.imageUrl || "");
  }, [dataOne]);

  // Dislike functionality
  const deleteStory = async (id) => {
    if (token) {
      try {
        const url = `${REACT_APP_API_URL}story/${id}`;
        const params = {};
        const response = await apiDeleteNew(url, params, token);
        if (response.success) {
          getStories();
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

  // Fetch one story data
  const getOne = async (id) => {
    if (!id) {
      setLoadingOne(false);
      return;
    }

    setLoadingOne(true);
    const tokenS = token ? token : "";
    try {
      const URL = `${REACT_APP_API_URL}story/${id}`;
      const response = await apiGet(URL, {}, tokenS);
      if (response.success) {
        const reviewData = response.data.payload;
        setDataOne(reviewData);
        setValue("title", reviewData.title);
        setValue("content", content);
        setValue("imageUrl", image);
        setValue("id", id);
      } else {
      }
    } catch (error) {
      console.error("Error fetching review details:", error);
      setDataOne(null);
    } finally {
      setLoadingOne(false);
    }
  };

  const editSubmit = async (data) => {
    if (token) {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("content", content); // Use the state variable here
      if (image && image !== dataOne?.imageUrl) {
        // Check only if new image is uploaded
        const imageBlob = await fetch(image).then((response) => response.blob());
        formData.append("imageUrl", imageBlob, imageBlob.name);
      }

      try {
        const url = `${REACT_APP_API_URL}story/${dataOne?.id}`;
        const response = await apiPut(url, formData, token);

        if (response.success === true) {
          setAddLoading(false);
          getStories();
          document.getElementById("story__id").click();
          reset();
          setContent("");
          setImage(null);
        }
      } catch (err) {
      } finally {
      }
    }
  };

  useEffect(() => {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipTriggerList.forEach((tooltipTriggerEl) => {
      new window.bootstrap.Tooltip(tooltipTriggerEl);
    });
  }, []);

  return (
    <div>
      <div className={`d-flex justify-content-between align-items-center ${window.innerWidth < 992 ? "mt-4 mx-2" : ""}`}>
        <h4 className="m-0">Customer Story</h4>
        <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" className="rounded-pill border-0 bg-primary text-white px-4 fw-normal py-2">
          + Add Story
        </button>
      </div>
      {loading ? (
        <TableLoader />
      ) : data?.length > 0 ? (
        <div className="table-responsive mt-4">
          <table className="table">
            <thead>
              <tr>
                <th className="p-3">Title</th>
                <th className="p-3">Content</th>
                <th className="p-3">Image</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data?.map((i, idx) => {
                  const truncateText = (text, maxLength) => {
                    if (!text) return ""; // Handle null or undefined text
                    if (text.length <= maxLength) return text;
                    return text.substring(0, maxLength) + "...";
                  };

                  const truncatedContent = truncateText(i?.content, 100);

                  return (
                    <tr>
                      <td className="p-3">{i.title}</td>
                      <td className="p-3 w-50">
                        <span
                          dangerouslySetInnerHTML={{
                            __html: truncatedContent,
                          }}
                        />
                        {truncatedContent.length > 100 && (
                          <span>
                            <Link className="text-primary" to={`/business/stories/stories-detail/${i.id}`}>
                              show more
                            </Link>
                          </span>
                        )}
                      </td>
                      <td className="p-3">{i.imageUrl ? <img style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "6px" }} src={IMG_URL + i.imageUrl} /> : "No image"}</td>
                      <td className="p-3">
                        <div className="d-flex gap-2">
                          <Link className="text-primary" to={`/business/stories/stories-detail/${i.id}`} data-bs-toggle="tooltip" title="View Details">
                            <FaRegEye size={20} color={"#29378C"} />
                          </Link>
                          <button className="btn p-0" onClick={() => getOne(i.id)} type="button" data-bs-toggle="modal" data-bs-target="#Edit" data-bs-toggle="tooltip" title="Edit Story">
                            <MdOutlineModeEdit size={20} color={"#29378C"} />
                          </button>
                          <button className="btn p-0" onClick={() => deleteStory(i.id)} data-bs-toggle="tooltip" title="Delete Story">
                            <AiFillDelete size={20} color={"red"} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          {/* Edit Story */}
          <div className="modal fade" id="Edit" tabIndex="-1" aria-labelledby="EditLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content p-4">
                <form onSubmit={editHandleSubmit(editSubmit)}>
                  <div className="modal-header border-0">
                    <h4 className="align-self-center mb-0">Edit Story</h4>
                    <button id="story__id" type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>

                  <div className="modal-body px-4">
                    {/* Title Field */}
                    <div className="mb-3">
                      <label htmlFor="title" className="form-label">
                        Title
                      </label>
                      <input type="text" className="rounded-2" id="title" placeholder="Enter title.." defaultValue={dataOne?.title} {...editRegister("title", { required: true })} />
                    </div>

                    {/* Jodit Editor for Content */}
                    <div className="mb-3">
                      <label htmlFor="content" className="form-label">
                        Story Content
                      </label>
                      <JoditEditor ref={editor} value={content} onChange={(newContent) => setContent(newContent)} />
                    </div>

                    {/* Image Upload Field */}
                    <div className="mb-3">
                      <label htmlFor="imageUpload" className="form-label">
                        Upload Image
                      </label>
                      <input type="file" className="rounded-2" id="imageUpload" accept="image/*" onChange={handleImageUpload} />
                    </div>

                    {/* Image Preview */}

                    {dataOne?.imageUrl ? (
                      <div className="mb-3">
                        <label className="form-label">Image Preview</label>
                        <div>
                          <img src={IMG_URL + image} alt="Preview" style={{ maxWidth: "80%", maxHeight: "200px" }} />
                        </div>
                      </div>
                    ) : (
                      <div className="mb-3">
                        <div>
                          <img src={image} alt="Preview" style={{ maxWidth: "80%", maxHeight: "200px" }} />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="modal-footer border-0">
                    <button type="submit" className="default__btn">
                      <span>Update</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="p-2">No data found.</p>
      )}

      {/* ADD Story */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content p-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="modal-header border-0">
                <h4 className="align-self-center mb-0">Add Story</h4>
                <button id="story__id" type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>

              <div className="modal-body px-4">
                {/* Title Field */}
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input type="text" className="rounded-2" id="title" placeholder="Enter title.." {...register("title", { required: true })} />
                </div>

                {/* Jodit Editor for Content */}
                <div className="mb-3">
                  <label htmlFor="content" className="form-label">
                    Story Content
                  </label>
                  <JoditEditor ref={editor} value={content} onChange={(newContent) => setContent(newContent)} />
                </div>

                {/* Image Upload Field */}
                <div className="mb-3">
                  <label htmlFor="imageUpload" className="form-label">
                    Upload Image
                  </label>
                  <input type="file" className="rounded-2" id="imageUpload" accept="image/*" onChange={handleImageUpload} />
                </div>

                {/* Image Preview */}
                {image && (
                  <div className="mb-3">
                    <label className="form-label">Image Preview</label>
                    <div>
                      <img src={image} alt="Preview" style={{ maxWidth: "100%", maxHeight: "300px" }} />
                    </div>
                  </div>
                )}
              </div>

              <div className="modal-footer border-0">
                <button type="submit" className="default__btn">
                  <span> {addLoading ? <Spinner /> : "Submit"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStories;
