// useResetPassword.js
import { PasswordService } from "@/services/auth-service"; // Import PasswordService
import { useState } from "react";

export const useResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const resetPassword = async (token) => {
    setLoading(true);
    setMessage("");
    setError("");
    // Kiểm tra xem mật khẩu mới có khớp với xác nhận không
    if (newPassword !== confirmPassword) {
      setError("Mật khẩu mới không khớp.");
      setLoading(false);
      return;
    }
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
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    message,
    error,
    loading,
    resetPassword,
  };
};
