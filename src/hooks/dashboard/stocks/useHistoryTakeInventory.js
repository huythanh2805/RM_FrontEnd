import { getListTakeInventoryByStockID } from "@/services/stocks";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export const useHistoryTakeInventory = () => {
    const { id } = useParams();

    const {
        data: listTakeInventoryData,
        isLoading, error
    } = useQuery(["getListTakeInventoryByStockID", id], () => getListTakeInventoryByStockID(id));

    return { listTakeInventoryData, isLoading, error };
};
