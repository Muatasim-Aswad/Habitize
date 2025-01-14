import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { authService } from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(() =>
    authService.initializeAuth(),
  );
  const navigate = useNavigate();
  const location = useLocation();

  // Check authentication on mount and route change
  useEffect(() => {
    const isAuthenticated = authService.isAuthenticated();
    const currentAuth = authService.initializeAuth();
    setAuthState(currentAuth);

    const isProtectedRoute = location.pathname.startsWith("/app");
    const isAuthRoute = ["/sign-in", "/sign-up", "/reset-password"].includes(
      location.pathname,
    );

    if (!isAuthenticated && isProtectedRoute) {
      navigate("/sign-in", { replace: true, state: { from: location } });
    } else if (isAuthenticated && isAuthRoute) {
      navigate("/app/dashboard", { replace: true });
    }
  }, [location, navigate]);

  const login = (token, user) => {
    authService.setToken(token);
    authService.setUser(user);
    setAuthState({ token, user });
  };

  const logout = async () => {
    try {
      await authService.logout();
    } finally {
      setAuthState({ token: null, user: null });
      navigate("/sign-in", { replace: true });
    }
  };

  const deleteUserAccount = async () => {
    await authService.deleteUserAccount();
    setAuthState({ token: null, user: null });
    navigate("/sign-in", { replace: true });
  };
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!authState.token,
        token: authState.token,
        user: authState.user,
        login,
        logout,
        deleteUserAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
