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
