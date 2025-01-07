import React, { useState } from "react";
import {
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { SPACING } from "../../theme/constants";
import HabitList from "../../components/dashboard/HabitList/HabitList";
import HabitFilters from "../../components/dashboard/HabitFilters/HabitFilters";
import AddHabitButton from "../../components/dashboard/AddHabitButton/AddHabitButton";
import { useHabits } from "../../hooks/useHabits";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const {
    habits,
    searchValue,
    selectedDate,
    handleIncrement,
    handleDecrement,
    handleReset,
    handleDelete: handleDeleteHabit,
    handleSearchChange,
    handleDateChange,
  } = useHabits();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [habitToDelete, setHabitToDelete] = useState(null);

  const handleDeleteClick = (habitId) => {
    setHabitToDelete(habitId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (habitToDelete) {
      handleDeleteHabit(habitToDelete);
    }
    setDeleteDialogOpen(false);
    setHabitToDelete(null);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setHabitToDelete(null);
  };

  const handleEdit = (habitId) => {
    navigate(`/app/edit-habit/${habitId}`);
  };

  const handleAddHabit = () => {
    navigate("/app/add-habit");
  };

  const getGreeting = () => {
    const user = "John"; // This part will come from the auth system
    return `Welcome back, ${user}!`;
  };

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        justifyContent: "center", // Center content horizontally
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "1200px", // Maximum width
          padding: SPACING.md,
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: SPACING.lg,
          }}
        >
          <Box
            component="img"
            src="/logo.png"
            alt="Habitize Logo"
            sx={{
              height: "40px",
              width: "auto",
              display: { xs: "block", sm: "block" },
            }}
          />
          <Typography
            variant="h1"
            sx={{
              fontSize: "1.5rem",
              fontWeight: "700",
              color: "#4F8A8B",
            }}
          >
            {getGreeting()}
          </Typography>
        </Box>

        {/* Filters */}
        <HabitFilters
          searchValue={searchValue}
          onSearchChange={handleSearchChange}
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
        />

        {/* Habit List */}
        <HabitList
          habits={habits}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
          onReset={handleReset}
        />

        <AddHabitButton onClick={handleAddHabit} />

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={deleteDialogOpen}
          onClose={handleDeleteCancel}
          aria-labelledby="delete-dialog-title"
          aria-describedby="delete-dialog-description"
        >
          <DialogTitle id="delete-dialog-title">{"Delete Habit"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="delete-dialog-description">
              Are you sure you want to delete this habit? This action cannot be
              undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteCancel}>Cancel</Button>
            <Button onClick={handleDeleteConfirm} color="error" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default Dashboard;
