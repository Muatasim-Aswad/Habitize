import { useState, useEffect } from "react";
import mockData from "../data/mockHabits.json";
import { iconMap } from "../constants/icons";
import { toDateString } from "../utils/dateUtils";

export const useHabits = () => {
  const [habits, setHabits] = useState([]);
  const [filteredHabits, setFilteredHabits] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Initialize habits with icons
  useEffect(() => {
    const habitsWithIcons = mockData.habits.map((habit) => ({
      ...habit,
      icon: iconMap[habit.iconName],
    }));
    setHabits(habitsWithIcons);
    setFilteredHabits(habitsWithIcons);
  }, []);

  const updateHabitsHelper = (updateFn) => {
    setHabits((prevHabits) => {
      const newHabits = updateFn(prevHabits);
      setFilteredHabits(newHabits);
      return newHabits;
    });
  };

  const handleIncrement = (habitId) => {
    updateHabitsHelper((prevHabits) =>
      prevHabits.map((habit) => {
        if (habit.id === habitId && !habit.isDone) {
          const newCount = habit.count + 1;
          const isDone = newCount >= habit.target;
          return {
            ...habit,
            count: newCount,
            isDone,
            streak: isDone ? habit.streak + 1 : habit.streak,
          };
        }
        return habit;
      }),
    );
  };

  const handleDecrement = (habitId) => {
    updateHabitsHelper((prevHabits) =>
      prevHabits.map((habit) => {
        if (habit.id === habitId && habit.count > 0) {
          const newCount = habit.count - 1;
          return {
            ...habit,
            count: newCount,
            isDone: false,
          };
        }
        return habit;
      }),
    );
  };

  const handleReset = (habitId) => {
    updateHabitsHelper((prevHabits) =>
      prevHabits.map((habit) =>
        habit.id === habitId ? { ...habit, count: 0, isDone: false } : habit,
      ),
    );
  };

  const handleDelete = (habitId) => {
    updateHabitsHelper((prevHabits) =>
      prevHabits.filter((habit) => habit.id !== habitId),
    );
  };

  const handleSearchChange = (value) => {
    setSearchValue(value);

    // If search is empty, show all habits
    if (!value || !value.trim()) {
      setFilteredHabits(habits);
      return;
    }

    // Filter habits by search term
    const searchTerm = value.toLowerCase().trim();
    const filtered = habits.filter((habit) =>
      habit?.name?.toLowerCase().includes(searchTerm),
    );
    setFilteredHabits(filtered);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    filterHabitsByDate(date);
  };

  const filterHabitsByDate = (date) => {
    const dateStr = toDateString(date);
    const filtered = habits.map((habit) => {
      const historyEntry = habit.history?.find((h) => h.date === dateStr);
      return {
        ...habit,
        count: historyEntry?.count || 0,
        isDone: historyEntry?.isDone || false,
      };
    });
    setFilteredHabits(filtered);
  };

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

export default useHabits;
