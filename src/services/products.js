import jwtDecode from "jwt-decode";
import { apiClient } from "./api";

const token = localStorage.getItem("token");

export const fetchProductsService = async () => {
  try {
    const response = await apiClient.get("/api/products", {
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

export const deleteProductsService = async (userId) => {
  return await apiClient.delete(
    `/api/products/${userId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const createProductsService = async (createData) => {
  try {
    const response = await apiClient.post(
      "api/products/create",
      { ...createData, createdBy: jwtDecode(token).id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getDetailProductsService = async (userId) => {
  try {
    const response = await apiClient.get(`/api/products/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateProductsService = async (userId, formData) => {
  try {
    const response = await apiClient.put(
      `/api/products/${userId}`,
      { ...formData, createdBy: jwtDecode(token).id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
