import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const FORM_TYPES = {
  SIGN_IN: "sign-in",
  SIGN_UP: "sign-up",
  RESET_PASSWORD: "reset-password",
  CREATE_PASSWORD: "create-password",
};

export const useFormSubmit = (formType) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // eslint-disable-next-line no-unused-vars
  const handleSubmit = async (formValues) => {
    try {
      setIsLoading(true);
      setError(null);

      // TODO: Replace with actual API calls
      switch (formType) {
        case FORM_TYPES.SIGN_IN:
          // await signInApi(formValues);
          navigate("/dashboard");
          break;

        case FORM_TYPES.SIGN_UP:
          // await signUpApi(formValues);
          navigate("/sign-in");
          break;

        case FORM_TYPES.RESET_PASSWORD:
          // await sendResetLinkApi(formValues);
          navigate("/create-password");
          break;

        case FORM_TYPES.CREATE_PASSWORD:
          // await createPasswordApi(formValues);
          navigate("/sign-in");
          break;

        default:
          throw new Error(`Unknown form type: ${formType}`);
      }
    } catch (err) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleSubmit,
    isLoading,
    error,
    clearError: () => setError(null),
  };
};
