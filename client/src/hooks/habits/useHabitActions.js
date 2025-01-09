import { useCallback } from "react";

export const useHabitActions = (setHabits) => {
  const updateHabitsHelper = useCallback(
    (updateFn) => {
      setHabits((prevHabits) => {
        const updatedHabits = updateFn(prevHabits);
        return updatedHabits;
      });
    },
    [setHabits],
  );

  const handleIncrement = useCallback(
    (habitId) => {
      updateHabitsHelper((prevHabits) =>
        prevHabits.map((habit) => {
          if (habit.id === habitId && !habit.isDone) {
            const newCount = habit.count + 1;
            const isDone = newCount >= habit.target;
            const newStreak = isDone ? habit.streak + 1 : habit.streak;

            // Update history for today
            const today = new Date();
            const dateStr = today.toISOString().split("T")[0];
            const history = habit.history || [];
            const todayIndex = history.findIndex((h) => h.date === dateStr);

            let newHistory;
            if (todayIndex >= 0) {
              newHistory = history.map((h, index) =>
                index === todayIndex ? { ...h, count: newCount, isDone } : h,
              );
            } else {
              newHistory = [
                { date: dateStr, count: newCount, isDone },
                ...history,
              ];
            }

            return {
              ...habit,
              count: newCount,
              isDone,
              streak: newStreak,
              history: newHistory,
            };
          }
          return habit;
        }),
      );
    },
    [updateHabitsHelper],
  );

  const handleDecrement = useCallback(
    (habitId) => {
      updateHabitsHelper((prevHabits) =>
        prevHabits.map((habit) => {
          if (habit.id === habitId && habit.count > 0) {
            const newCount = habit.count - 1;
            const isDone = false;

            // Update history for today
            const today = new Date();
            const dateStr = today.toISOString().split("T")[0];
            const history = habit.history || [];
            const todayIndex = history.findIndex((h) => h.date === dateStr);

            let newHistory;
            if (todayIndex >= 0) {
              newHistory = history.map((h, index) =>
                index === todayIndex ? { ...h, count: newCount, isDone } : h,
              );
            } else {
              newHistory = [
                { date: dateStr, count: newCount, isDone },
                ...history,
              ];
            }

            return {
              ...habit,
              count: newCount,
              isDone,
              history: newHistory,
            };
          }
          return habit;
        }),
      );
    },
    [updateHabitsHelper],
  );

  const handleReset = useCallback(
    (habitId) => {
      updateHabitsHelper((prevHabits) =>
        prevHabits.map((habit) => {
          if (habit.id === habitId) {
            // Update history for today
            const today = new Date();
            const dateStr = today.toISOString().split("T")[0];
            const history = habit.history || [];
            const todayIndex = history.findIndex((h) => h.date === dateStr);

            let newHistory;
            if (todayIndex >= 0) {
              newHistory = history.map((h, index) =>
                index === todayIndex ? { ...h, count: 0, isDone: false } : h,
              );
            } else {
              newHistory = [
                { date: dateStr, count: 0, isDone: false },
                ...history,
              ];
            }

            return {
              ...habit,
              count: 0,
              isDone: false,
              history: newHistory,
            };
          }
          return habit;
        }),
      );
    },
    [updateHabitsHelper],
  );

  const handleDelete = useCallback(
    (habitId) => {
      updateHabitsHelper((prevHabits) =>
        prevHabits.filter((habit) => habit.id !== habitId),
      );
    },
    [updateHabitsHelper],
  );

  return {
    handleIncrement,
    handleDecrement,
    handleReset,
    handleDelete,
  };
};
