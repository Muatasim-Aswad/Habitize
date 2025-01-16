/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import HabitForm from "../../components/HabitForm/HabitForm";
import { userService } from "../../services/api";
import { useParams } from "react-router-dom";
import { parseISO } from "date-fns";

const EditHabit = () => {
  const { habitId } = useParams();
  const [habitData, setHabitData] = useState({
    icon: "",
    name: "",
    goal: {
      number: 0,
      unit: "",
      frequency: "",
    },
    period: {
      start: null,
      end: null,
    },
    reminder: {
      time: null,
      message: "",
    },
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHabitData = async () => {
      try {
        const response = await userService.getHabit(habitId);

        const habit = {
          name: response.habit.name,
          icon: response.habit.icon,
          goal: response.habit.goal,
          period: response.habit.period,
          reminder: response.habit.reminders[0],
        };

        habit.period.start = parseISO(habit.period.start);
        habit.period.end = parseISO(habit.period.end);

        habit.reminder.time = parseISO(`1970-01-01T${habit.reminder.time}`);

        setHabitData(habit);
      } catch (error) {
        setError("Failed to load habit data. Please try again later.");
      }
    };

    fetchHabitData();
  }, [habitId]);

  const handleSave = () => {
    const updateHabitData = async () => {
      try {
        //copy the habit data into a new object
        //from date objects get the date string in "YYYY-MM-DD" format
        //and the time string in "HH:mm" format
      } catch (error) {
        setError("Failed to update habit. Please try again later.");
      }
    };

    updateHabitData();
  };

  return (
    <div>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <HabitForm
        habit={habitData}
        setHabit={setHabitData}
        onSave={handleSave}
      />
    </div>
  );
};

export default EditHabit;
