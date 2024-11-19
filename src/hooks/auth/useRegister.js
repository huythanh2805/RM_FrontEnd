import { registerService } from "@/services/auth-service";
import { yupResolver } from "@hookform/resolvers/yup"; // Thêm dòng này
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup"; // Thêm Yup để định nghĩa validation

// Xác thực thông tin đăng ký
const validationSchema = Yup.object({
  userName: Yup.string()
    .required("Tên là bắt buộc")
    .min(3, "Tên phải có ít nhất 3 ký tự")
    .max(50, "Tên không được vượt quá 50 ký tự"),
  phoneNumber: Yup.string()
    .required("Số điện thoại là bắt buộc")
    .matches(/^[0-9]{10,11}$/, "Số điện thoại phải là dãy số từ 10 đến 11 chữ số"),
  email: Yup.string().required("Email là bắt buộc").email("Email không hợp lệ"),
  password: Yup.string()
    .required("Mật khẩu là bắt buộc")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .max(20, "Mật khẩu không được quá 20 ký tự"),
});

export const useRegister = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema), // Sử dụng Yup với react-hook-form
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Khởi tạo navigate

  const handleRegisterSubmit = async (data) => {
    setError(null); // Reset lỗi trước khi thử đăng ký
    try {
      const response = await registerService(data);
      console.log(response);
      navigate("/login"); // Điều hướng về trang login
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.message || "Đăng ký thất bại");
    }
  };

  return { register, handleSubmit, handleRegisterSubmit, error, errors };
};
