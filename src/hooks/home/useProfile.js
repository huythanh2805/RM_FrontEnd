import { getUserProfile, updateUserProfile } from "@/services/profile";
import { useEffect, useState } from "react";

export const useProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const userProfile = await getUserProfile();
        setUser(userProfile);
      } catch (err) {
        setError(err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleUpdateProfile = async (formData) => {
    try {
      setLoading(true);
      const updatedUser = await updateUserProfile(formData);
      fetchProfile();
      setUser(updatedUser);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    error,
    handleUpdateProfile,
  };
};
