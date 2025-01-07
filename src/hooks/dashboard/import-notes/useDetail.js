import { getDetailImportNotesService } from "@/services/import-notes";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export const useDetailImportNotes = () => {
  const { id } = useParams();

  const { data: importNotesData } = useQuery(["getDetailImportNotesService", id], () =>
    getDetailImportNotesService(id)
  );

  return { importNotesData };
};
