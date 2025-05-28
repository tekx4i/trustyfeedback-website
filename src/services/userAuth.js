import axios from "axios";
import { Toaster, toast, resolveValue } from "react-hot-toast";

export async function apiPost(url, params, token) {
  try {
    const isFormData = params instanceof FormData;
    const config = {
      headers: {
        "Content-Type": isFormData ? "multipart/form-data" : "application/json",
      },
    };
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    const response = await axios.post(url, params, config);

    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
    return response.data;
  } catch (error) {
    if (error.response?.data?.errors && error.response.data.errors.length > 0) {
      const errorMessage = error.response.data.errors[0].message || "Network error";
      toast.error(errorMessage);
    } else {
      const errorMessage = error.response.data.message || "Network error";
      toast.error(errorMessage);
      return error.response.data;
    }
    return {
      success: false,
      message: errorMessage,
    };
  }
}

export const apiDelete = async (url, token) => {
  if (!token) {
    toast.error("Authorization token is missing.");
    return { success: false, message: "Authorization token is required." };
  }

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.delete(url, config);
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
    return response;
  } catch (error) {
    if (error.response?.data?.errors && error.response.data.errors.length > 0) {
      const errorMessage = error.response.data.errors[0].message || "Network error";
      toast.error(errorMessage);
    } else {
      const errorMessage = error.response.data.message || "Network error";
      toast.error(errorMessage);
    }
    return {
      success: false,
      message: errorMessage,
    };
  }
};

export const apiDeleteNew = async (url, params, token) => {
  if (!token) {
    toast.error("Authorization token is missing.");
    return { success: false, message: "Authorization token is required." };
  }

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: params, // Send params in the request body (axios delete supports data)
    };

    const response = await axios.delete(url, config);
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
    return response.data; // Returning the response.data directly for consistency
  } catch (error) {
    let errorMessage = "Network error"; // Default error message
    if (error.response?.data?.errors && error.response.data.errors.length > 0) {
      errorMessage = error.response.data.errors[0].message || errorMessage;
    } else if (error.response?.data?.message) {
      errorMessage = error.response.data.message || errorMessage;
    }
    toast.error(errorMessage);
    return {
      success: false,
      message: errorMessage,
    };
  }
};

export const apiGet = async (url, params = {}, token) => {
  try {
    // Build headers conditionally
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const response = await axios.get(url, {
      params,
      headers,
    });
    if (response.data.success) {
      return { success: true, data: response.data };
    } else {
      toast.error(response.data.message || "Request failed.");
      return { success: false, message: response.data.message || "Request failed." };
    }
  } catch (error) {
    const msg404 = error.response?.data?.status;
    if (msg404) {
    } else {
      const errorMessage = error.response?.data?.errors?.[0]?.message || error.response?.data?.message || "Network error";
      toast.error(errorMessage);
    }

    return {
      success: false,
      message: errorMessage,
    };
  }
};

export async function apiPut(url, data = {}, token) {
  try {
    const isFormData = data instanceof FormData;
    const config = {
      headers: {
        "Content-Type": isFormData ? "multipart/form-data" : "application/json",
      },
    };

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    const response = await axios.put(url, data, config);

    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
    return response.data;
  } catch (error) {
    if (error.response?.data?.errors && error.response.data.errors.length > 0) {
      const errorMessage = error.response.data.errors[0].message || "Network error";
      toast.error(errorMessage);
    } else {
      const errorMessage = error.response?.data?.message || "Network error";
      toast.error(errorMessage);
    }
    return {
      success: false,
      message: errorMessage,
    };
  }
}

export default {
  apiPost,
  apiDelete,
  apiDeleteNew,
  apiGet,
  apiPut,
};
