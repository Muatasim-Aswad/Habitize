/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Button, Typography, Box, Snackbar } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate, useLocation } from "react-router-dom";
import IconSelectorModal from "./IconSelectorModal";
import NameInput from "./NameInput";
import ReminderSection from "./ReminderSection";
import GoalSection from "./GoalSection";
import PeriodSection from "./PeriodSection";
import PropTypes from "prop-types";
import useHabits from "../../hooks/habits/useHabits";
import DeleteDialog from "../DeleteDialog";

const HabitForm = ({ habit, setHabit, onSave }) => {
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [habitToDelete, setHabitToDelete] = useState(null);

  const { handleDelete, error } = useHabits();

  const handleDeleteClick = () => {
    setHabitToDelete(habit._id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (habitToDelete) {
      await handleDelete(habitToDelete);
    }
    setDeleteDialogOpen(false);
    setHabitToDelete(null);

    setSnackbarMessage("Habit deleted successfully!");
    setSnackbarOpen(true);

    setTimeout(() => {
      const previousRoute = location.state?.from || "/app/dashboard";
      navigate(previousRoute);
    }, 1500);

    if (error) {
      setSnackbarMessage(error.message || "Failed to delete.");
      setSnackbarOpen(true);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setHabitToDelete(null);
  };

  const handleIconSelect = (icon) => {
    setHabit({ ...habit, icon });
    handleClose();
  };

  const handleSaveClick = async () => {
    try {
      if (!habit.name || !habit.goal) {
        setSnackbarMessage("Please add habit details.");
        setSnackbarOpen(true);
        return;
      }

      await onSave();
      setSnackbarMessage("Habit submitted successfully!");
      setSnackbarOpen(true);

      setTimeout(() => {
        const previousRoute = location.state?.from || "/app/dashboard";
        navigate(previousRoute);
      }, 1500);
    } catch (error) {
      setSnackbarMessage(error.message || "Failed to submit.");
      setSnackbarOpen(true);
    }
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
        <IconSelectorModal
          {...{
            iconName: habit.icon,
            open,
            handleOpen,
            handleClose,
            handleIconSelect,
          }}
        />

        <NameInput
          name={habit.name}
          setName={(name) => setHabit({ ...habit, name })}
          maxLength={20}
        />

        <GoalSection
          goal={habit.goal}
          setGoal={(goal) => setHabit({ ...habit, goal })}
        />

        <PeriodSection
          period={habit.period}
          setPeriod={(period) => setHabit({ ...habit, period })}
        />

        <ReminderSection
          reminder={habit.reminder}
          setReminder={(reminder) => setHabit({ ...habit, reminder })}
          maxLength={50}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            maxWidth: "500px",
            mt: 4,
            gap: 3,
            position: "relative",
            marginBottom: "16",
          }}
        >
          {habit._id && (
            <Button
              variant="contained"
              color="primary"
              sx={{
                width: "48%",
                maxWidth: "200px",
                backgroundColor: "#8B4F54",
                borderRadius: "8px",
              }}
              onClick={handleDeleteClick}
            >
              Delete Habit
            </Button>
          )}

          <Button
            variant="contained"
            color="primary"
            sx={{
              width: "48%",
              maxWidth: "200px",
              backgroundColor: "#4F8A8B",
              borderRadius: "8px",
            }}
            onClick={handleSaveClick}
          >
            Save
          </Button>
        </Box>

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
        <DeleteDialog
          open={deleteDialogOpen}
          title="Delete Habit!"
          description="Are you sure you want to delete this habit?"
          onCancel={handleDeleteCancel}
          onConfirm={handleDeleteConfirm}
        />
      </Box>
    </LocalizationProvider>
  );
};

HabitForm.propTypes = {
  habit: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    icon: PropTypes.string,
    goal: PropTypes.shape({
      number: PropTypes.number,
      unit: PropTypes.string,
      frequency: PropTypes.string,
    }),
    period: PropTypes.shape({
      start: PropTypes.instanceOf(Date),
      end: PropTypes.instanceOf(Date),
    }),
    reminder: PropTypes.shape({
      time: PropTypes.instanceOf(Date),
      message: PropTypes.string,
    }),
  }).isRequired,
  setHabit: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default HabitForm;
