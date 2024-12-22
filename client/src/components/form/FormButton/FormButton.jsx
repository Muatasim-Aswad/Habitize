import React from "react";
import { Button, CircularProgress } from "@mui/material";
import PropTypes from "prop-types";

const FormButton = ({
  text,
  isLoading = false,
  isDisabled = false,
  onClick,
  type = "submit",
  ...props
}) => {
  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={isLoading || isDisabled}
      fullWidth
      variant="contained"
      sx={{
        backgroundColor: "#4F8A8B",
        "&:hover": {
          backgroundColor: "#3d6e6f",
        },
      }}
      {...props}
    >
      {isLoading ? <CircularProgress size={24} color="inherit" /> : text}
    </Button>
  );
};

FormButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.string,
  isLoading: PropTypes.bool,
  isDisabled: PropTypes.bool,
};

FormButton.defaultProps = {
  onClick: undefined,
  type: "submit",
  isLoading: false,
  isDisabled: false,
};

export default FormButton;
