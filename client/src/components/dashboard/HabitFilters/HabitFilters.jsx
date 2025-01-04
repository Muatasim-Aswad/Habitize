import React from "react";
import PropTypes from "prop-types";
import { Box, InputBase } from "@mui/material";
import { MagnifyingGlass, FunnelSimple } from "phosphor-react";
import { COLORS, SPACING } from "../../../theme/constants";
import DatePicker from "./DatePicker";

const HabitFilters = ({
  searchValue,
  onSearchChange,
  selectedDate,
  onDateChange,
  onFilterClick,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: SPACING.sm,
        mb: SPACING.md,
      }}
    >
      {/* Search Input */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#4F8A8B15",
          borderRadius: "24px",
          padding: "8px 16px",
          height: "40px",
          flex: 1,
        }}
      >
        <InputBase
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search a habit"
          sx={{
            flex: 1,
            "& input": {
              color: COLORS.text.primary,
              "&::placeholder": {
                color: COLORS.text.secondary,
                opacity: 1,
              },
              padding: 0,
              fontSize: "0.875rem",
            },
          }}
        />
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <MagnifyingGlass size={24} color={COLORS.text.primary} />
        </Box>
      </Box>

      {/* Filter Button */}
      <Box
        sx={{
          backgroundColor: "#4F8A8B15",
          borderRadius: "24px",
          padding: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "40px",
          height: "40px",
          cursor: "pointer",
        }}
        onClick={onFilterClick}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <FunnelSimple size={24} color={COLORS.text.primary} />
        </Box>
      </Box>

      {/* Date Picker */}
      <DatePicker selectedDate={selectedDate} onDateChange={onDateChange} />
    </Box>
  );
};

HabitFilters.propTypes = {
  searchValue: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  selectedDate: PropTypes.instanceOf(Date).isRequired,
  onDateChange: PropTypes.func.isRequired,
  onFilterClick: PropTypes.func.isRequired,
};

export default HabitFilters;
