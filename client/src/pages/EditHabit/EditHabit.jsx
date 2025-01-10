/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import HabitForm from "../../components/HabitForm";

const EditHabit = ({ habitId }) => {
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

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHabitData = async () => {
      try {
        const response = await fetch(`/api/habits/${habitId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch habit data");
        }
        const data = await response.json();
        setHabitData(data);
      } catch (error) {
        setError("Failed to load habit data. Please try again later.");
      }
    };

    fetchHabitData();
  }, [habitId]);

  const handleSave = () => {
    const updateHabitData = async () => {
      try {
        const response = await fetch(`/api/habits/${habitId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(habitData),
        });

        if (!response.ok) {
          throw new Error("Failed to update habit data");
        }

        const updatedData = await response.json();
        setHabitData(updatedData);
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
        habitData={habitData}
        setHabitData={setHabitData}
        onSave={handleSave}
      />
    </div>
  );
};

export default EditHabit;
