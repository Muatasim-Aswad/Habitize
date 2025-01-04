import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const FORM_TYPES = {
  SIGN_IN: "sign-in",
  SIGN_UP: "sign-up",
  RESET_PASSWORD: "reset-password",
  CREATE_PASSWORD: "create-password",
};

const API_BASE_URL = `${process.env.BASE_SERVER_URL}/api`;

export const useFormSubmit = (formType) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (formValues) => {
    try {
      setIsLoading(true);
      setError(null);

      switch (formType) {
        case FORM_TYPES.SIGN_IN: {
          const { email, password } = formValues;
          const response = await fetch(`${API_BASE_URL}/user/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user: {
                email,
                password,
              },
            }),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message || "Failed to sign in");
          }

          navigate("/app/dashboard");
          break;
        }

        case FORM_TYPES.SIGN_UP: {
          const { fullName, email, password } = formValues;
          const response = await fetch(`${API_BASE_URL}/user/create`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              fullUser: {
                name: fullName,
                email,
                password,
              },
            }),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message || "Failed to create user");
          }

          navigate("/sign-in");
          break;
        }

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

  const clearError = () => setError(null);

  return { handleSubmit, isLoading, error, clearError };
};
