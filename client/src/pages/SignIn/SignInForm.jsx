import React from "react";
import { Box, Typography, LinearProgress } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";

import FormInput from "../../components/form/FormInput/FormInput";
import FormButton from "../../components/form/FormButton/FormButton";
import FormContainer from "../../components/form/FormContainer/FormContainer";
import LinkButton from "../../components/form/LinkButton/LinkButton";
import OrDivider from "../../components/form/OrDivider/OrDivider";
import useFormValidation from "../../hooks/useFormValidation";

const SignInForm = () => {
  const { values, errors, handleChange, handleSubmit, passwordStrength } =
    useFormValidation({
      email: "",
      password: "",
    });

  const onSubmit = () => {
    // Add authentication logic here
  };

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

  return (
    <FormContainer title="Sign in">
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          type="email"
          name="email"
          label="Email"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
          icon={EmailIcon}
          placeholder="your@email.com"
        />

        <Box sx={{ mt: 2 }}>
          <FormInput
            type="password"
            name="password"
            label="Password"
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
        </Box>

        <Box sx={{ mt: 3 }}>
          <FormButton text="Sign in" />
        </Box>

        <OrDivider />

        <Typography
          variant="body2"
          align="center"
          sx={{ color: "rgba(0, 0, 0, 0.6)" }}
        >
          Don&apos;t have an account?{" "}
          <LinkButton to="/sign-up">Sign up</LinkButton>
        </Typography>

        <Typography
          variant="body2"
          align="center"
          sx={{ color: "rgba(0, 0, 0, 0.6)", mt: 1 }}
        >
          <LinkButton to="/reset-password">Forgot password?</LinkButton>
        </Typography>
      </Box>
    </FormContainer>
  );
};

export default SignInForm;
