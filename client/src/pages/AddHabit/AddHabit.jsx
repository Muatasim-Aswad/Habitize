import React, { useState } from "react";
import HabitForm from "../../components/HabitForm/HabitForm";
import { habitService } from "../../services/api/habitService";
import { transformHabitToApiFormat } from "../../utils/habitTransforms";

const AddHabit = () => {
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
      const apiData = transformHabitToApiFormat(habitData);
      await habitService.createHabit(apiData);
    } catch (error) {
      throw new Error("Failed to create habit. Please try again later.");
    }
  };

  return (
    <HabitForm habit={habitData} setHabit={setHabitData} onSave={handleSave} />
  );
};

export default AddHabit;
