import React, { useState } from "react";
import {
  TextField,
  Button,
  Snackbar,
  Box,
  Typography,
  InputAdornment,
  IconButton,
  LinearProgress,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SettingsIcon from "@mui/icons-material/Settings";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { authService, userService } from "../../services/api";
import { usePasswordValidation } from "../../hooks/usePasswordValidation";
import DeleteDialog from "../../components/DeleteDialog";

const AccountSettings = ({
  initialUserData = { email: "", name: "" },
  onSave,
  onDelete,
}) => {
  const [userData, setUserData] = useState({
    email: initialUserData.email || "",
    name: initialUserData.name || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const navigate = useNavigate();

  const {
    strength,
    strengthColor,
    strengthLabel,
    errors: passwordErrors,
  } = usePasswordValidation(userData.newPassword);

  const handleChange = (field) => (event) => {
    setUserData({ ...userData, [field]: event.target.value });
  };

  const handleClickShowPassword = (field) => () => {
    setShowPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const handleSave = async () => {
    if (userData.newPassword !== userData.confirmPassword) {
      setSnackbarMessage("Passwords do not match.");
      setSnackbarOpen(true);
      return;
    }

    if (passwordErrors.length > 0) {
      setSnackbarMessage(passwordErrors[0]);
      setSnackbarOpen(true);
      return;
    }

    if (userData.newPassword) {
      if (!userData.currentPassword) {
        setSnackbarMessage("Please enter your current password.");
        setSnackbarOpen(true);
        return;
      }

      const isValid = await userService.checkPassword(userData.currentPassword);
      if (!isValid) {
        setSnackbarMessage("Current password is incorrect.");
        setSnackbarOpen(true);
        return;
      }
    }

    const user = authService.getUser();
    const updates = {};
    if (userData.name !== user.name) updates.name = userData.name;
    if (userData.email !== user.email) updates.email = userData.email;
    if (userData.currentPassword) updates.password = userData.newPassword;
    onSave(updates);
    setSnackbarMessage("Settings saved successfully!");
    setSnackbarOpen(true);

    setTimeout(() => {
      navigate("/app/dashboard", { replace: true });
    }, 1000);
  };

  const handleDelete = async () => {
    //check if user entered current password

    if (!userData.currentPassword) {
      setSnackbarMessage(
        "To delete your account, please enter your current password.",
      );
      setSnackbarOpen(true);
      return;
    }

    const isValid = await userService.checkPassword(userData.currentPassword);
    if (!isValid) {
      setSnackbarMessage("Current password is incorrect.");
      setSnackbarOpen(true);
      return;
    }

    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    onDelete();
    setSnackbarMessage("Account deleted successfully!");
    setSnackbarOpen(true);
    setOpenDeleteDialog(false);

    setTimeout(() => {
      navigate("/sign-in", { replace: true });
    }, 1000);
  };

  const handleCancelDelete = () => {
    setOpenDeleteDialog(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        padding: 4,
        backgroundColor: "#FFF5EB",
        minHeight: "100vh",
        justifyContent: "flex-start",
        mt: 5,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          mb: 4,
          color: "#4F8A8B",
          display: "flex",
          alignItems: "center",
        }}
      >
        <SettingsIcon sx={{ fontSize: 40, mr: 2, color: "#4F8A8B" }} />
        Account Settings
      </Typography>
      <Box
        sx={{
          width: "100%",
          maxWidth: "500px",
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        <TextField
          label="Email"
          variant="outlined"
          value={userData.email}
          disabled
          sx={{
            width: "100%",
            backgroundColor: "#4F8A8B15",
            borderRadius: "8px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
            },
          }}
        />
        <TextField
          label="Name"
          variant="outlined"
          value={userData.name}
          onChange={handleChange("name")}
          sx={{
            width: "100%",
            backgroundColor: "#4F8A8B15",
            borderRadius: "8px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end">
                  <EditIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          inputProps={{
            maxLength: 30,
          }}
        />
        <TextField
          label="Current Password"
          type={showPassword.currentPassword ? "text" : "password"}
          variant="outlined"
          value={userData.currentPassword}
          onChange={handleChange("currentPassword")}
          sx={{
            width: "100%",
            backgroundColor: "#4F8A8B15",
            borderRadius: "8px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  onClick={handleClickShowPassword("currentPassword")}
                >
                  {showPassword.currentPassword ? (
                    <Visibility />
                  ) : (
                    <VisibilityOff />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="New Password"
          type={showPassword.newPassword ? "text" : "password"}
          variant="outlined"
          value={userData.newPassword}
          onChange={handleChange("newPassword")}
          sx={{
            width: "100%",
            backgroundColor: "#4F8A8B15",
            borderRadius: "8px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  onClick={handleClickShowPassword("newPassword")}
                >
                  {showPassword.newPassword ? (
                    <Visibility />
                  ) : (
                    <VisibilityOff />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {passwordErrors.length > 0 && (
          <Typography variant="caption" color="error" sx={{ mt: -3 }}>
            {passwordErrors[0]}
          </Typography>
        )}
        {userData.newPassword && (
          <Box sx={{ mt: -2 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 0.2,
              }}
            >
              <Typography variant="caption" color="textSecondary">
                Password Strength:
              </Typography>
              <Typography variant="caption" color={strengthColor}>
                {strengthLabel}
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={strength}
              color={strengthColor}
              sx={{ height: 4, borderRadius: 2 }}
            />
          </Box>
        )}
        <TextField
          label="Confirm Password"
          type={showPassword.confirmPassword ? "text" : "password"}
          variant="outlined"
          value={userData.confirmPassword}
          onChange={handleChange("confirmPassword")}
          sx={{
            width: "100%",
            backgroundColor: "#4F8A8B15",
            borderRadius: "8px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  onClick={handleClickShowPassword("confirmPassword")}
                >
                  {showPassword.confirmPassword ? (
                    <Visibility />
                  ) : (
                    <VisibilityOff />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {userData.confirmPassword &&
          userData.newPassword !== userData.confirmPassword && (
            <Typography variant="caption" color="error" sx={{ mt: -3 }}>
              Passwords do not match.
            </Typography>
          )}
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          maxWidth: "500px",
          mt: 4,
          gap: 3,
          position: "relative",
          marginBottom: "16",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          sx={{
            width: "48%",
            maxWidth: "200px",
            backgroundColor: "#8B4F54",
            borderRadius: "8px",
          }}
          onClick={handleDelete}
        >
          Delete Account
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{
            width: "48%",
            maxWidth: "200px",
            backgroundColor: "#4F8A8B",
            borderRadius: "8px",
          }}
          onClick={handleSave}
        >
          Save
        </Button>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      />
      <DeleteDialog
        open={openDeleteDialog}
        title="Delete Account!"
        description="Are you sure you want to delete your account?"
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </Box>
  );
};

AccountSettings.propTypes = {
  initialUserData: PropTypes.shape({
    email: PropTypes.string.isRequired,
    name: PropTypes.string,
  }),
  onSave: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default AccountSettings;
