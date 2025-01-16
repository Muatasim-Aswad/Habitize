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

  // Fetch habits from API
  useEffect(() => {
    const fetchHabits = async () => {
      try {
        setIsLoading(true);
        const response = await habitService.getHabits();

        // Transform API data to HabitCard format
        const transformedHabits = response.habits.map(transformApiToCardFormat);

        setHabits(transformedHabits);
        setFilteredHabits(transformedHabits);
      } catch (error) {
        setError(error.message || "Failed to fetch habits");
      } finally {
        setIsLoading(false);
      }
    };

    fetchHabits();
  }, [selectedDate]); // Refetch when selected date changes

  const handleIncrement = async (habitId) => {
    try {
      const habit = habits.find((h) => h.id === habitId);
      if (!habit || habit.isDone) return;

      const updatedCount = habit.count + 1;
      const checkInId = habit.checkIn?._id;

      if (checkInId) {
        await habitService.updateCheckIn(checkInId, updatedCount);
      }

      setHabits((prevHabits) =>
        prevHabits.map((h) => {
          if (h.id === habitId) {
            return {
              ...h,
              count: updatedCount,
              isDone: updatedCount >= h.target,
              streak: updatedCount,
            };
          }
          return h;
        }),
      );
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
        await habitService.updateCheckIn(checkInId, updatedCount);
      }

      setHabits((prevHabits) =>
        prevHabits.map((h) => {
          if (h.id === habitId) {
            return {
              ...h,
              count: updatedCount,
              isDone: false,
              streak: updatedCount,
            };
          }
          return h;
        }),
      );
    } catch (error) {
      setError(error.message || "Failed to update habit");
    }
  };

  const handleReset = async (habitId) => {
    try {
      const habit = habits.find((h) => h.id === habitId);
      if (!habit) return;

      const checkInId = habit.checkIn?._id;

      if (checkInId) {
        await habitService.updateCheckIn(checkInId, 0);
      }

      setHabits((prevHabits) =>
        prevHabits.map((h) =>
          h.id === habitId ? { ...h, count: 0, isDone: false, streak: 0 } : h,
        ),
      );
    } catch (error) {
      setError(error.message || "Failed to reset habit");
    }
  };

  const handleDelete = async (habitId) => {
    try {
      await habitService.deleteHabit(habitId);
      setHabits((prevHabits) => {
        const updatedHabits = prevHabits.filter((h) => h.id !== habitId);
        setFilteredHabits(updatedHabits);
        return updatedHabits;
      });
    } catch (error) {
      setError(error.message || "Failed to delete habit");
    }
  };

  const handleSearchChange = (value) => {
    setSearchValue(value);

    if (!value || !value.trim()) {
      setFilteredHabits(habits);
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
  };

  return {
    habits: filteredHabits,
    isLoading,
    error,
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
