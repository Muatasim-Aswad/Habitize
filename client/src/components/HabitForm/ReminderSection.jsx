// ReminderSection.js
import React from "react";
import { TextField, InputAdornment, IconButton, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import PropTypes from "prop-types";

const ReminderSection = ({ reminder, setReminder }) => {
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
      <TimePicker
        label="Reminder Time"
        value={reminder.time}
        sx={{
          backgroundColor: "#4F8A8B15",
          borderRadius: "8px",
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
          },
        }}
        onChange={(value) => setReminder({ ...reminder, time: value })}
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
      />
      <TextField
        label="Reminder Message"
        variant="outlined"
        value={reminder.message}
        onChange={(value) => setReminder({ ...reminder, message: value })}
        sx={{
          width: "45%",
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
                onClick={() => setReminder({ ...reminder, message: "" })}
              >
                <DeleteIcon color="error" />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

ReminderSection.propTypes = {
  reminder: PropTypes.shape({
    time: PropTypes.instanceOf(Date),
    message: PropTypes.string,
  }).isRequired,
  setReminder: PropTypes.func.isRequired,
};

export default ReminderSection;
