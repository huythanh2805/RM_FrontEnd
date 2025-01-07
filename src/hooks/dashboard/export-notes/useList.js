import { toast } from "@/hooks/use-toast";
import { deleteExportNotesService, fetchExportNotesService } from "@/services/export-notes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useList = (id, form) => {
  const queryClient = useQueryClient();

  const {
    data: exportNotesData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["fetchExportNotesService"],
    queryFn: fetchExportNotesService,
  });

  const deleteExportNotesMutation = useMutation((exportNotesID) => deleteExportNotesService(exportNotesID), {
    onSuccess: () => {
      queryClient.invalidateQueries(["fetchExportNotesService"]);
      refetch();
      toast({ variant: "success", title: "Xóa phiếu xuất thành công" });
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || "Xoá phiếu xuất thất bại";
      toast({
        variant: "destructive",
        title: errorMessage,
      });
    },
  });

  return {
    exportNotesData,
    deleteExportNotes: deleteExportNotesMutation.mutateAsync,
    isLoading,
  };
};
