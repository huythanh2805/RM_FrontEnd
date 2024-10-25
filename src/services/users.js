import { apiClient } from "./api";
export const userListService = async () => {
  try {
    const response = await apiClient.get("users/admin/list", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const addUserService = async (formData) => {
  try {
    const response = await apiClient.post("users/admin/add", formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data", // Important for file upload
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const updateUserIsDelete = async (userId) => {
  const token = localStorage.getItem("token");
  return await apiClient.put(
    `/users/admin/delete/${userId}`,
    { isdelete: 1 },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
// Lấy thông tin một người dùng theo ID
export const getUserByIdService = async (userId) => {
  try {
    const response = await apiClient.get(`/users/admin/edit/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Cập nhật thông tin người dùng
export const updateUserService = async (userId, formData) => {
  try {
    const response = await apiClient.put(`/users/admin/edit/${userId}`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data", // Quan trọng cho việc tải lên file
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
