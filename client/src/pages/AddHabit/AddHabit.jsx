/* eslint-disable react/prop-types */
import React, { useState } from "react";
import axios from "axios";
import HabitForm from "../../components/HabitForm/HabitForm";

const AddHabit = ({ onHabitAdded }) => {
  const [habitData, setHabitData] = useState({
    icon: "",
    name: "",
    goal: {
      number: null,
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

  const handleSave = async () => {
    try {
      const response = await axios.post("/api/habits", {
        habit: habitData,
      });

      if (response.status === 201) {
        alert("Habit created successfully!");
        setHabitData({
          icon: "",
          name: "",
          goal: "",
          frequency: "",
          period: "",
          startDate: null,
          endDate: null,
          reminderTime: null,
          reminderMessage: "",
        });
        onHabitAdded();
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error creating habit:", error);
      alert("Failed to create habit. Please try again.");
    }
  };

  return (
    <HabitForm habit={habitData} setHabit={setHabitData} onSave={handleSave} />
  );
};

export default AddHabit;
