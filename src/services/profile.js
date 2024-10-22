import { apiClient } from "./api";

const API_URL = "users/edit";

export const getUserProfile = async () => {
  try {
    const response = await apiClient.get(API_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data.user;
  } catch (error) {
    throw error.response?.data?.message || "Lỗi lấy thông tin người dùng";
  }
};

export const updateUserProfile = async (data) => {
  try {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (data[key]) formData.append(key, data[key]);
    });
    const token = localStorage.getItem("token");
    const response = await apiClient.put(API_URL, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.user;
  } catch (error) {
    throw error.response?.data?.message || "Lỗi cập nhật thông tin người dùng";
  }
};
