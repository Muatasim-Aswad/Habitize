import React from "react";
import PropTypes from "prop-types";
import { Fab } from "@mui/material";
import { Plus } from "phosphor-react";
import { COLORS, SPACING, DASHBOARD } from "../../../theme/constants";

const AddHabitButton = ({ onClick }) => {
  return (
    <Fab
      color="primary"
      aria-label="add habit"
      onClick={onClick}
      sx={{
        position: "fixed",
        bottom: SPACING.md * 8,
        right: SPACING.md * 8,
        backgroundColor: COLORS.primary.main,
        "&:hover": {
          backgroundColor: COLORS.primary.dark,
        },
      }}
    >
      <Plus size={DASHBOARD.icon.size.medium} weight="bold" />
    </Fab>
  );
};

AddHabitButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default AddHabitButton;
