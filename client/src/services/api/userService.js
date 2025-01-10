import httpClient from "./httpClient";
import { authService } from "./authService";

export const userService = {
  // Get user details
  getProfile: async (userId) => {
    const response = await httpClient.get(`/users/${userId}`);
    if (response.success && response.user) {
      authService.setUser(response.user);
    }
    return response;
  },

  // Update user information
  updateProfile: async (userId, userData) => {
    // Validate required fields
    const requiredFields = ["firstName", "lastName", "email"];
    const missingFields = requiredFields.filter(
      (field) => userData[field] === undefined,
    );

    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
    }

    const response = await httpClient.patch(`/users/${userId}`, {
      user: userData,
    });

    if (response.success && response.user) {
      authService.setUser(response.user);
    }

    return response;
  },

  // Delete user account
  deleteAccount: async (userId) => {
    const response = await httpClient.delete(`/users/${userId}`);
    if (response.success) {
      // Clear auth data after successful deletion
      authService.removeToken();
      authService.removeUser();
    }
    return response;
  },

  // Get current user
  getCurrentUser: () => {
    return authService.getUser();
  },

  // Check if user exists
  checkUserExists: async (email) => {
    try {
      const response = await httpClient.post("/users/check", { email });
      return response.exists;
    } catch (error) {
      return false;
    }
  },
};
