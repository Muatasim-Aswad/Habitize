import React from "react";
import { Box, Typography } from "@mui/material";
import { SPACING } from "../../theme/constants";

const Statistics = () => {
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
          Statistics
        </Typography>

        <Typography
          sx={{
            fontSize: "1rem",
            color: "#666",
            marginBottom: SPACING.xl,
          }}
        >
          Coming soon...
        </Typography>
      </Box>
    </Box>
  );
};

export default Statistics;
