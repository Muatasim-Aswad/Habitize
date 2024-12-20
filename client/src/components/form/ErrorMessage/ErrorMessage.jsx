import React from "react";
import { Typography, Alert } from "@mui/material";
import PropTypes from "prop-types";

const ErrorMessage = ({ error, variant = "text" }) => {
  if (!error) return null;

  if (variant === "alert") {
    return (
      <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Typography
      variant="caption"
      color="error"
      sx={{
        display: "block",
        mt: 0.5,
        ml: 1,
      }}
    >
      {error}
    </Typography>
  );
};

ErrorMessage.propTypes = {
  error: PropTypes.string,
  variant: PropTypes.oneOf(["text", "alert"]),
};

export default ErrorMessage;
