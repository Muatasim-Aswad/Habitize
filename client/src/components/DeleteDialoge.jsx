import React from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
} from "@mui/material";

const DeleteDialog = ({
  open,
  title = "Delete",
  description = "Are you sure you want to proceed?",
  onCancel,
  onConfirm,
  cancelText = "Cancel",
  confirmText = "Yes",
}) => {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <Typography variant="body1">{description}</Typography>
      </DialogContent>
      <DialogActions
        sx={{
          padding: "1rem",
          paddingTop: 0,
        }}
      >
        <Button
          onClick={onCancel}
          sx={{
            width: "40%",
            marginRight: "20%",
            backgroundColor: "#4F8A8B",
            color: "#fff",
            fontWeight: "600",
            "&:hover": {
              backgroundColor: "#3A6B6D",
            },
          }}
        >
          {cancelText}
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          autoFocus
          sx={{
            width: "40%",
            backgroundColor: "#8B4F54",
            color: "#fff",
            fontWeight: "600",
            "&:hover": {
              backgroundColor: "#733C44",
            },
          }}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DeleteDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  cancelText: PropTypes.string,
  confirmText: PropTypes.string,
};

export default DeleteDialog;
