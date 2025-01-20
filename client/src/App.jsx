import React from "react";
import { Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

import LandingLayout from "./layouts/LandingLayout/LandingLayout";
import SignInForm from "./pages/SignIn/SignInForm";
import SignUpForm from "./pages/SignUp/SignUpForm";
import ResetPasswordForm from "./pages/ResetPassword/ResetPasswordForm";
import CreatePasswordForm from "./pages/CreatePassword/CreatePasswordForm";

import AppLayout from "./layouts/AppLayout/AppLayout";
import Dashboard from "./pages/Dashboard/Dashboard";
import Progress from "./pages/Progress/Progress";
import Settings from "./pages/Settings/Settings";
import Logout from "./pages/Logout/Logout";
import AddHabit from "./pages/AddHabit/AddHabit";
import EditHabit from "./pages/EditHabit/EditHabit";
import { Routes } from "react-router-dom";

const App = () => {
  return (
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
        <Route path="add-habit" element={<AddHabit />} />
        <Route path="edit-habit" element={<EditHabit />} />
        <Route path="progress" element={<Progress />} />
        <Route path="settings" element={<Settings />} />
        <Route path="logout" element={<Logout />} />
        <Route path="add-habit" element={<AddHabit />} />
        <Route path="edit-habit/:habitId" element={<EditHabit />} />
        <Route path="*" element={<Navigate to="/app/dashboard" replace />} />
      </Route>
    </Routes>
  );
};

export default App;
