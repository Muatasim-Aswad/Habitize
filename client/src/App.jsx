import React, { useEffect } from "react";
import { Route, Navigate } from "react-router-dom";

import SignInForm from "./pages/SignIn/SignInForm";
import SignUpForm from "./pages/SignUp/SignUpForm";
import ResetPasswordForm from "./pages/ResetPassword/ResetPasswordForm";
import CreatePasswordForm from "./pages/CreatePassword/CreatePasswordForm";

import Dashboard from "./pages/Dashboard/Dashboard";
import Progress from "./pages/Progress/Progress";
import Settings from "./pages/Settings/Settings";
import Logout from "./pages/Logout/Logout";
import AddHabit from "./pages/AddHabit/AddHabit";
import EditHabit from "./pages/EditHabit/EditHabit";
import { Routes } from "react-router-dom";
import AppFrame from "./layouts/AppFrame";
import LandingFrame from "./layouts/LandingFrame";
import { warmupService } from "./services/api/warmupService";

const App = () => {
  useEffect(() => {
    //non-blocking warm-up for api server if spinned down
    warmupService.triggerWarmup();
  }, []);

  //frames includes a wrapping route and a layout component
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/*" element={<LandingFrame />}>
        <Route index element={<Navigate to="/sign-in" replace />} />
        <Route path="sign-in" element={<SignInForm />} />
        <Route path="sign-up" element={<SignUpForm />} />
        <Route path="reset-password" element={<ResetPasswordForm />} />
        <Route path="create-password" element={<CreatePasswordForm />} />
      </Route>

      {/* Protected routes */}
      <Route path="/app/*" element={<AppFrame />}>
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