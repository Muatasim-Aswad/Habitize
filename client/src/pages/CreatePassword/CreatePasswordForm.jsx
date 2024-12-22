import React from "react";
import { Box, Typography, LinearProgress } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";

import FormInput from "../../components/form/FormInput/FormInput";
import FormButton from "../../components/form/FormButton/FormButton";
import FormContainer from "../../components/form/FormContainer/FormContainer";
import LinkButton from "../../components/form/LinkButton/LinkButton";
import OrDivider from "../../components/form/OrDivider/OrDivider";
import ErrorMessage from "../../components/form/ErrorMessage/ErrorMessage";
import useFormValidation from "../../hooks/useFormValidation";
import { usePasswordValidation } from "../../hooks/usePasswordValidation";
import { useFormSubmit, FORM_TYPES } from "../../hooks/useFormSubmit";

const CreatePasswordForm = () => {
  const { values, errors, isFormValid, handleChange, handleSubmit } =
    useFormValidation({
      password: "",
      confirmPassword: "",
    });

  const {
    strength,
    strengthColor,
    strengthLabel,
    errors: passwordErrors,
  } = usePasswordValidation(values.password);

  const {
    handleSubmit: submitForm,
    isLoading,
    error: submitError,
  } = useFormSubmit(FORM_TYPES.CREATE_PASSWORD);

  const onSubmit = () => {
    submitForm(values);
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
          error={
            errors.password ||
            (values.password && passwordErrors.length > 0 && passwordErrors[0])
          }
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
              <Typography variant="caption" color={strengthColor}>
                {strengthLabel}
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={strength}
              color={strengthColor}
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

        {submitError && <ErrorMessage error={submitError} variant="alert" />}

        <Box sx={{ mt: 3 }}>
          <FormButton
            text="Create Password"
            isLoading={isLoading}
            isDisabled={!isFormValid}
          />
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
