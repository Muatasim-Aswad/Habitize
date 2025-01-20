import React from "react";
import PropTypes from "prop-types";
import { IconButton } from "@mui/material";
import { FunnelSimple } from "phosphor-react";
import { COLORS, DASHBOARD } from "../../../../theme/constants";

const FilterBar = ({ onClick }) => {
  return (
    <IconButton
      onClick={onClick}
      sx={{
        backgroundColor: COLORS.primary.light,
        borderRadius: "50%",
        padding: DASHBOARD.filters.padding.y * 8,
        color: COLORS.text.primary,
        "&:hover": {
          backgroundColor: "rgba(128, 128, 128, 0.9)",
        },
      }}
    >
      <FunnelSimple size={DASHBOARD.icon.size.small} weight="bold" />
    </IconButton>
  );
};

FilterBar.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default FilterBar;
