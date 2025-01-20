import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import HabitForm from "../../components/HabitForm/HabitForm";
import { habitService } from "../../services/api/habitService";
import {
  transformHabitToApiFormat,
  transformApiToFormFormat,
} from "../../utils/habitTransforms";

const EditHabit = () => {
  const { habitId } = useParams();
  const [habitData, setHabitData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHabit = async () => {
      try {
        const response = await habitService.getHabit(habitId);
        const formData = transformApiToFormFormat(response.habit);
        setHabitData(formData);
      } catch (error) {
        setError("Failed to fetch habit");
      } finally {
        setIsLoading(false);
      }
    };

    fetchHabit();
  }, [habitId]);

  const handleSave = async () => {
    try {
      const apiData = transformHabitToApiFormat(habitData);
      await habitService.updateHabit(habitId, apiData);
    } catch (error) {
      throw new Error("Failed to update habit. Please try again later.");
    }
  };

  if (isLoading) {
    return null; // or loading spinner
  }

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }

  return (
    <HabitForm habit={habitData} setHabit={setHabitData} onSave={handleSave} />
  );
};

export default EditHabit;
