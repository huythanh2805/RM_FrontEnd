import { toast } from "@/hooks/use-toast";
import {
  addUserService,
  getUserByIdService,
  getUserByRoleService,
  updateUserService,
  userListService,
} from "@/services/users";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useUser = (id, form) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const { data = [], isLoading: isQueryLoading } = useQuery({
    queryKey: ["userListService"],
    queryFn: userListService,
  });

  const list = data?.users || [];

  const { data: data1 = [], isLoading: isQueryLoading1, error } = useQuery({
    queryKey: ["userListRoleService"],
    queryFn: () => getUserByRoleService(),
  });

  const listRole = data1?.users || [];
  const resetForm = () => {
    if (form) {
      form.reset({
        userName: "",
        email: "",
        password: "",
        phoneNumber: "",
        address: "",
        role: "", // 
      });
      setSelectedImage(null);
      setImageFile(null);
    }
  };

  const { data: userData, isLoading: isUserLoading } = useQuery(["user", id], () => getUserByIdService(id), {
    enabled: !!id,
    onSuccess: (data) => {
      if (data?.user) {
        const user = data.user.user || data.user;
        if (form) {
          form.reset({
            userName: user.userName || "",
            email: user.email || "",
            phoneNumber: user.phoneNumber || "",
            address: user.address || "",
            role: user.role || "",
          });
        }
        if (user.image) {
          setSelectedImage(user.image);
        }
      }
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setImageFile(file);
    }
  };

  const validateFormData = (data, isUpdate = false) => {
    if (!data.userName || !data.email || (!isUpdate && !data.password)) {
      throw new Error("Vui lòng điền đầy đủ thông tin bắt buộc");
    }
    if (!isUpdate && !imageFile) {
      throw new Error("Vui lòng chọn ảnh đại diện");
    }
  };

  // Helper function để tạo FormData
  const createFormData = (data, isUpdate = false) => {
    validateFormData(data, isUpdate);

    const formData = new FormData();

    // Thêm các trường thông tin cơ bản
    Object.keys(data).forEach((key) => {
      if (data[key]) {
        formData.append(key, data[key]);
      }
    });

    // Chỉ thêm file ảnh nếu có
    if (imageFile) {
      formData.append("image", imageFile);
    }

    return formData;
  };

  const addUserMutation = useMutation({
    mutationFn: async (data) => {
      try {
        const formData = createFormData(data);
        return await addUserService(formData);
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["userListService"]);
      toast({ variant: "success", title: "Thêm mới tài khoản thành công" });
      resetForm();
      navigate("/admin/users");
    },
    onError: (error) => {
      console.error("Error adding user:", error);
      const errorMessage = error.response?.data?.message || error.message || "Vui lòng kiểm tra lại thông tin";
      toast({
        variant: "destructive",
        title: "Lỗi khi thêm tài khoản",
        description: errorMessage,
      });
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: async (data) => {
      try {
        const formData = createFormData(data, true);
        return await updateUserService(id, formData);
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["user", id]);
      queryClient.invalidateQueries(["userListService"]);
      toast({ variant: "success", title: "Cập nhật tài khoản thành công" });
      navigate("/admin/users");
    },
    onError: (error) => {
      console.error("Error updating user:", error);
      const errorMessage = error.response?.data?.message || error.message || "Lỗi cập nhật tài khoản";
      toast({
        variant: "destructive",
        title: "Lỗi khi cập nhật tài khoản",
        description: errorMessage,
      });
    },
  });


  const handleAdd = (data) => {
    addUserMutation.mutate(data);
  };

  const handleUpdate = (data) => {
    updateUserMutation.mutate(data);
  };

  return {
    user: userData?.user,
    list,
    isUserLoading,
    isLoading: isQueryLoading || addUserMutation.isLoading || updateUserMutation.isLoading || isQueryLoading1,
    handleImageChange,
    selectedImage,
    imageFile,

    handleAdd,
    handleUpdate,
    resetForm, listRole
  };
};
