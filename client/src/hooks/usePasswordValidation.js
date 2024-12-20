import { useState, useEffect } from "react";

const PASSWORD_CRITERIA = {
  minLength: 8,
  hasUpperCase: /[A-Z]/,
  hasLowerCase: /[a-z]/,
  hasNumber: /\d/,
  hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/,
};

export const usePasswordValidation = (password = "") => {
  const [strength, setStrength] = useState(0);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const validatePassword = () => {
      // If password is empty, don't show any errors
      if (!password) {
        setErrors([]);
        setStrength(0);
        return;
      }

      const newErrors = [];
      let strengthScore = 0;

      // Check minimum length
      if (password.length < PASSWORD_CRITERIA.minLength) {
        newErrors.push(
          `Password must be at least ${PASSWORD_CRITERIA.minLength} characters long`,
        );
      } else {
        strengthScore += 20;
      }

      // Check uppercase
      if (!PASSWORD_CRITERIA.hasUpperCase.test(password)) {
        newErrors.push("Password must contain at least one uppercase letter");
      } else {
        strengthScore += 20;
      }

      // Check lowercase
      if (!PASSWORD_CRITERIA.hasLowerCase.test(password)) {
        newErrors.push("Password must contain at least one lowercase letter");
      } else {
        strengthScore += 20;
      }

      // Check numbers
      if (!PASSWORD_CRITERIA.hasNumber.test(password)) {
        newErrors.push("Password must contain at least one number");
      } else {
        strengthScore += 20;
      }

      // Check special characters
      if (!PASSWORD_CRITERIA.hasSpecialChar.test(password)) {
        newErrors.push("Password must contain at least one special character");
      } else {
        strengthScore += 20;
      }

      setErrors(newErrors);
      setStrength(strengthScore);
    };

    validatePassword();
  }, [password]);

  const getStrengthColor = () => {
    if (!password) return "primary"; // Default color when empty
    if (strength <= 20) return "error";
    if (strength <= 40) return "warning";
    if (strength <= 60) return "primary";
    if (strength <= 80) return "info";
    return "success";
  };

  const getStrengthLabel = () => {
    if (!password) return ""; // No label when empty
    if (strength <= 20) return "Very Weak";
    if (strength <= 40) return "Weak";
    if (strength <= 60) return "Fair";
    if (strength <= 80) return "Good";
    return "Strong";
  };

  return {
    strength,
    strengthColor: getStrengthColor(),
    strengthLabel: getStrengthLabel(),
    errors,
    isValid:
      errors.length === 0 && password.length >= PASSWORD_CRITERIA.minLength,
  };
};
