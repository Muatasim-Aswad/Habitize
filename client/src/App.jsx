import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, GlobalStyles, CssBaseline } from "@mui/material";
import theme from "./theme";
import { COLORS, TYPOGRAPHY } from "./theme/constants";

import LandingLayout from "./pages/Landing/LandingLayout";
import SignInForm from "./pages/SignIn/SignInForm";
import SignUpForm from "./pages/SignUp/SignupForm";
import ResetPasswordForm from "./pages/ResetPassword/ResetPasswordForm";
import CreatePasswordForm from "./pages/CreatePassword/CreatePasswordForm";

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
        </Routes>
      </ThemeProvider>
    </>
  );
};

export default App;
