import { registerService } from "@/services/auth-service";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const useRegister = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const handleRegisterSubmit = async (data) => {
    await registerService(data)
      .then((response) => {
        console.log(response);
        navigate("/login");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return { register, handleSubmit, handleRegisterSubmit };
};
