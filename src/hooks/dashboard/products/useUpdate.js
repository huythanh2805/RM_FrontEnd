import { toast } from "@/hooks/use-toast";
import { getDetailProductsService, updateProductsService } from "@/services/products";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

export const useUpdateProducts = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id } = useParams();
  const form = useForm();

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

  const updateProductsMutation = useMutation({
    mutationFn: async (updateData) => {
      await updateProductsService(id, updateData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["fetchProductsService"]);
      toast({ variant: "success", title: "Cập nhật sp thành công!" });
      resetForm();
      navigate("/admin/products");
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || error.message || "Vui lòng kiểm tra lại thông tin";
      toast({
        variant: "destructive",
        title: "Lỗi khi cập nhật sp!",
        description: errorMessage,
      });
    },
  });

  const onSubmit = (updateData) => {
    updateProductsMutation.mutate(updateData);
  };

  useQuery(["getDetailProductsService", id], () => getDetailProductsService(id), {
    onSuccess: (data) => {
      if (data) {
        if (form) {
          form.reset({
            code: data?.code,
            name: data?.name,
            category: data?.category,
            unit: data?.unit,
            price: data?.price,
            expiryDate: data?.expiryDate ? new Date(data.expiryDate).toISOString().split("T")[0] : "",
          });
        }
      }
    },
  });

  return { register, onSubmit, handleSubmit, errors };
};
