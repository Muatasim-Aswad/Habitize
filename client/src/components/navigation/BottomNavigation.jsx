import React from "react";
import {
  Paper,
  BottomNavigation as MuiBottomNavigation,
  BottomNavigationAction,
  Box,
} from "@mui/material";
import { Home, Timeline, Settings, Logout } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { COLORS } from "../../theme/constants";

const navItems = [
  {
    icon: <Home sx={{ fontSize: { xs: "6vw", sm: 28 } }} />,
    path: "/app/dashboard",
  },
  {
    icon: <Timeline sx={{ fontSize: { xs: "6vw", sm: 28 } }} />,
    path: "/app/progress",
  },
  {
    icon: <Settings sx={{ fontSize: { xs: "6vw", sm: 28 } }} />,
    path: "/app/settings",
  },
  {
    icon: <Logout sx={{ fontSize: { xs: "6vw", sm: 28 } }} />,
    path: "/app/logout",
  },
];

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getCurrentValue = () => {
    const currentItem = navItems.find(
      (item) => item.path === location.pathname,
    );
    return currentItem ? navItems.indexOf(currentItem) : 0;
  };

  return (
    <Box sx={{ position: "relative", display: { xs: "block", md: "none" } }}>
      <Paper
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: COLORS.background.nav,
          zIndex: 999,
        }}
        elevation={3}
      >
        <MuiBottomNavigation
          value={getCurrentValue()}
          onChange={(_, newValue) => {
            navigate(navItems[newValue].path);
          }}
          sx={{
            backgroundColor: COLORS.background.nav,
            height: "12vh",
            maxHeight: "80px",
            "& .MuiBottomNavigationAction-root": {
              color: COLORS.text.secondary,
              minWidth: "auto",
              padding: "2vh 0",
              "&.Mui-selected": {
                color: COLORS.primary.main,
              },
            },
          }}
        >
          {navItems.map((item, index) => (
            <BottomNavigationAction
              key={index}
              icon={item.icon}
              showLabel={false}
            />
          ))}
        </MuiBottomNavigation>
      </Paper>
    </Box>
  );
};

export default BottomNavigation;
