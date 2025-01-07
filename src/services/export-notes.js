import { apiClient } from "./api";

const token = localStorage.getItem("token");

export const fetchExportNotesService = async () => {
  try {
    const response = await apiClient.get("/api/export-notes", {
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

export const deleteExportNotesService = async (userId) => {
  return await apiClient.delete(
    `/api/export-notes/${userId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const createExportNotesService = async (createData) => {
  try {
    const response = await apiClient.post("api/export-notes/create", createData, {
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

export const getDetailExportNotesService = async (userId) => {
  try {
    const response = await apiClient.get(`/api/export-notes/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateExportNotesService = async (userId, formData) => {
  try {
    const response = await apiClient.put(`/api/export-notes/${userId}`, formData, {
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
