import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, GlobalStyles, CssBaseline } from "@mui/material";
import theme from "./theme";
import { COLORS, TYPOGRAPHY } from "./theme/constants";

import LandingLayout from "./pages/Landing/LandingLayout";
import SignInForm from "./pages/SignIn/SignInForm";
import SignUpForm from "./pages/SignUp/SignUpForm";
import ResetPasswordForm from "./pages/ResetPassword/ResetPasswordForm";
import CreatePasswordForm from "./pages/CreatePassword/CreatePasswordForm";

import AppLayout from "./components/AppLayout";
import Dashboard from "./pages/Dashboard/Dashboard";
import Notifications from "./pages/Notifications/Notifications";
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
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles styles={globalStyles} />
        <Routes>
          <Route path="/" element={<LandingLayout />}>
            <Route index element={<Navigate to="/sign-in" replace />} />
            <Route path="sign-in" element={<SignInForm />} />
            <Route path="sign-up" element={<SignUpForm />} />
            <Route path="reset-password" element={<ResetPasswordForm />} />
            <Route path="create-password" element={<CreatePasswordForm />} />
          </Route>

          <Route path="/app/*" element={<AppLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="progress" element={<Progress />} />
            <Route path="settings" element={<Settings />} />
            <Route path="logout" element={<Logout />} />
            <Route path="add-habit" element={<AddHabit />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </>
  );
};

export default App;
