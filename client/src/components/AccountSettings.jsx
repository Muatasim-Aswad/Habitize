import React, { useState } from "react";
import {
  TextField,
  Button,
  Snackbar,
  Box,
  Typography,
  InputAdornment,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SettingsIcon from "@mui/icons-material/Settings";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

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

  const handleChange = (field) => (event) => {
    setUserData({ ...userData, [field]: event.target.value });
  };

  const handleClickShowPassword = (field) => () => {
    setShowPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const handleSave = () => {
    onSave(userData);
    setSnackbarMessage("Settings saved successfully!");
    setSnackbarOpen(true);

    setTimeout(() => {
      navigate("/app/dashboard", { replace: true });
    }, 1000);
  };

  const handleDelete = () => {
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
                    <VisibilityOff />
                  ) : (
                    <Visibility />
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
                    <VisibilityOff />
                  ) : (
                    <Visibility />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
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
                    <VisibilityOff />
                  ) : (
                    <Visibility />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          maxWidth: "500px",
          mt: 4,
          gap: 2,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          sx={{
            width: "50%",
            maxWidth: "200px",
            mt: 10,
            backgroundColor: "#4F8A8B",
            borderRadius: "8px",
          }}
          onClick={handleSave}
        >
          Save
        </Button>
        <Box
          sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
        >
          <Button
            variant="contained"
            color="primary"
            sx={{
              width: "100%",
              maxWidth: "240px",
              mt: 10,
              backgroundColor: "#8B4F54",
              borderRadius: "8px",
            }}
            onClick={handleDelete}
          >
            Delete Account
          </Button>
        </Box>
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

      <Dialog
        open={openDeleteDialog}
        onClose={handleCancelDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Account!"}</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to delete your account?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            color="primary"
            variant="contained"
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
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
