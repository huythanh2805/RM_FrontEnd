import { loginService } from "@/services/auth-service";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const useLogin = (setIsLoggedIn) => {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLoginSubmit = async (data) => {
    setError(null);
    try {
      const response = await loginService(data);
      const token = response.data.token;
      localStorage.setItem("token", token);
      setIsLoggedIn(true);
      navigate("/");
    } catch (error) {
      setError(error.response?.data?.message || "Đăng nhập thất bại");
      console.error(error);
    }
  };

  return { register, handleSubmit, handleLoginSubmit, error };
};
