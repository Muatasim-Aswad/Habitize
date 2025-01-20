import React from "react";
import PropTypes from "prop-types";
import { Box, Typography, Modal, Button, IconButton } from "@mui/material";
import IconSelector from "./IconSelector";
import IconRenderer from "../IconRenderer";
import ArrowDropDown from "@mui/icons-material/ArrowDropDown";

const IconSelectorModal = ({
  iconName,
  open,
  handleOpen,
  handleClose,
  handleIconSelect,
}) => {
  return (
    <>
      <Button
        variant="outlined"
        onClick={handleOpen}
        sx={{
          mb: 3,
          width: "50%",
          maxWidth: "130px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#4F8A8B15",
          borderRadius: "8px",
          padding: "8px 16px",
        }}
      >
        {iconName ? <IconRenderer iconName={iconName} size={30} /> : "Icon"}
        <IconButton
          size="small"
          onClick={handleOpen}
          sx={{
            ml: 1,
          }}
        >
          <ArrowDropDown />
        </IconButton>
      </Button>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: "8px",
            p: 4,
            boxShadow: 24,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Select an Icon
          </Typography>
          <IconSelector onIconSelect={handleIconSelect} />
        </Box>
      </Modal>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: "8px",
            p: 4,
            boxShadow: 24,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Select an Icon
          </Typography>
          <IconSelector onIconSelect={handleIconSelect} />
        </Box>
      </Modal>
    </>
  );
};

IconSelectorModal.propTypes = {
  iconName: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  handleOpen: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleIconSelect: PropTypes.func.isRequired,
};

export default IconSelectorModal;
