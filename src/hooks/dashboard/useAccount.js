import {
  addUserService,
  getUserByIdService,
  updateUserIsDelete,
  updateUserService,
  userListService,
} from "@/services/users";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useUser = (id, setValue) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
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
      navigate("/dashboard/users");
    },
    onError: (error) => {
      setError(error.response?.data?.message || "An error occurred while adding the user");
    },
  });
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setImageFile(file);
    } else {
      setSelectedImage(null);
      setImageFile(null);
    }
  };
  const { mutateAsync: deleteUser } = useMutation(
    async (userId) => {
      await updateUserIsDelete(userId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["users"]);
      },
      onError: (error) => {
        setError(error);
      },
    }
  );
  const { data: { user } = {}, isLoading: isUserLoading } = useQuery(["user", id], () => getUserByIdService(id), {
    enabled: !!id,
    onSuccess: (data) => {
      if (data?.user?.image) {
        setSelectedImage(data.user.image);
      }
    },
  });
  useEffect(() => {
    if (user && setValue) {
      const userData = user.user || user;
      setValue("userName", userData.userName || "");
      setValue("email", userData.email || "");
      setValue("phoneNumber", userData.phoneNumber || "");
      setValue("address", userData.address || "");
      setValue("image", userData.image || "");
    }
  }, [user, setValue]);
  const updateUserMutation = useMutation({
    mutationFn: async (data) => {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if (data[key]) {
          formData.append(key, data[key]);
        }
      });
      if (imageFile) {
        formData.append("image", imageFile);
      }
      return updateUserService(id, formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["user", id]);
      queryClient.invalidateQueries(["userListService"]);
      setSuccess("User updated successfully");
      navigate("/dashboard/users");
    },
    onError: (error) => {
      setError(error.response?.data?.message || "An error occurred while updating the user");
    },
  });
  const handleUpdate = async (data) => {
    updateUserMutation.mutate(data);
  };

  return {
    user,
    list,
    isUserLoading,
    isLoading: isQueryLoading || addUserMutation.isLoading,
    error: queryError || error,
    success,
    handleImageChange,
    selectedImage,
    deleteUser,
    handleUpdate,
  };
};
