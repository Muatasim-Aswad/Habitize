/* eslint-disable react/prop-types */
import React, { useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  InputAdornment,
  IconButton,
  Typography,
  Box,
  Modal,
  Snackbar,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { ArrowDropDown } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import IconSelector from "./IconSelector";
import IconRenderer from "./IconRenderer";

const periods = ["Per day", "Per week", "Per month"];
const frequencies = ["Times", "Hours", "Minutes"];

const HabitForm = ({ habitData, setHabitData, onSave }) => {
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleIconSelect = (icon) => {
    setHabitData({ ...habitData, icon });
    handleClose();
  };

  const handleSaveClick = async () => {
    if (!habitData.name || !habitData.goal) {
      setSnackbarMessage("Please add habit details.");
      setSnackbarOpen(true);
      return;
    }

    await onSave();
    setSnackbarMessage("Habit added successfully");
    setSnackbarOpen(true);

    setTimeout(() => {
      navigate("/app/dashboard");
    }, 1000);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
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
        <Typography variant="h4" sx={{ mb: 4, color: "#4F8A8B" }}>
          <EditIcon sx={{ fontSize: 40, mr: 1, color: "#4F8A8B" }} /> Habit
        </Typography>

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
          {habitData.icon ? (
            <IconRenderer iconName={habitData.icon} size={30} />
          ) : (
            "Icon"
          )}
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

        <TextField
          label="Name"
          variant="outlined"
          value={habitData.name}
          onChange={(e) => {
            const newValue = e.target.value;
            if (newValue.split(" ").length <= 3) {
              setHabitData({ ...habitData, name: newValue });
            }
          }}
          sx={{
            mb: 3,
            width: "50%",
            maxWidth: "500px",
            backgroundColor: "#4F8A8B15",
            borderRadius: "8px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
            },
          }}
        />

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
            value={habitData.goal}
            onChange={(e) =>
              setHabitData({ ...habitData, goal: e.target.value })
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
            select
            label="Frequency"
            variant="outlined"
            value={habitData.frequency}
            onChange={(e) =>
              setHabitData({ ...habitData, frequency: e.target.value })
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
          >
            {frequencies.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Period"
            variant="outlined"
            value={habitData.period}
            onChange={(e) =>
              setHabitData({ ...habitData, period: e.target.value })
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
          >
            {periods.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Box>

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
            value={habitData.startDate}
            sx={{
              backgroundColor: "#4F8A8B15",
              borderRadius: "8px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
              },
            }}
            onChange={(newValue) =>
              setHabitData({ ...habitData, startDate: newValue })
            }
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
          <DatePicker
            label="To"
            value={habitData.endDate}
            sx={{
              backgroundColor: "#4F8A8B15",
              borderRadius: "8px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
              },
            }}
            onChange={(newValue) =>
              setHabitData({ ...habitData, endDate: newValue })
            }
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
        </Box>

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
            value={habitData.reminderTime}
            sx={{
              backgroundColor: "#4F8A8B15",
              borderRadius: "8px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
              },
            }}
            onChange={(newValue) =>
              setHabitData({ ...habitData, reminderTime: newValue })
            }
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
            value={habitData.reminderMessage}
            onChange={(e) =>
              setHabitData({ ...habitData, reminderMessage: e.target.value })
            }
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
                    onClick={() =>
                      setHabitData({ ...habitData, reminderMessage: "" })
                    }
                  >
                    <DeleteIcon color="error" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>

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
          onClick={handleSaveClick}
        >
          Save
        </Button>

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
      </Box>
    </LocalizationProvider>
  );
};

export default HabitForm;
