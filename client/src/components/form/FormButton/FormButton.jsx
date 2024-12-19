import React from "react";
import PropTypes from "prop-types";
import { Button } from "@mui/material";

const FormButton = ({ text, onClick, type = "submit", disabled = false }) => {
  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={disabled}
      fullWidth
      variant="contained"
      sx={{
        backgroundColor: "#4F8A8B",
        "&:hover": {
          backgroundColor: "#3d6e6f",
        },
      }}
    >
      {text}
    </Button>
  );
};

FormButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.string,
  disabled: PropTypes.bool,
};

FormButton.defaultProps = {
  onClick: undefined,
  type: "submit",
  disabled: false,
};

export default FormButton;
