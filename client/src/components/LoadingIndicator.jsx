import React from "react";
import { Box, Skeleton } from "@mui/material";

const LoadingIndicator = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "100%", // Ensures it takes the full width of the parent
        maxWidth: "100%", // Makes sure it doesn't overflow beyond the parent container
        overflow: "hidden", // Prevents overflow
      }}
      p={3}
      pl={0}
    >
      <Skeleton
        variant="rectangular"
        width="100%"
        height={60}
        sx={{ borderRadius: 1 }}
      />
      <Skeleton
        variant="rectangular"
        width="100%"
        height={60}
        sx={{ borderRadius: 1 }}
      />
      <Skeleton
        variant="rectangular"
        width="100%"
        height={60}
        sx={{ borderRadius: 1 }}
      />
      <Skeleton
        variant="rectangular"
        width="100%"
        height={60}
        sx={{ borderRadius: 1 }}
      />
      <Skeleton
        variant="rectangular"
        width="100%"
        height={60}
        sx={{ borderRadius: 1 }}
      />
    </Box>
  );
};

export default LoadingIndicator;
