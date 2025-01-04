import React from "react";
import PropTypes from "prop-types";
import { Stack } from "@mui/material";
import HabitCard from "./HabitCard/HabitCard";
import { SPACING } from "../../../theme/constants";

const HabitList = ({ habits, onIncrement, onDecrement, onEdit, onDelete }) => {
  return (
    <Stack spacing={SPACING.sm}>
      {habits.map((habit) => (
        <HabitCard
          key={habit.id}
          habit={habit}
          onIncrement={() => onIncrement(habit.id)}
          onDecrement={() => onDecrement(habit.id)}
          onEdit={() => onEdit(habit.id)}
          onDelete={() => onDelete(habit.id)}
        />
      ))}
    </Stack>
  );
};

HabitList.propTypes = {
  habits: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
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
};

export default HabitList;
