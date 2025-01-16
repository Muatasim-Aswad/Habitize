import React from "react";
import PropTypes from "prop-types";
import {
  TextField,
  InputAdornment,
  IconButton,
  FormControl,
  FormLabel,
  Grid,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";

const FormInput = ({
  type = "text",
  label,
  value,
  name,
  onChange,
  error,
  icon: Icon,
  placeholder,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <FormControl fullWidth>
      <Grid container alignItems="center" gap={1}>
        {Icon && (
          <Grid item>
            <Icon />
          </Grid>
        )}
        <Grid item>
          <FormLabel
            htmlFor={name}
            sx={{ fontWeight: "bold", textAlign: "left" }}
          >
            {label}
          </FormLabel>
        </Grid>
      </Grid>

      <TextField
        name={name}
        id={name}
        type={isPassword && showPassword ? "text" : type}
        fullWidth
        value={value}
        onChange={onChange}
        error={!!error}
        helperText={error}
        placeholder={placeholder}
        autoComplete={isPassword ? "current-password" : name}
        InputProps={{
          ...(isPassword && {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPassword} edge="end">
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }),
        }}
      />
    </FormControl>
  );
};

FormInput.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  icon: PropTypes.elementType,
  placeholder: PropTypes.string,
};

FormInput.defaultProps = {
  type: "text",
  error: "",
  icon: null,
  placeholder: "",
};

export default FormInput;
