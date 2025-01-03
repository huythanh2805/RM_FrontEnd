import { fetchStocksService } from "@/services/stocks";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useList = (id, form) => {
  const queryClient = useQueryClient();

  const {
    data: stocksData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["fetchStocksService"],
    queryFn: fetchStocksService,
  });

  return {
    stocksData,
    isLoading,
  };
};
