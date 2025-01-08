import { useState, useEffect } from "react";
import mockData from "../../data/mockHabits.json";
import { iconMap } from "../../constants/icons";
import { useHabitFilters } from "./useHabitFilters";
import { useHabitActions } from "./useHabitActions";

export const useHabits = () => {
  const [habits, setHabits] = useState([]);

  // Initialize habits with icons
  useEffect(() => {
    const habitsWithIcons = mockData.habits.map((habit) => ({
      ...habit,
      icon: iconMap[habit.iconName],
    }));
    setHabits(habitsWithIcons);
  }, []);

  const {
    filteredHabits,
    searchValue,
    selectedDate,
    handleSearchChange,
    handleDateChange,
  } = useHabitFilters(habits);

  const { handleIncrement, handleDecrement, handleReset, handleDelete } =
    useHabitActions(setHabits);

  // Update filtered habits when habits change
  useEffect(() => {
    if (habits.length === 0) {
      const habitsWithIcons = mockData.habits.map((habit) => ({
        ...habit,
        icon: iconMap[habit.iconName],
      }));
      setHabits(habitsWithIcons);
    }
  }, [habits]);

  return {
    habits: filteredHabits,
    searchValue,
    selectedDate,
    handleIncrement,
    handleDecrement,
    handleReset,
    handleDelete,
    handleSearchChange,
    handleDateChange,
  };
};
