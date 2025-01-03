import { toast } from "@/hooks/use-toast";
import { deleteSellersService, fetchSellerService } from "@/services/sellers";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useList = (id, form) => {
  const queryClient = useQueryClient();

  const {
    data: sellersData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["fetchSellerService"],
    queryFn: fetchSellerService,
  });

  const deleteSellersMutation = useMutation((sellerID) => deleteSellersService(sellerID), {
    onSuccess: () => {
      queryClient.invalidateQueries(["fetchSellerService"]);
      refetch();
      toast({ variant: "success", title: "Xóa nhà cung cấp thành công" });
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || "Xoá nhà cung cấp thất bại";
      toast({
        variant: "destructive",
        title: errorMessage,
      });
    },
  });

  return {
    sellersData,
    deleteSeller: deleteSellersMutation.mutateAsync,
    isLoading,
  };
};
