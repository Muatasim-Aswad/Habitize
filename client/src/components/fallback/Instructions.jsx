import React from "react";
import { Box, Typography } from "@mui/material";
import { Add, Home, Timeline } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Instructions = () => {
  return (
    <Box p={3}>
      <Box display="flex" alignItems="center" gap={2} mb={3}>
        <Link to="/app/add-habit">
          <Add />
        </Link>
        <Typography variant="body1">
          To <strong>create a new habit</strong>, use this button.
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" gap={2} mb={3}>
        <Link to="/app/dashboard">
          <Home />
        </Link>
        <Typography variant="body1">
          Once a habit is created, you can <strong>record your progress</strong>{" "}
          in the dashboard page. <br />
          You can also <strong>delete</strong> or <strong>edit</strong> your
          habits here. <br />
          Using the date selector, you can record your progress on different
          days.
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" gap={2}>
        <Link to="/app/progress">
          <Timeline />
        </Link>
        <Typography variant="body1">
          You can <strong>track your progress</strong> over time in the progress
          page. <br />
          There you can see all your habits and edit them as well.
        </Typography>
      </Box>
    </Box>
  );
};

export default Instructions;
