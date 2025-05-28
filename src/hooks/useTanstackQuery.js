import { useQuery } from "@tanstack/react-query";
import { getBusinessBlogsAPI, getBusinessBlogsByIdAPI, getBusinessDataAPI, getMyReviewsAPI } from "../services/businessAPI";

const useBusinessGetData = () => {
  const {
    data: getBusinessData,
    isLoading: businessDataLoading,
    error: businessDataError,
  } = useQuery({
    queryKey: ["get-business"],
    queryFn: async () => {
      const response = await getBusinessDataAPI();
      return response.payload || {};
    },
  });

  return {
    getBusinessData,
    businessDataLoading,
    businessDataError,
  };
};

const useBusinessBlogs = () => {
  const { data: businessBlogsData, isLoading: businessBlogsDataLoading } = useQuery({
    queryKey: ["business-blogs"],
    queryFn: async () => {
      const response = await getBusinessBlogsAPI();
      return response.blogsPayload?.records || {};
    },
    staleTime: 5 * 60 * 1000,
  });

  return {
    businessBlogsData,
    businessBlogsDataLoading,
  };
};

const useBusinessBlogsById = () => {
  const { data: businessBlogsByIdData, isLoading: businessBlogsByIdDataLoading } = useQuery({
    queryKey: ["business-blogs-by-id"],
    queryFn: async () => {
      const response = await getBusinessBlogsByIdAPI();
      return response.blogsByIdPayload || {};
    },
    staleTime: 5 * 60 * 1000,
  });

  return {
    businessBlogsByIdData,
    businessBlogsByIdDataLoading,
  };
};

const useMyReviews = () => {
  const { data: myReviewsData } = useQuery({
    queryKey: ["my-reviews"],
    queryFn: async () => {
      const response = await getMyReviewsAPI();
      return response.myReviewsPayload || {};
    },
    staleTime: 5 * 60 * 1000,
  });

  return {
    myReviewsData,
  };
};

export { useBusinessGetData, useBusinessBlogs, useBusinessBlogsById, useMyReviews };
