import { fetchStocksService, fetchStocksServiceStatus } from "@/services/stocks";
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
  const {
    data: stocksDataStatus,
  } = useQuery({
    queryKey: ["fetchStocksServiceStatus"],
    queryFn: () => fetchStocksServiceStatus,
  });
  
  return {
    stocksData,
    isLoading, stocksDataStatus
  };
};
