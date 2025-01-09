import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, GlobalStyles, CssBaseline } from "@mui/material";
import theme from "./theme";
import { COLORS, TYPOGRAPHY } from "./theme/constants";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

import LandingLayout from "./pages/Landing/LandingLayout";
import SignInForm from "./pages/SignIn/SignInForm";
import SignUpForm from "./pages/SignUp/SignUpForm";
import ResetPasswordForm from "./pages/ResetPassword/ResetPasswordForm";
import CreatePasswordForm from "./pages/CreatePassword/CreatePasswordForm";

import AppLayout from "./components/AppLayout";
import Dashboard from "./pages/Dashboard/Dashboard";
import Progress from "./pages/Progress/Progress";
import Settings from "./pages/Settings/Settings";
import Logout from "./pages/Logout/Logout";
import AddHabit from "./pages/AddHabit/AddHabit";

const globalStyles = {
  "*": {
    fontFamily: TYPOGRAPHY.fontFamily,
    margin: 0,
    padding: 0,
    boxSizing: "border-box",
  },
  "html, body": {
    backgroundColor: COLORS.background.default,
    minHeight: "100vh",
  },
  "#root": {
    minHeight: "100vh",
    backgroundColor: COLORS.background.default,
  },
};

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles styles={globalStyles} />
        <Routes>
          {/* Public routes */}
          <Route
            path="/"
            element={
              <PublicRoute>
                <LandingLayout />
              </PublicRoute>
            }
          >
            <Route index element={<Navigate to="/sign-in" replace />} />
            <Route
              path="sign-in"
              element={
                <PublicRoute>
                  <SignInForm />
                </PublicRoute>
              }
            />
            <Route
              path="sign-up"
              element={
                <PublicRoute>
                  <SignUpForm />
                </PublicRoute>
              }
            />
            <Route
              path="reset-password"
              element={
                <PublicRoute>
                  <ResetPasswordForm />
                </PublicRoute>
              }
            />
            <Route
              path="create-password"
              element={
                <PublicRoute>
                  <CreatePasswordForm />
                </PublicRoute>
              }
            />
          </Route>

          {/* Protected routes */}
          <Route
            path="/app/*"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="progress" element={<Progress />} />
            <Route path="settings" element={<Settings />} />
            <Route path="logout" element={<Logout />} />
            <Route path="add-habit" element={<AddHabit />} />
            <Route path="edit-habit/:habitId" element={<AddHabit />} />
            <Route
              path="*"
              element={<Navigate to="/app/dashboard" replace />}
            />
          </Route>
        </Routes>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
