import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Check token on every route change
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);

    const isProtectedRoute = location.pathname.startsWith("/app");
    const isAuthRoute = ["/sign-in", "/sign-up", "/reset-password"].includes(
      location.pathname,
    );

    if (!storedToken && isProtectedRoute) {
      navigate("/sign-in", { replace: true, state: { from: location } });
    } else if (storedToken && isAuthRoute) {
      navigate("/app/dashboard", { replace: true });
    }
  }, [location, navigate]);

  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/sign-in", { replace: true });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!token,
        token,
        login,
        logout,
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
