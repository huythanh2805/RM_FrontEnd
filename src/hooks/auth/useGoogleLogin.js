import { toast } from "@/hooks/use-toast";
import { googleAuthService } from "@/services/auth-service";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useGoogleLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSuccess = async (response) => {
    const { credential } = response;
    setLoading(true);
    setError(null);

    try {
      const response = await googleAuthService(credential);
      const token = response.token;
      const role = response.user.role;
      localStorage.setItem("token", token);

      toast({ variant: "success", title: "Đăng nhập thành công" })

      if (role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Đăng nhập thất bại";
      setError(errorMessage); // Gắn lỗi vào state
      toast({ variant: "destructive", title: errorMessage });
    } finally {
      setLoading(false);
    }
  };


  const onError = (error) => {
    console.error("Google login error:", error);
    toast({ variant: "destructive", title: "Đăng nhập bằng google thất bại" });
    setError("Failed to login with Google. Please try again.");
  };

  return { onSuccess, onError, loading, error };
};
