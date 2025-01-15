import React, { createContext, useContext, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { userService } from "../services/api";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getUser = useCallback(async (userId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await userService.getProfile(userId);
      if (response.success) {
        setUser(response.user);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateUser = useCallback(async (userData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await userService.updateProfile(userData);
      if (response.success) {
        setUser(response.user);
      }
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteUser = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await userService.deleteAccount();
      if (response.success) {
        setUser(null);
      }
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearUser = useCallback(() => {
    setUser(null);
    setError(null);
  }, []);

  const value = {
    user,
    loading,
    error,
    getUser,
    updateUser,
    deleteUser,
    clearUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
