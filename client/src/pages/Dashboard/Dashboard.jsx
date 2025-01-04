import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import {
  Barbell,
  Book,
  PencilSimple,
  GraduationCap,
  Sparkle,
  Brain,
  House,
  Bell,
  ChartLine,
  Gear,
  SignOut,
} from "phosphor-react";
import HabitList from "../../components/dashboard/HabitList/HabitList";
import HabitFilters from "../../components/dashboard/HabitFilters/HabitFilters";
import AddHabitButton from "../../components/dashboard/AddHabitButton/AddHabitButton";
import { COLORS, SPACING, TYPOGRAPHY, DASHBOARD } from "../../theme/constants";

const navItems = [
  { icon: House, label: "Home", path: "/" },
  { icon: Bell, label: "Notifications", path: "/notifications" },
  { icon: ChartLine, label: "Statistics", path: "/statistics" },
  { icon: Gear, label: "Settings", path: "/settings" },
  { icon: SignOut, label: "Logout", path: "/logout" },
];

// Mock data - will be replaced with API calls
const mockHabits = [
  {
    id: 1,
    icon: Barbell,
    name: "EXERCISE",
    streak: 11,
    count: 5,
    target: 5,
    isDone: true,
  },
  {
    id: 2,
    icon: Book,
    name: "Read",
    streak: 5,
    count: 0,
    target: 5,
    isDone: false,
  },
  {
    id: 3,
    icon: PencilSimple,
    name: "Journal",
    streak: 3,
    count: 2,
    target: 5,
    isDone: false,
  },
  {
    id: 4,
    icon: GraduationCap,
    name: "STUDY",
    streak: 3,
    count: 0,
    target: 5,
    isDone: false,
  },
  {
    id: 5,
    icon: Sparkle,
    name: "CLEAN",
    streak: 7,
    count: 0,
    target: 5,
    isDone: false,
  },
  {
    id: 6,
    icon: Brain,
    name: "MEDITATION",
    streak: 10,
    count: 0,
    target: 5,
    isDone: false,
  },
];

const Dashboard = () => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [habits, setHabits] = useState(mockHabits);

  const handleSearchChange = (value) => {
    setSearchValue(value);
  };

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  const handleFilterClick = () => {
    // TODO: Implement filter dialog
  };

  const handleIncrement = (habitId) => {
    setHabits((prevHabits) =>
      prevHabits.map((habit) => {
        if (habit.id === habitId && habit.count < habit.target) {
          return {
            ...habit,
            count: habit.count + 1,
            isDone: habit.count + 1 === habit.target,
          };
        }
        return habit;
      }),
    );
  };

  const handleDecrement = (habitId) => {
    setHabits((prevHabits) =>
      prevHabits.map((habit) => {
        if (habit.id === habitId && habit.count > 0) {
          return {
            ...habit,
            count: habit.count - 1,
            isDone: false,
          };
        }
        return habit;
      }),
    );
  };

  const handleEdit = () => {
    // TODO: Implement edit dialog
  };

  const handleDelete = () => {
    // TODO: Implement delete confirmation
  };

  const handleAddHabit = () => {
    // TODO: Implement add habit dialog
  };

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: COLORS.background.default,
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          width: DASHBOARD.nav.width,
          backgroundColor: COLORS.background.nav,
          padding: SPACING.md,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: SPACING.xl,
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <Box sx={{ fontSize: "2rem", color: COLORS.primary.main }}>H</Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: SPACING.lg,
            flex: 1,
          }}
        >
          {navItems.map((item, index) => (
            <Box
              key={item.label}
              sx={{
                cursor: "pointer",
                color: index === 0 ? COLORS.primary.main : COLORS.text.primary,
                "&:hover": { color: COLORS.primary.main },
              }}
            >
              <item.icon
                size={DASHBOARD.icon.size.medium}
                weight={index === 0 ? "fill" : "regular"}
              />
            </Box>
          ))}
        </Box>
      </Box>

      <Box
        sx={{
          flex: 1,
          marginLeft: DASHBOARD.nav.width,
          p: SPACING.md,
          maxWidth: "1200px",
        }}
      >
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
            }}
          />

          <Typography
            sx={{
              ...TYPOGRAPHY.h4,
              color: COLORS.primary.main,
            }}
          >
            Welcome, user!
          </Typography>
        </Box>

        <HabitFilters
          searchValue={searchValue}
          onSearchChange={handleSearchChange}
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
          onFilterClick={handleFilterClick}
        />

        <HabitList
          habits={habits}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <AddHabitButton onClick={handleAddHabit} />
      </Box>
    </Box>
  );
};

export default Dashboard;
