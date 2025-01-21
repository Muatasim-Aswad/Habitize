// NameInput.js
import React from "react";
import { TextField } from "@mui/material";
import PropTypes from "prop-types";

const NameInput = ({ name, setName, maxLength }) => {
  return (
    <TextField
      label="Name"
      variant="outlined"
      value={name}
      onChange={(e) => setName(e.target.value)}
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
      inputProps={{
        maxLength: maxLength,
      }}
    />
  );
};

NameInput.propTypes = {
  name: PropTypes.string.isRequired,
  setName: PropTypes.func.isRequired,
  maxLength: PropTypes.number.isRequired,
};

export default NameInput;
