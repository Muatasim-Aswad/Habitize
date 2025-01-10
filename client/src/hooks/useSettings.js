import { useState } from "react";
import { useUser } from "../context/UserContext";
import { useAuth } from "../context/AuthContext";

export const useSettings = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user, updateUser, deleteUser } = useUser();
  const { logout } = useAuth();

  const handleUpdateProfile = async (userData) => {
    try {
      setIsLoading(true);
      setError(null);
      await updateUser(user.id, userData);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await deleteUser(user.id);
      await logout();
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    user,
    isLoading,
    error,
    handleUpdateProfile,
    handleDeleteAccount,
  };
};
