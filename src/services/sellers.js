import { apiClient } from "./api";

const token = localStorage.getItem("token");

export const fetchSellerService = async () => {
  try {
    const response = await apiClient.get("/api/sellers", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteSellersService = async (userId) => {
  return await apiClient.delete(
    `/api/sellers/${userId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const createSellerService = async (createData) => {
  try {
    const response = await apiClient.post("api/sellers/create", createData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getDetailSellerService = async (userId) => {
  try {
    const response = await apiClient.get(`/api/sellers/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Cập nhật thông tin người dùng
export const updateSellersService = async (userId, formData) => {
  try {
    const response = await apiClient.put(`/api/sellers/${userId}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
