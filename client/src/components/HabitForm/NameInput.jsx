// NameInput.js
import React from "react";
import { TextField } from "@mui/material";
import PropTypes from "prop-types";

const NameInput = ({ name, setName }) => {
  return (
    <TextField
      label="Name"
      variant="outlined"
      value={name}
      onChange={(value) => setName(value)}
      sx={{
        mb: 3,
        width: "50%",
        maxWidth: "500px",
        backgroundColor: "#4F8A8B15",
        borderRadius: "8px",
        "& .MuiOutlinedInput-root": {
          borderRadius: "8px",
        },
      }}
    />
  );
};

NameInput.propTypes = {
  name: PropTypes.string.isRequired,
  setName: PropTypes.func.isRequired,
};

export default NameInput;
