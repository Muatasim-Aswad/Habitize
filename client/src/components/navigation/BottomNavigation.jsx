import React from "react";
import {
  Paper,
  BottomNavigation as MuiBottomNavigation,
  BottomNavigationAction,
} from "@mui/material";
import {
  Home,
  Notifications,
  Timeline,
  Settings,
  Logout,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

const navItems = [
  { icon: <Home />, label: "Home", path: "/app/dashboard" },
  {
    icon: <Notifications />,
    label: "Notifications",
    path: "/app/notifications",
  },
  { icon: <Timeline />, label: "Progress", path: "/app/progress" },
  { icon: <Settings />, label: "Settings", path: "/app/settings" },
  { icon: <Logout />, label: "Logout", path: "/app/logout" },
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
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#FFC297",
        zIndex: 1000,
        display: { xs: "block", md: "none" },
      }}
      elevation={3}
    >
      <MuiBottomNavigation
        value={getCurrentValue()}
        onChange={(_, newValue) => {
          navigate(navItems[newValue].path);
        }}
        sx={{
          backgroundColor: "#FFC297",
          height: 70,
          "& .MuiBottomNavigationAction-root": {
            color: "#666",
            minWidth: "auto",
            padding: "6px 0",
            "&.Mui-selected": {
              color: "#4F8A8B",
            },
          },
        }}
      >
        {navItems.map((item, index) => (
          <BottomNavigationAction
            key={index}
            icon={item.icon}
            label={item.label}
          />
        ))}
      </MuiBottomNavigation>
    </Paper>
  );
};

export default BottomNavigation;
