import { toast } from "@/hooks/use-toast";
import { deleteProductsService, fetchProductsService } from "@/services/products";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useList = (id, form) => {
  const queryClient = useQueryClient();

  const {
    data: productsData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["fetchProductsService"],
    queryFn: fetchProductsService,
  });

  const deleteProductsMutation = useMutation((productID) => deleteProductsService(productID), {
    onSuccess: () => {
      queryClient.invalidateQueries(["fetchProductsService"]);
      refetch();
      toast({ variant: "success", title: "Xóa thực phẩm thành công" });
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || "Xoá thực phẩm thất bại";
      toast({
        variant: "destructive",
        title: errorMessage,
      });
    },
  });

  return {
    productsData,
    deleteProducts: deleteProductsMutation.mutateAsync,
    isLoading,
  };
};
