import React from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Home, Timeline, Settings, Logout } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import { COLORS } from "../../theme/constants";
import logo from "../../../public/image.png";

const navItems = [
  { icon: <Home />, text: "Home", link: "/app/dashboard" },
  { icon: <Timeline />, text: "Progress", link: "/app/progress" },
  { icon: <Settings />, text: "Settings", link: "/app/settings" },
  { icon: <Logout />, text: "Logout", link: "/app/logout" },
];

const DRAWER_WIDTH = 100;

const LeftNavigation = () => {
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        display: { xs: "none", md: "block" },
        "& .MuiDrawer-paper": {
          width: DRAWER_WIDTH,
          boxSizing: "border-box",
          backgroundColor: COLORS.background.nav,
          display: "flex",
          flexDirection: "column",
          border: "none",
          position: "fixed",
        },
      }}
    >
      <Box sx={{ p: 2, textAlign: "center" }}>
        <img src={logo} alt="Logo" style={{ width: "70px" }} />
      </Box>
      <List sx={{ mt: 2 }}>
        {navItems.map((item, index) => (
          <ListItem
            key={index}
            component={Link}
            to={item.link}
            sx={{
              justifyContent: "center",
              color:
                location.pathname === item.link
                  ? COLORS.primary.main
                  : COLORS.text.secondary,
              py: 2,
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.04)",
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: 0,
                justifyContent: "center",
                color: "inherit",
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              sx={{
                display: "none",
              }}
            />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default LeftNavigation;
