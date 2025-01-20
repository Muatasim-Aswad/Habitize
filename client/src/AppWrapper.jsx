import React from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider, GlobalStyles, CssBaseline } from "@mui/material";
import theme from "./theme";
import { COLORS, TYPOGRAPHY } from "./theme/constants";
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";

/**
 * This component wraps our App with the providers we do not want to have in our tests
 */
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

const AppWrapper = ({ children }) => {
  return (
    <Router>
      <AuthProvider>
        <UserProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <GlobalStyles styles={globalStyles} />
            {children}
          </ThemeProvider>
        </UserProvider>
      </AuthProvider>
    </Router>
  );
};

AppWrapper.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AppWrapper;
