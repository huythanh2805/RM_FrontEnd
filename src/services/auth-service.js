import { apiClient } from "./api";

export const registerService = async (request = {}) => {
  try {
    const response = await apiClient.post("users/register", request);
    return response.data; // Đảm bảo trả về dữ liệu từ phản hồi
  } catch (error) {
    console.error(error);
    throw error; // Ném lại lỗi để có thể xử lý ở nơi gọi hàm
  }
};

export const loginService = async (request = {}) => {
  try {
    const response = await apiClient.post("users/login", request);
    return response; // Trả về phản hồi khi đăng nhập thành công
  } catch (error) {
    console.error(error);
    throw error; // Ném lỗi để có thể xử lý ở nơi gọi hàm
  }
};
export const PasswordService = {
  requestPasswordReset: async (request = {}) => {
    try {
      const response = await apiClient.post("users/forgot-password", request, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response;
    } catch (error) {
      console.error("Error in requestPasswordReset:", error);
      throw error;
    }
  },

  resetPassword: async (request = {}) => {
    try {
      const response = await apiClient.post("users/reset-password", request, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response;
    } catch (error) {
      console.error("Error in resetPassword:", error);
      throw error;
    }
  },
};
export const googleAuthService = async (credential) => {
  try {
    const response = await apiClient.post("users/google-login", { token: credential });
    return response.data;
  } catch (error) {
    console.error("Error in googleAuthService:", error);
    throw error;
  }
};
