import React from "react";
import { Box, Typography } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
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

const SignInForm = () => {
  const { values, errors, isFormValid, handleChange, handleSubmit } =
    useFormValidation({
      email: "",
      password: "",
    });

  const { errors: passwordErrors } = usePasswordValidation(values.password);

  const {
    handleSubmit: submitForm,
    isLoading,
    error: submitError,
  } = useFormSubmit(FORM_TYPES.SIGN_IN);

  const onSubmit = () => {
    submitForm(values);
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
            error={
              errors.password ||
              (values.password &&
                passwordErrors.length > 0 &&
                passwordErrors[0])
            }
            icon={LockIcon}
            placeholder="••••••"
          />
        </Box>

        {submitError && <ErrorMessage error={submitError} variant="alert" />}

        <Box sx={{ mt: 3 }}>
          <FormButton
            text="Sign in"
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
