import { getDetailExportNotesService } from "@/services/export-notes";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export const useDetailExportNotes = () => {
  const { id } = useParams();

  const {
    data: exportNotesData,
  } = useQuery(["getDetailExportNotesService", id], () => getDetailExportNotesService(id));

  return { exportNotesData };
};
