import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HabitForm from "../../components/HabitForm/HabitForm";
import { habitService } from "../../services/api/habitService";
import { transformHabitToApiFormat } from "../../utils/habitTransforms";

const AddHabit = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
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

  const handleSave = () => {
    const createHabitData = async () => {
      try {
        const apiData = transformHabitToApiFormat(habitData);
        await habitService.createHabit(apiData);
        navigate("/app/dashboard");
      } catch (error) {
        setError(
          error.message || "Failed to create habit. Please try again later.",
        );
      }
    };

    createHabitData();
  };

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }

  return (
    <HabitForm habit={habitData} setHabit={setHabitData} onSave={handleSave} />
  );
};

export default AddHabit;
