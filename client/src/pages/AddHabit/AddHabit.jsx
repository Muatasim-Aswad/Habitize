/* eslint-disable react/prop-types */
import React, { useState } from "react";
import axios from "axios";
import HabitForm from "../../components/HabitForm";

const AddHabit = ({ onHabitAdded }) => {
  const [habitData, setHabitData] = useState({
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
    <HabitForm
      habitData={habitData}
      setHabitData={setHabitData}
      onSave={handleSave}
    />
  );
};

export default AddHabit;
