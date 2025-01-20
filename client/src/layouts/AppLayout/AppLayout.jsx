import React from "react";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import LeftNavigation from "./navigation/LeftNavigation";
import BottomNavigation from "./navigation/BottomNavigation";
import { Outlet } from "react-router-dom";

const DRAWER_WIDTH = 100;

const AppLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: theme.palette.background.default,
      }}
    >
      <LeftNavigation />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: "100vh",
          width: "100%",
          paddingLeft: {
            xs: 0,
            md: `${DRAWER_WIDTH}px`,
          },
          pb: isMobile ? "70px" : 0,
          px: {
            xs: 2,
            md: 4,
          },
          boxSizing: "border-box",
        }}
      >
        <Outlet />
      </Box>
      <BottomNavigation />
    </Box>
  );
};

export default AppLayout;
