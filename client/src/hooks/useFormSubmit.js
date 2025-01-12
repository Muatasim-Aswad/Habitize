import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { authService } from "../services/api";

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
  const { login } = useAuth();

  const handleSubmit = async (formValues) => {
    try {
      setIsLoading(true);
      setError(null);

      switch (formType) {
        case FORM_TYPES.SIGN_IN: {
          const { email, password } = formValues;
          const response = await authService.login({ email, password });
          if (response.success && response.token) {
            login(response.token, response.user);
            navigate("/app/dashboard");
          } else {
            throw new Error(
              response.message ||
                "Login failed. Please check your credentials.",
            );
          }
          break;
        }

        case FORM_TYPES.SIGN_UP: {
          const { fullName: name, email, password } = formValues;
          const response = await authService.register({
            name,
            email,
            password,
          });
          if (response.success) {
            navigate("/sign-in");
          } else {
            throw new Error(
              response.message || "Registration failed. Please try again.",
            );
          }
          break;
        }

        case FORM_TYPES.RESET_PASSWORD: {
          const { email } = formValues;
          const response = await authService.requestPasswordReset(email);
          if (response.success) {
            navigate("/sign-in");
          } else {
            throw new Error(
              response.message ||
                "Password reset request failed. Please try again.",
            );
          }
          break;
        }

        case FORM_TYPES.CREATE_PASSWORD: {
          const { password, userId, token } = formValues;
          const response = await authService.resetPassword(
            userId,
            password,
            token,
          );
          if (response.success) {
            navigate("/sign-in");
          } else {
            throw new Error(
              response.message || "Password reset failed. Please try again.",
            );
          }
          break;
        }

        default:
          throw new Error(`Unknown form type: ${formType}`);
      }
    } catch (error) {
      setError(error.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return { handleSubmit, isLoading, error };
};
