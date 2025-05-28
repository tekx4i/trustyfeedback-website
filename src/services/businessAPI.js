import axios from "axios";

const getBusinessDataAPI = async () => {
  try {
    const apiUrl = `${
      import.meta.env.VITE_BASE_URL
    }/api/v1/business?sort=rating:desc`;
    const response = await axios.get(apiUrl);
    const { payload } = response.data;

    return {
      businessDataPayload: payload,
    };
  } catch (error) {
    console.log(error);
  }
};

const getBusinessBlogsAPI = async () => {
  try {
    const apiUrl = `${import.meta.env.VITE_BASE_URL}/api/v1/blog`;
    const response = await axios.get(apiUrl);
    const { payload } = response.data;

    return {
      blogsPayload: payload,
    };
  } catch (error) {
    console.log(error);
  }
};

const getBusinessBlogsByIdAPI = async () => {
  try {
    const apiUrl = `${import.meta.env.VITE_BASE_URL}/api/v1/blog/1`;
    const response = await axios.get(apiUrl);
    const { payload } = response.data;

    return {
      blogsByIdPayload: payload,
    };
  } catch (error) {
    console.log(error);
  }
};

const getMyReviewsAPI = async () => {
  try {
    const apiUrl = `${import.meta.env.VITE_BASE_URL}/api/v1/review`;
    const headers = {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzM1Mjc3MDg4LCJleHAiOjE3MzU4ODE4ODh9.z_bUsMeEGRFL1eJPs268YEomeks0nJB7H3s6vvm7cLk`,
    };
    const response = await axios.get(apiUrl, { headers });
    const { payload } = response.data;

    return {
      myReviewsPayload: payload,
    };
  } catch (error) {
    console.log(error);
  }
};

export {
  getBusinessDataAPI,
  getBusinessBlogsAPI,
  getBusinessBlogsByIdAPI,
  getMyReviewsAPI,
};
