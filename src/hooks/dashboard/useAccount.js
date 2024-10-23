import { addUserService, userListService } from "@/services/users";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const useUser = () => {
  const queryClient = useQueryClient();

  const {
    data = [],
    isLoading: isQueryLoading,
    error: queryError,
  } = useQuery({
    queryKey: ["userListService"],
    queryFn: userListService,
  });

  const list = data?.users || [];

  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { register, handleSubmit, setValue } = useForm();

  const resetForm = () => {
    setValue("userName", "");
    setValue("email", "");
    setValue("password", "");
    setValue("phoneNumber", "");
    setValue("address", "");
    setSelectedImage(null);
    setImageFile(null);
  };

  const addUserMutation = useMutation({
    mutationFn: (formData) => addUserService(formData),
    onSuccess: () => {
      queryClient.invalidateQueries(["userListService"]);
      setSuccess("User added successfully");
      resetForm();
    },
    onError: (error) => {
      setError(error.response?.data?.message || "An error occurred while adding the user");
    },
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
      setValue("image", file); // Gán file vào giá trị của form
    }
  };

  const onSubmit = (data) => {
    // Tạo đối tượng FormData cho multipart/form-data
    const submitData = new FormData();
    Object.keys(data).forEach((key) => {
      submitData.append(key, data[key]);
    });
    if (imageFile) {
      submitData.append("image", imageFile); // Tên trường 'image' phải khớp với multer
    }
    console.log(data);
    addUserMutation.mutate(submitData);
  };

  return {
    list,
    isLoading: isQueryLoading || addUserMutation.isLoading,
    error: queryError || error,
    success,
    handleImageUpload,
    onSubmit,
    register,
    handleSubmit,
    selectedImage,
  };
};
