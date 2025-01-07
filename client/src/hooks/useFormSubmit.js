import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import useFetch from "./useFetch";

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

  // Separate useFetch hook for each form type
  const signInFetch = useFetch("/user/login");
  const signUpFetch = useFetch("/user/create");
  const resetPasswordFetch = useFetch("/user/reset-password");
  const createPasswordFetch = useFetch("/user/create-password");

  const handleSubmit = async (formValues) => {
    try {
      setIsLoading(true);
      setError(null);

      switch (formType) {
        case FORM_TYPES.SIGN_IN: {
          const { email, password } = formValues;
          const response = await signInFetch.post({
            user: { email, password },
          });

          if (response.success && response.token) {
            login(response.token);
            navigate("/app/dashboard");
          } else {
            throw new Error(response.message || "Login failed");
          }
          break;
        }

        case FORM_TYPES.SIGN_UP: {
          const { fullName, email, password } = formValues;
          const response = await signUpFetch.post({
            fullUser: { name: fullName, email, password },
          });

          if (response.success) {
            navigate("/sign-in");
          } else {
            throw new Error(response.message || "Sign up failed");
          }
          break;
        }

        case FORM_TYPES.RESET_PASSWORD: {
          const { email } = formValues;
          await resetPasswordFetch.post({ email });
          navigate("/sign-in");
          break;
        }

        case FORM_TYPES.CREATE_PASSWORD: {
          const { password, token } = formValues;
          await createPasswordFetch.post({ password, token });
          navigate("/sign-in");
          break;
        }

        default:
          throw new Error(`Unknown form type: ${formType}`);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { handleSubmit, isLoading, error };
};
