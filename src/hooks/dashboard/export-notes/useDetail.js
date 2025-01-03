import { getDetailExportNotesService } from "@/services/export-notes";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

export const useDetailExportNotes = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id } = useParams();
  const form = useForm();

  const {
    data: exportNotesData,
    isLoading,
    refetch,
  } = useQuery(["getDetailExportNotesService", id], () => getDetailExportNotesService(id));
  console.log(exportNotesData);
  return { exportNotesData };
};
