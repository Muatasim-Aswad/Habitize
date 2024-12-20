import React from "react";
import { Box, Typography } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";

import FormInput from "../../components/form/FormInput/FormInput";
import FormButton from "../../components/form/FormButton/FormButton";
import FormContainer from "../../components/form/FormContainer/FormContainer";
import LinkButton from "../../components/form/LinkButton/LinkButton";
import OrDivider from "../../components/form/OrDivider/OrDivider";
import ErrorMessage from "../../components/form/ErrorMessage/ErrorMessage";
import useFormValidation from "../../hooks/useFormValidation";
import { useFormSubmit, FORM_TYPES } from "../../hooks/useFormSubmit";

const ResetPasswordForm = () => {
  const { values, errors, handleChange, handleSubmit } = useFormValidation({
    email: "",
  });

  const {
    handleSubmit: submitForm,
    isLoading,
    error: submitError,
  } = useFormSubmit(FORM_TYPES.RESET_PASSWORD);

  const onSubmit = () => {
    submitForm(values);
  };

  return (
    <FormContainer
      title="Reset Password"
      description="Enter your email address and we'll send you a link to reset your password."
    >
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

        {submitError && <ErrorMessage error={submitError} variant="alert" />}

        <Box sx={{ mt: 3 }}>
          <FormButton text="Send Reset Link" isLoading={isLoading} />
        </Box>

        <OrDivider />

        <Typography
          variant="body2"
          align="center"
          sx={{ color: "rgba(0, 0, 0, 0.6)" }}
        >
          Remember your password? <LinkButton to="/sign-in">Sign in</LinkButton>
        </Typography>
      </Box>
    </FormContainer>
  );
};

export default ResetPasswordForm;
