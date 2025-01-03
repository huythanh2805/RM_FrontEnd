import { toast } from "@/hooks/use-toast";
import { createProductsService } from "@/services/products";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const useCreateProducts = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const form = useForm({
    defaultValues: {
      code: "",
      name: "",
      category: "",
      unit: "",
      price: 0,
      expiryDate: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const resetForm = () => {
    if (form) {
      form.reset({
        code: "",
        name: "",
        category: "",
        unit: "",
        price: 0,
        expiryDate: "",
      });
    }
  };

  const addProductsMutation = useMutation({
    mutationFn: async (createData) => {
      await createProductsService(createData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["fetchProductsService"]);
      toast({ variant: "success", title: "Thêm sản phẩm thành công!" });
      resetForm();
      navigate("/admin/products");
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || error.message || "Vui lòng kiểm tra lại thông tin";
      toast({
        variant: "destructive",
        title: "Lỗi khi thêm sản phẩm",
        description: errorMessage,
      });
    },
  });

  const onSubmit = (createData) => {
    addProductsMutation.mutate(createData);
  };

  return { register, onSubmit, handleSubmit, errors };
};
