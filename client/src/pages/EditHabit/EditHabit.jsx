import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HabitForm from "../../components/HabitForm/HabitForm";
import { habitService } from "../../services/api/habitService";
import {
  transformHabitToApiFormat,
  transformApiToFormFormat,
} from "../../utils/habitTransforms";

const EditHabit = () => {
  const navigate = useNavigate();
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

  const handleSave = () => {
    const updateHabitData = async () => {
      try {
        const apiData = transformHabitToApiFormat(habitData);
        await habitService.updateHabit(habitId, apiData);
        navigate("/app/dashboard");
      } catch (error) {
        setError("Failed to update habit. Please try again later.");
      }
    };

    updateHabitData();
  };

  if (isLoading) {
    return null; // veya loading spinner
  }

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }

  return (
    <HabitForm habit={habitData} setHabit={setHabitData} onSave={handleSave} />
  );
};

export default EditHabit;
