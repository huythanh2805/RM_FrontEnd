import jwtDecode from "jwt-decode";
import { apiClient } from "./api";

const token = localStorage.getItem("token");

export const fetchImportNotesService = async () => {
  try {
    const response = await apiClient.get("/api/import-notes", {
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

export const deleteImportNotesService = async (userId) => {
  return await apiClient.delete(
    `/api/import-notes/${userId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const createImportNotesService = async (createData) => {
  try {
    console.log(createData);
    const response = await apiClient.post(
      "api/import-notes/create",
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

export const getDetailImportNotesService = async (userId) => {
  try {
    const response = await apiClient.get(`/api/import-notes/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateImportNotesService = async (userId, formData) => {
  try {
    const response = await apiClient.put(`/api/import-notes/${userId}`, formData, {
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
