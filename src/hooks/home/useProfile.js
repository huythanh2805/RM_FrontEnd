import { getUserProfile, updateUserProfile } from "@/services/profile";
import { useQuery } from "@tanstack/react-query";

export const useProfile = () => {
  const { isLoading, isError, data: user } = useQuery({ queryKey: ["getUserProfile"], queryFn: getUserProfile });
  const handleUpdateProfile = async (formData) => {
    try {
      const updatedUser = await updateUserProfile(formData);
      fetchProfile();
      setUser(updatedUser);
    } catch (err) {
    } finally {
    }
  };

  return {
    user,
    loading: isLoading,
    handleUpdateProfile,
  };
};
