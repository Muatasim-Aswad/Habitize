import { useState } from "react";

const useFormValidation = (initialValues = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);

  const validatePassword = (password) => {
    if (!password) return { error: "Password is required", strength: 0 };

    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    let strength = 0;
    let error = "";

    // Length check
    if (password.length < minLength) {
      error = `Password must be at least ${minLength} characters`;
    } else {
      strength += 20;
    }

    // Character type checks
    if (hasUpperCase) strength += 20;
    if (hasLowerCase) strength += 20;
    if (hasNumbers) strength += 20;
    if (hasSpecialChar) strength += 20;

    // Build error message if password is weak
    if (!error && strength < 60) {
      const missing = [];
      if (!hasUpperCase) missing.push("uppercase letter");
      if (!hasLowerCase) missing.push("lowercase letter");
      if (!hasNumbers) missing.push("number");
      if (!hasSpecialChar) missing.push("special character");

      if (missing.length > 0) {
        error = `Password must include at least one ${missing.join(", ")}`;
      }
    }

    return { error, strength };
  };

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "email":
        if (!value) {
          error = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = "Please enter a valid email address";
        }
        break;

      case "password": {
        const validation = validatePassword(value);
        error = validation.error;
        setPasswordStrength(validation.strength);
        break;
      }

      case "confirmPassword":
        if (!value) {
          error = "Please confirm your password";
        } else if (value !== values.password) {
          error = "Passwords do not match";
        }
        break;

      case "firstName":
        if (!value) {
          error = "First name is required";
        }
        break;

      case "lastName":
        if (!value) {
          error = "Last name is required";
        }
        break;

      default:
        if (!value) {
          error = `${name} is required`;
        }
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Instant validation
    const error = validateField(name, value);

    // Special case for password confirmation
    if (name === "password" && values.confirmPassword) {
      const confirmError = validateField(
        "confirmPassword",
        values.confirmPassword,
      );
      setErrors((prev) => ({
        ...prev,
        confirmPassword: confirmError,
      }));
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(values).forEach((name) => {
      const error = validateField(name, values[name]);
      if (error) {
        newErrors[name] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (onSubmit) => (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(values);
    }
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    passwordStrength,
  };
};

export default useFormValidation;
