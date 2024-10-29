import { getUserProfile, updateUserProfile } from "@/services/profile";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useProfile = () => {
  const queryClient = useQueryClient();

  // Query để lấy thông tin profile
  const { isLoading, data: user } = useQuery({
    queryKey: ["getUserProfile"],
    queryFn: getUserProfile,
  });

  // Mutation để update profile
  const { mutateAsync: handleUpdateProfile, isPending: isUpdating } = useMutation({
    mutationFn: (formData) => updateUserProfile(formData),
    onSuccess: (newUserData) => {
      queryClient.setQueryData(["getUserProfile"], newUserData);
    },
  });

  return {
    user,
    loading: isLoading || isUpdating,
    handleUpdateProfile,
  };
};
