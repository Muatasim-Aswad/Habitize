import React from "react";
import { Box, Typography } from "@mui/material";
import { SPACING } from "../../theme/constants";

const AddHabit = () => {
  return (
    <Box
      sx={{
        flex: 1,
        padding: { xs: SPACING.md, md: SPACING.lg },
        paddingBottom: { xs: "80px", md: SPACING.lg },
      }}
    >
      <Box
        sx={{
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: "1.5rem",
            fontWeight: "700",
            color: "#4F8A8B",
            marginBottom: SPACING.md,
          }}
        >
          Add New Habit
        </Typography>

        <Typography
          sx={{
            fontSize: "1rem",
            color: "#666",
            marginBottom: SPACING.xl,
          }}
        >
          This is the Add Habit page
        </Typography>
      </Box>
    </Box>
  );
};

export default AddHabit;
