import jwtDecode from "jwt-decode";
import { apiClient } from "./api";

const token = localStorage.getItem("token");

export const fetchStocksService = async () => {
  try {
    const response = await apiClient.get("/api/stocks", {
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
export const fetchStocksServiceStatus = async () => {
  try {
    const response = await apiClient.get("/api/stocks/status", {
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

export const deleteStocksService = async (userId) => {
  return await apiClient.delete(
    `/api/stocks/${userId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const createStocksService = async (createData) => {
  try {
    const response = await apiClient.post("api/stocks/create", createData, {
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

export const getDetailStocksService = async (userId) => {
  try {
    const response = await apiClient.get(`/api/stocks/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateStocksService = async (userId, formData) => {
  try {
    const response = await apiClient.put(`/api/stocks/${userId}`, formData, {
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

export const updateStockTakeInventory = async (data) => {
  try {
    const response = await apiClient.patch("/api/stocks/update-take-inventory", { ...data, createdBy: jwtDecode(token).id }, {
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


export const getListTakeInventoryByStockID = async (id) => {
  try {
    const response = await apiClient.get(`/api/stocks/history-take-inventory/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};