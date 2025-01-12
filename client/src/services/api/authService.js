import httpClient from "./httpClient";

const TOKEN_KEY = "token";
const USER_KEY = "user";

export const authService = {
  // Token management
  getToken: () => localStorage.getItem(TOKEN_KEY),
  setToken: (token) => localStorage.setItem(TOKEN_KEY, token),
  removeToken: () => localStorage.removeItem(TOKEN_KEY),

  // User data management
  getUser: () => {
    const userData = localStorage.getItem(USER_KEY);
    return userData ? JSON.parse(userData) : null;
  },
  setUser: (user) => localStorage.setItem(USER_KEY, JSON.stringify(user)),
  removeUser: () => localStorage.removeItem(USER_KEY),

  // Login operation
  login: async (credentials) => {
    const response = await httpClient.post("/users/login", {
      user: credentials,
    });
    if (response.success && response.token) {
      authService.setToken(response.token);
      if (response.user) {
        authService.setUser(response.user);
      }
    }
    return response;
  },

  // Logout operation
  logout: async () => {
    try {
      const response = await httpClient.post("/users/logout");
      authService.removeToken();
      authService.removeUser();
      return response;
    } catch (error) {
      // Even if the server request fails, clear local storage
      authService.removeToken();
      authService.removeUser();
      throw error;
    }
  },

  // Password reset request
  requestPasswordReset: async (email) => {
    return await httpClient.post("/users/password/reset-request", {
      user: { email },
    });
  },

  // Create new password
  resetPassword: async (userId, password, token) => {
    return await httpClient.patch(
      `/users/password/reset/${userId}`,
      {
        user: { password },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  },

  // Signup operation
  register: async (userData) => {
    return await httpClient.post("/users", {
      user: userData,
    });
  },

  // Session check
  isAuthenticated: () => {
    const token = authService.getToken();
    const user = authService.getUser();
    return !!(token && user);
  },

  // Initialize auth state
  initializeAuth: () => {
    const token = authService.getToken();
    const user = authService.getUser();
    return { token, user };
  },
};
