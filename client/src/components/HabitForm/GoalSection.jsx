import React from "react";
import PropTypes from "prop-types";
import { TextField, MenuItem, Box } from "@mui/material";

const FREQUENCIES = ["daily", "weekly", "monthly", "yearly"];

const GoalSection = ({ goal, setGoal }) => {
  return (
    <Box
      sx={{
        display: "flex",
        mb: 3,
        width: "100%",
        justifyContent: "flex-start",
        flexWrap: "wrap",
        gap: 2,
      }}
    >
      <TextField
        label="Goal"
        type="number"
        variant="outlined"
        value={goal.number || ""}
        onChange={(e) =>
          setGoal({ ...goal, number: parseInt(e.target.value) || null })
        }
        sx={{
          width: "30%",
          maxWidth: "200px",
          backgroundColor: "#4F8A8B15",
          borderRadius: "8px",
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
          },
        }}
      />

      <TextField
        label="Unit"
        type="text"
        placeholder="e.g. times, push-ups"
        variant="outlined"
        value={goal.unit}
        onChange={(e) => setGoal({ ...goal, unit: e.target.value })}
        sx={{
          width: "30%",
          maxWidth: "200px",
          backgroundColor: "#4F8A8B15",
          borderRadius: "8px",
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
          },
        }}
      />

      <TextField
        select
        label="Frequency"
        variant="outlined"
        value={goal.frequency}
        onChange={(e) => setGoal({ ...goal, frequency: e.target.value })}
        sx={{
          width: "30%",
          maxWidth: "200px",
          backgroundColor: "#4F8A8B15",
          borderRadius: "8px",
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
          },
        }}
      >
        {FREQUENCIES.map((option) => (
          <MenuItem key={option} value={option}>
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
};

GoalSection.propTypes = {
  goal: PropTypes.shape({
    number: PropTypes.number,
    unit: PropTypes.string,
    frequency: PropTypes.string,
  }).isRequired,
  setGoal: PropTypes.func.isRequired,
};

export default GoalSection;
