import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  TextField,
  IconButton,
  Typography,
  InputAdornment,
  Button,
  FormControl,
  FormLabel,
  Link,
  Divider,
  Card,
  Stack,
  Grid,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: "100dvh",
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
  },
}));

const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  backgroundColor: "#FFF5E6",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
}));

const SignInForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });

  const validateForm = () => {
    const errors = {};

    // Email validation
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!formData.password) {
      errors.password = "Password is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Form submission will be handled by authentication logic
      // TODO: Add authentication logic here
    }
  };

  return (
    <SignInContainer direction="column" justifyContent="space-between">
      <StyledCard variant="outlined">
        <Typography
          component="h1"
          variant="h4"
          sx={{
            width: "100%",
            fontSize: "clamp(2rem, 10vw, 2.15rem)",
            fontWeight: "bold",
            color: "#666666",
          }}
        >
          Sign in
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <FormControl>
            <Grid container alignItems="center" gap={1}>
              <Grid item>
                <EmailIcon />
              </Grid>
              <Grid item>
                <FormLabel
                  htmlFor="email"
                  sx={{ fontWeight: "bold", textAlign: "left" }}
                >
                  Email
                </FormLabel>
              </Grid>
            </Grid>

            <TextField
              name="email"
              id="email"
              placeholder="your@email.com"
              type="email"
              fullWidth
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              error={!!formErrors.email}
              helperText={formErrors.email}
            />
          </FormControl>

          <FormControl>
            <Grid container alignItems="center" gap={1}>
              <Grid item>
                <LockIcon />
              </Grid>
              <Grid item>
                <FormLabel
                  htmlFor="password"
                  sx={{ fontWeight: "bold", textAlign: "left" }}
                >
                  Password
                </FormLabel>
              </Grid>
            </Grid>

            <TextField
              name="password"
              id="password"
              placeholder="••••••"
              type={showPassword ? "text" : "password"}
              fullWidth
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
              error={!!formErrors.password}
              helperText={formErrors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: "#4F8A8B",
            }}
          >
            Sign in
          </Button>
        </Box>

        <Divider>
          <Typography sx={{ color: "text.secondary" }}>or</Typography>
        </Divider>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography sx={{ textAlign: "center" }}>
            Don&apos;t have an account?{" "}
            <Link
              component={RouterLink}
              to="/sign-up"
              variant="body2"
              sx={{
                alignSelf: "center",
                color: "#0D102E",
                fontWeight: "bold",
                fontSize: "17px",
                "&:hover": {
                  textDecoration: "underline",
                  color: "#0D102E",
                },
              }}
            >
              Sign up
            </Link>
          </Typography>

          <Link
            href="/forgot-password"
            component={RouterLink}
            to="/create-password"
            variant="body2"
            sx={{
              alignSelf: "center",
              color: "#0D102E",
              fontWeight: "bold",
              fontSize: "17px",
              "&:hover": {
                textDecoration: "underline",
                color: "#0D102E",
              },
            }}
          >
            Forgot password?
          </Link>
        </Box>
      </StyledCard>
    </SignInContainer>
  );
};

export default SignInForm;
