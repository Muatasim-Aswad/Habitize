import Instructions from "./Instructions";
import { Box, Typography } from "@mui/material";
import React from "react";

//add to the instruction above it. No habit records available for this day. If you are a new uer see the instructions below
const DashboardFallback = () => {
  return (
    <Box p={2}>
      <Typography variant="h6" gutterBottom>
        No habit records available for this day.
      </Typography>
      <Instructions />
    </Box>
  );
};

export default DashboardFallback;
