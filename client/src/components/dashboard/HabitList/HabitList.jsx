import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import HabitCard from "./HabitCard/HabitCard";

const HabitList = ({
  habits,
  onIncrement,
  onDecrement,
  onEdit,
  onDelete,
  onReset,
}) => {
  return (
    <Box>
      {habits.map((habit) => (
        <HabitCard
          key={habit.id}
          habit={habit}
          onIncrement={() => onIncrement(habit.id)}
          onDecrement={() => onDecrement(habit.id)}
          onEdit={() => onEdit(habit.id)}
          onDelete={() => onDelete(habit.id)}
          onReset={() => onReset(habit.id)}
        />
      ))}
    </Box>
  );
};

HabitList.propTypes = {
  habits: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      icon: PropTypes.elementType.isRequired,
      name: PropTypes.string.isRequired,
      streak: PropTypes.number.isRequired,
      count: PropTypes.number.isRequired,
      target: PropTypes.number.isRequired,
      isDone: PropTypes.bool.isRequired,
    }),
  ).isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
};

export default HabitList;
