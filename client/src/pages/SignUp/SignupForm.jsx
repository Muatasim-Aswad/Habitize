import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Grid2, InputAdornment, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Card = styled(MuiCard)(({ theme }) => ({
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

const SignUpContainer = styled(Stack)(({ theme }) => ({
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

export default function SignupForm() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [formErrors, setFormErrors] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const validateInputs = (formData) => {
    const errors = {};

    if (!formData.name || formData.name.trim().length === 0) {
      errors.name = "Name is required.";
    }

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email.trim())) {
      errors.email = "Please enter a valid email address.";
    }

    if (!formData.password || formData.password.trim().length < 6) {
      errors.password = "Password must be at least 6 characters long.";
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      name: event.target.name.value.trim(),
      email: event.target.email.value.trim(),
      password: event.target.password.value.trim(),
    };

    if (validateInputs(formData)) {
      // TODO: Add form submission logic here
    }
  };

  return (
    <SignUpContainer direction="column" justifyContent="space-between">
      <Card variant="outlined">
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
          Sign up
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <FormControl>
            <Grid2 container alignItems="center" gap={1}>
              <Grid2 item>
                <PersonIcon />
              </Grid2>
              <Grid2 item>
                <FormLabel
                  htmlFor="name"
                  sx={{ fontWeight: "bold", textAlign: "left" }}
                >
                  Full name
                </FormLabel>
              </Grid2>
            </Grid2>

            <TextField
              name="name"
              id="name"
              placeholder="Jon Snow"
              fullWidth
              error={!!formErrors.name}
              helperText={formErrors.name}
              autoComplete="name"
            />
          </FormControl>
          <FormControl>
            <Grid2 container alignItems="center" gap={1}>
              <Grid2 item>
                <EmailIcon />
              </Grid2>
              <Grid2 item>
                <FormLabel
                  htmlFor="email"
                  sx={{ fontWeight: "bold", textAlign: "left" }}
                >
                  Email
                </FormLabel>
              </Grid2>
            </Grid2>

            <TextField
              name="email"
              id="email"
              placeholder="your@email.com"
              fullWidth
              error={!!formErrors.email}
              helperText={formErrors.email}
              autoComplete="email"
            />
          </FormControl>
          <FormControl>
            <Grid2 container alignItems="center" gap={1}>
              <Grid2 item>
                <LockIcon />
              </Grid2>
              <Grid2 item>
                <FormLabel
                  htmlFor="password"
                  sx={{ fontWeight: "bold", textAlign: "left" }}
                >
                  Password
                </FormLabel>
              </Grid2>
            </Grid2>

            <TextField
              name="password"
              id="password"
              placeholder="••••••"
              type={showPassword ? "text" : "password"}
              fullWidth
              error={!!formErrors.password}
              helperText={formErrors.password}
              autoComplete="new-password"
              slotProps={{
                input: {
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
                },
              }}
            />
          </FormControl>
          <FormControl>
            <Grid2 container alignItems="center" gap={1}>
              <Grid2 item>
                <LockOutlinedIcon />
              </Grid2>
              <Grid2 item>
                <FormLabel
                  htmlFor="confirmPassword"
                  sx={{ fontWeight: "bold", textAlign: "left" }}
                >
                  Confirm Password
                </FormLabel>
              </Grid2>
            </Grid2>

            <TextField
              name="confirmPassword"
              id="confirmPassword"
              placeholder="••••••"
              type="password"
              fullWidth
              error={!!formErrors.confirmPassword}
              helperText={formErrors.confirmPassword}
              autoComplete="new-password"
              slotProps={{
                input: {
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
                },
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
            Sign up
          </Button>
        </Box>
        <Divider>
          <Typography sx={{ color: "text.secondary" }}>or</Typography>
        </Divider>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography sx={{ textAlign: "center" }}>
            Already have an account?{" "}
            <Link
              href="/material-ui/getting-started/templates/sign-in/"
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
              Sign in
            </Link>
          </Typography>
        </Box>
      </Card>
    </SignUpContainer>
  );
}
