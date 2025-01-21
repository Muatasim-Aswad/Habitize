import React, { useState } from "react";
import { Box } from "@mui/material";
import { SPACING, COLORS } from "../../theme/constants";
import HabitList from "./components/HabitList/HabitList";
import HabitFilters from "./components/HabitFilters/HabitFilters";
import AddHabitButton from "./components/AddHabitButton/AddHabitButton";
import DashboardHeader from "./components/DashboardHeader/DashboardHeader";
import ConfirmationDialog from "../../components/common/ConfirmationDialog/ConfirmationDialog";
import BottomNavigation from "../../layouts/AppLayout/navigation/BottomNavigation";
import { useHabits } from "../../hooks/habits/useHabits";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import DashboardFallback from "../../components/fallback/DashboardFallback";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
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
    hasHabitsForDate,
  } = useHabits();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [habitToDelete, setHabitToDelete] = useState(null);

  const firstName = user?.name?.split(" ")[0] || "Guest";

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
        <DashboardHeader userName={firstName} />

        <HabitFilters
          searchValue={searchValue}
          onSearchChange={handleSearchChange}
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
          hasHabitsForDate={hasHabitsForDate}
        />

        <Box
          sx={{
            flex: 1,
            overflow: "hidden",
            width: "100%",
          }}
        >
          {habits.length === 0 && <DashboardFallback />}
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
