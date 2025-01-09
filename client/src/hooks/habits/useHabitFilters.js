import { useState, useEffect } from "react";
import { toDateString } from "../../utils/dateUtils";

export const useHabitFilters = (habits) => {
  const [filteredHabits, setFilteredHabits] = useState(habits);
  const [searchValue, setSearchValue] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Update filtered habits when habits prop changes
  useEffect(() => {
    if (habits.length > 0) {
      if (searchValue) {
        handleSearchChange(searchValue);
      } else {
        filterHabitsByDate(selectedDate);
      }
    }
  }, [habits]);

  const handleSearchChange = (value) => {
    setSearchValue(value);

    if (!value || !value.trim()) {
      filterHabitsByDate(selectedDate);
      return;
    }

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
        count: historyEntry?.count || habit.count || 0,
        isDone: historyEntry?.isDone || habit.isDone || false,
      };
    });
    setFilteredHabits(filtered);
  };

  return {
    filteredHabits,
    searchValue,
    selectedDate,
    handleSearchChange,
    handleDateChange,
  };
};
