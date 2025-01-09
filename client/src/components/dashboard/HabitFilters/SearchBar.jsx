import React from "react";
import PropTypes from "prop-types";
import { InputBase, Box } from "@mui/material";
import { MagnifyingGlass } from "phosphor-react";
import {
  COLORS,
  SPACING,
  DASHBOARD,
  TYPOGRAPHY,
} from "../../../theme/constants";

const SearchBar = ({ value, onChange }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: COLORS.primary.light,
        borderRadius: DASHBOARD.filters.borderRadius,
        padding: `${DASHBOARD.filters.padding.y * 8}px ${DASHBOARD.filters.padding.x * 8}px`,
        width: { xs: "100%", sm: "300px" },
      }}
    >
      <MagnifyingGlass
        size={DASHBOARD.icon.size.small}
        color={COLORS.text.primary}
      />
      <InputBase
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search a habit"
        sx={{
          ml: SPACING.xs,
          flex: 1,
          ...TYPOGRAPHY.body2,
          "& input::placeholder": {
            color: COLORS.text.primary,
            opacity: 0.7,
          },
          "& input": {
            color: COLORS.text.primary,
          },
        }}
      />
    </Box>
  );
};

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SearchBar;
