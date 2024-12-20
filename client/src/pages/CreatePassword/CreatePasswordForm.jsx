import React from "react";
import { Box, Typography, LinearProgress } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";

import FormInput from "../../components/form/FormInput/FormInput";
import FormButton from "../../components/form/FormButton/FormButton";
import FormContainer from "../../components/form/FormContainer/FormContainer";
import LinkButton from "../../components/form/LinkButton/LinkButton";
import OrDivider from "../../components/form/OrDivider/OrDivider";
import useFormValidation from "../../hooks/useFormValidation";

const CreatePasswordForm = () => {
  const { values, errors, handleChange, handleSubmit, passwordStrength } =
    useFormValidation({
      password: "",
      confirmPassword: "",
    });

  const getPasswordStrengthColor = (strength) => {
    if (strength <= 20) return "error";
    if (strength <= 40) return "warning";
    if (strength <= 60) return "primary";
    if (strength <= 80) return "info";
    return "success";
  };

  const getPasswordStrengthLabel = (strength) => {
    if (strength <= 20) return "Very Weak";
    if (strength <= 40) return "Weak";
    if (strength <= 60) return "Fair";
    if (strength <= 80) return "Good";
    return "Strong";
  };

  const onSubmit = () => {
    // Add create password logic here
  };

  return (
    <FormContainer
      title="Create New Password"
      description="Please enter your new password"
    >
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          type="password"
          name="password"
          label="New Password"
          value={values.password}
          onChange={handleChange}
          error={errors.password}
          icon={LockIcon}
          placeholder="••••••"
        />
        {values.password && (
          <Box sx={{ mt: 1 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 0.5,
              }}
            >
              <Typography variant="caption" color="textSecondary">
                Password Strength:
              </Typography>
              <Typography
                variant="caption"
                color={getPasswordStrengthColor(passwordStrength)}
              >
                {getPasswordStrengthLabel(passwordStrength)}
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={passwordStrength}
              color={getPasswordStrengthColor(passwordStrength)}
              sx={{ height: 4, borderRadius: 2 }}
            />
          </Box>
        )}

        <Box sx={{ mt: 2 }}>
          <FormInput
            type="password"
            name="confirmPassword"
            label="Confirm New Password"
            value={values.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            icon={LockIcon}
            placeholder="••••••"
          />
        </Box>

        <Box sx={{ mt: 3 }}>
          <FormButton text="Create Password" />
        </Box>

        <OrDivider />

        <Typography
          variant="body2"
          align="center"
          sx={{ color: "rgba(0, 0, 0, 0.6)" }}
        >
          Already have an account?{" "}
          <LinkButton to="/sign-in">Sign in</LinkButton>
        </Typography>
      </Box>
    </FormContainer>
  );
};

export default CreatePasswordForm;
