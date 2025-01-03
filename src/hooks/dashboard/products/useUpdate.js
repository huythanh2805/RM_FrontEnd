import { toast } from "@/hooks/use-toast";
import { getDetailSellerService, updateSellersService } from "@/services/sellers";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

export const useUpdateSeller = () => {
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
        name: "",
        code: "",
        email: "",
        phone: "",
        description: "",
        address: "",
      });
    }
  };

  const updateSellersMutation = useMutation({
    mutationFn: async (updateData) => {
      await updateSellersService(id, updateData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["fetchSellerService"]);
      toast({ variant: "success", title: "Thêm nhân viên thành công!" });
      resetForm();
      navigate("/admin/sellers");
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || error.message || "Vui lòng kiểm tra lại thông tin";
      toast({
        variant: "destructive",
        title: "Lỗi khi thêm nhà cung cấp",
        description: errorMessage,
      });
    },
  });

  const onSubmit = (updateData) => {
    updateSellersMutation.mutate(updateData);
  };

  useQuery(["getDetailSellerService", id], () => getDetailSellerService(id), {
    onSuccess: (data) => {
      if (data) {
        if (form) {
          form.reset({
            name: data.name || "",
            email: data.email || "",
            code: data.code || "",
            description: data.description || "",
            phone: data.phone || "",
            address: data.address || "",
          });
        }
      }
    },
  });

  return { register, onSubmit, handleSubmit, errors };
};
