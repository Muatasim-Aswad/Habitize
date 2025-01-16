import React from "react";
import PropTypes from "prop-types";
import { Box, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const PeriodSection = ({ period, setPeriod }) => {
  return (
    <Box
      sx={{
        display: "flex",
        mb: 3,
        width: "100%",
        justifyContent: "flex-start",
        gap: 4,
      }}
    >
      <DatePicker
        label="From"
        value={period.start}
        onChange={(value) => setPeriod({ ...period, start: value })}
        renderInput={(params) => (
          <TextField
            {...params}
            sx={{
              mb: 3,
              width: "45%",
              backgroundColor: "#4F8A8B15",
              borderRadius: "8px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
              },
            }}
          />
        )}
        sx={{
          backgroundColor: "#4F8A8B15",
          borderRadius: "8px",
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
          },
        }}
      />
      <DatePicker
        label="To"
        value={period.end}
        onChange={(value) => setPeriod({ ...period, end: value })}
        renderInput={(params) => (
          <TextField
            {...params}
            sx={{
              width: "45%",
              backgroundColor: "#4F8A8B15",
              borderRadius: "8px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
              },
            }}
          />
        )}
        sx={{
          backgroundColor: "#4F8A8B15",
          borderRadius: "8px",
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
          },
        }}
      />
    </Box>
  );
};

PeriodSection.propTypes = {
  period: PropTypes.shape({
    start: PropTypes.instanceOf(Date),
    end: PropTypes.instanceOf(Date),
  }).isRequired,
  setPeriod: PropTypes.func.isRequired,
};

export default PeriodSection;
