import { toast } from "@/hooks/use-toast";
import { deleteImportNotesService, fetchImportNotesService } from "@/services/import-notes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useList = (id, form) => {
  const queryClient = useQueryClient();

  const {
    data: importNotesData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["fetchImportNotesService"],
    queryFn: fetchImportNotesService,
  });

  const deleteImportNotesMutation = useMutation((importNotesID) => deleteImportNotesService(importNotesID), {
    onSuccess: () => {
      queryClient.invalidateQueries(["fetchImportNotesService"]);
      refetch();
      toast({ variant: "success", title: "Xóa phiếu nhập thành công" });
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || "Xoá phiếu nhập thất bại";
      toast({
        variant: "destructive",
        title: errorMessage,
      });
    },
  });

  return {
    importNotesData,
    deleteImportNotes: deleteImportNotesMutation.mutateAsync,
    isLoading,
  };
};
