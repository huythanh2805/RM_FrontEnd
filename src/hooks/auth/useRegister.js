import { registerService } from "@/services/auth-service";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"; // Thêm dòng này

export const useRegister = () => {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Khởi tạo navigate

  const handleRegisterSubmit = async (data) => {
    setError(null); // Reset lỗi trước khi thử đăng ký
    try {
      const response = await registerService(data);
      console.log(response);
      navigate("/login"); // Điều hướng về trang login
    } catch (error) {
      setError(error.response?.data?.message || "Đăng ký thất bại");
      console.error(error);
    }
  };

  return { register, handleSubmit, handleRegisterSubmit, error };
};
