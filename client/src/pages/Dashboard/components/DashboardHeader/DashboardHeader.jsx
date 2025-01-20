import React from "react";
import { Box, Typography } from "@mui/material";
import { SPACING } from "../../../../theme/constants";
import PropTypes from "prop-types";
import logo from "../../../../../public/logo.png";

const DashboardHeader = ({ userName }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: SPACING.lg,
        position: "relative",
        zIndex: 1,
      }}
    >
      <Box
        component="img"
        src={logo}
        alt="Habitize Logo"
        sx={{
          height: { xs: "32px", sm: "40px" },
          width: "auto",
          display: "block",
        }}
      />
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: "1.25rem", sm: "1.5rem" },
          fontWeight: "700",
          color: "#4F8A8B",
        }}
      >
        {`Welcome, ${userName}!`}
      </Typography>
    </Box>
  );
};

DashboardHeader.propTypes = {
  userName: PropTypes.string.isRequired,
};

export default DashboardHeader;
