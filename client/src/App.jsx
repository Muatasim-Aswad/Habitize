import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LandingLayout from "./pages/Landing/LandingLayout";
import SignInForm from "./pages/SignIn/SignInForm";
import SignupForm from "./pages/SignUp/SignupForm";
import ResetPasswordForm from "./pages/ResetPassword/ResetPasswordForm";

import {
  createTheme,
  ThemeProvider,
  GlobalStyles,
  CssBaseline,
} from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: "'Nunito', sans-serif",
  },
});

const globalStyles = {
  "*": {
    fontFamily: "'Nunito', sans-serif",
    margin: 0,
    padding: 0,
    boxSizing: "border-box",
  },
  "html, body": {
    backgroundColor: "#FFF5E6",
    minHeight: "100vh",
  },
  "#root": {
    minHeight: "100vh",
    backgroundColor: "#FFF5E6",
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
            <Route path="sign-up" element={<SignupForm />} />
            <Route path="reset-password" element={<ResetPasswordForm />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </>
  );
};
export default App;
