// src/hooks/useGoogleLogin.js
import { googleAuthService } from "@/services/auth-service";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useGoogleLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSuccess = async (response) => {
    const { credential } = response;
    console.log("Google login success:", response);
    setLoading(true);
    setError(null);

    try {
      const data = await googleAuthService(credential);
      localStorage.setItem("token", data.token);
      console.log("Login successful:", data);
      navigate("/");
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      setError(errorMessage);
      console.error("Error during Google login:", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const onError = (error) => {
    console.error("Google login error:", error);
    setError("Failed to login with Google. Please try again.");
  };

  return { onSuccess, onError, loading, error };
};
