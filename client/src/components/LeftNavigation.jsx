import React from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import NotificationsIcon from "@mui/icons-material/Notifications";
import TimelineIcon from "@mui/icons-material/Timeline";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useLocation } from "react-router-dom";
import logo from "../../public/image.png";

const navItems = [
  { icon: <HomeIcon />, link: "/app/dashboard" },
  { icon: <NotificationsIcon />, link: "/app/notifications" },
  { icon: <TimelineIcon />, link: "/app/progress" },
  { icon: <SettingsIcon />, link: "/app/settings" },
  { icon: <LogoutIcon />, link: "/app/logout" },
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
        "& .MuiDrawer-paper": {
          width: DRAWER_WIDTH,
          boxSizing: "border-box",
          backgroundColor: "#FFC297",
          display: "block",
          overflow: "hidden",
        },
      }}
    >
      <Box
        sx={{
          height: "100%",
          marginTop: "16px",
          textAlign: "center",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <img
          src={logo}
          alt="logo"
          style={{ width: "100px", height: "auto", marginBottom: "24px" }}
        />
        <List
          sx={{
            width: "100%",
            textAlign: "center",
            flex: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {navItems.map((item, index) => (
            <ListItem
              button
              key={index}
              component={Link}
              to={item.link}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "14px 0",
                backgroundColor:
                  location.pathname === item.link ? "#FFD8A9" : "inherit",
                "&:hover": {
                  backgroundColor: "#FFD8A9",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: "#4F8A8B",
                  minWidth: "auto",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default LeftNavigation;
