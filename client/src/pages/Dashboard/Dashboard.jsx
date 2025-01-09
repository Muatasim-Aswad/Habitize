import React, { useState } from "react";
import { Box } from "@mui/material";
import { SPACING, COLORS } from "../../theme/constants";
import HabitList from "../../components/dashboard/HabitList/HabitList";
import HabitFilters from "../../components/dashboard/HabitFilters/HabitFilters";
import AddHabitButton from "../../components/dashboard/AddHabitButton/AddHabitButton";
import DashboardHeader from "../../components/dashboard/DashboardHeader/DashboardHeader";
import ConfirmationDialog from "../../components/common/ConfirmationDialog/ConfirmationDialog";
import BottomNavigation from "../../components/navigation/BottomNavigation";
import { useHabits } from "../../hooks/habits/useHabits";
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

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: COLORS.background.default,
        position: "relative",
      }}
    >
      <Box
        component="main"
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: { xs: SPACING.sm, sm: SPACING.md },
          paddingBottom: { xs: "80px", sm: SPACING.md },
        }}
      >
        <DashboardHeader userName="John" />

        <HabitFilters
          searchValue={searchValue}
          onSearchChange={handleSearchChange}
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
        />

        <Box sx={{ flex: 1, overflow: "auto" }}>
          <HabitList
            habits={habits}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
            onReset={handleReset}
          />
        </Box>

        <AddHabitButton onClick={handleAddHabit} />
      </Box>

      <BottomNavigation />

      <ConfirmationDialog
        open={deleteDialogOpen}
        title="Delete Habit"
        message="Are you sure you want to delete this habit? This action cannot be undone."
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </Box>
  );
};

export default Dashboard;
