import { useState, useEffect } from "react";
import { habitService } from "../../services/api/habitService";
import { transformApiToCardFormat } from "../../utils/habitTransforms";

export const useHabits = () => {
  const [habits, setHabits] = useState([]);
  const [filteredHabits, setFilteredHabits] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [monthlyHabits, setMonthlyHabits] = useState({});

  // Update filtered habits whenever habits change
  useEffect(() => {
    if (searchValue.trim()) {
      const searchTerm = searchValue.toLowerCase().trim();
      setFilteredHabits(
        habits.filter((habit) =>
          habit?.name?.toLowerCase().includes(searchTerm),
        ),
      );
    } else {
      setFilteredHabits(habits);
    }
  }, [habits, searchValue]);

  // Fetch monthly habits data
  const fetchMonthlyHabits = async () => {
    try {
      const response = await habitService.getMonthlyHabits(selectedDate);
      if (response.days) {
        setMonthlyHabits(response.days);
      }
    } catch (error) {
      setError("Failed to fetch monthly habits");
    }
  };

  // Fetch habits from API
  const fetchHabits = async () => {
    try {
      setIsLoading(true);
      const response = await habitService.getHabits(selectedDate);
      const transformedHabits = response.habits.map(transformApiToCardFormat);
      setHabits(transformedHabits);
    } catch (error) {
      setError(error.message || "Failed to fetch habits");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHabits();
    fetchMonthlyHabits();
  }, [selectedDate]);

  const hasHabitsForDate = (date) => {
    const day = date.getDate().toString();
    return monthlyHabits[day] || false;
  };

  const updateHabitState = (habitId, updatedCount) => {
    setHabits((prevHabits) =>
      prevHabits.map((habit) => {
        if (habit.id === habitId) {
          // Create updated habit with all necessary data
          const updatedHabit = {
            ...habit,
            count: updatedCount,
            isDone: updatedCount >= habit.target,
            checkIn: {
              ...habit.checkIn,
              times_done: updatedCount,
            },
          };

          // Create complete data structure for transformApiToCardFormat
          const apiData = {
            _id: habit.id,
            name: habit.name,
            icon: habit.icon.name || habit.icon,
            goal: {
              number: habit.target,
              frequency: habit.goal.frequency,
            },
            checkIn: {
              times_done: updatedCount,
            },
            reminders: habit.reminderTime
              ? [
                  {
                    time: habit.reminderTime,
                    message: habit.reminderMessage,
                  },
                ]
              : [],
          };

          // Get new motivational message using complete data
          const transformedData = transformApiToCardFormat(apiData);

          return {
            ...updatedHabit,
            motivationalMessage: transformedData.motivationalMessage,
          };
        }
        return habit;
      }),
    );
  };

  const handleIncrement = async (habitId) => {
    try {
      const habit = habits.find((h) => h.id === habitId);
      if (!habit) return;

      const updatedCount = habit.count + 1;
      const checkInId = habit.checkIn?._id;

      if (checkInId) {
        const response = await habitService.updateCheckIn(
          checkInId,
          updatedCount,
        );
        if (response.success) {
          updateHabitState(habitId, updatedCount);
        }
      }
    } catch (error) {
      setError(error.message || "Failed to update habit");
    }
  };

  const handleDecrement = async (habitId) => {
    try {
      const habit = habits.find((h) => h.id === habitId);
      if (!habit || habit.count === 0) return;

      const updatedCount = habit.count - 1;
      const checkInId = habit.checkIn?._id;

      if (checkInId) {
        const response = await habitService.updateCheckIn(
          checkInId,
          updatedCount,
        );
        if (response.success) {
          updateHabitState(habitId, updatedCount);
        }
      }
    } catch (error) {
      setError(error.message || "Failed to update habit");
    }
  };

  const handleDelete = async (habitId) => {
    try {
      const response = await habitService.deleteHabit(habitId);
      if (response.success) {
        setHabits((prevHabits) => prevHabits.filter((h) => h.id !== habitId));
      }
    } catch (error) {
      setError(error.message || "Failed to delete habit");
    }
  };

  const handleSearchChange = (value) => {
    setSearchValue(value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return {
    habits: filteredHabits,
    isLoading,
    error,
    searchValue,
    selectedDate,
    handleIncrement,
    handleDecrement,
    handleDelete,
    handleSearchChange,
    handleDateChange,
    hasHabitsForDate,
  };
};

export default useHabits;
