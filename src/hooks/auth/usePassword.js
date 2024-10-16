import { PasswordService } from "@/services/auth-service";
import { useState } from "react";

export const usePassword = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  // Gửi yêu cầu đặt lại mật khẩu
  const requestPasswordReset = async (email) => {
    setLoading(true);
    setMessage("");
    setError("");
    try {
      const response = await PasswordService.requestPasswordReset({ email });

      setMessage(response.data.message);
    } catch (err) {
      setError(err.response?.data?.message || "Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };
  // Đặt lại mật khẩu với token và mật khẩu mới
  const resetPassword = async (token, newPassword) => {
    setLoading(true);
    setMessage("");
    setError("");
    try {
      const response = await PasswordService.resetPassword({ token, newPassword });
      setMessage(response.data.message);
    } catch (err) {
      setError(err.response?.data?.message || "Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };
  return {
    loading,
    message,
    error,
    requestPasswordReset,
    resetPassword,
  };
};
