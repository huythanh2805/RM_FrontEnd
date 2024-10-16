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
