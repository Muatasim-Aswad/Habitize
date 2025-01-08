import React, { memo, useCallback } from "react";
import PropTypes from "prop-types";
import { Box, Typography, IconButton } from "@mui/material";
import {
  PencilSimple,
  X,
  Plus,
  Minus,
  ArrowCounterClockwise,
} from "phosphor-react";
import { COLORS } from "../../../../theme/constants";

const cardStyles = {
  container: {
    display: "flex",
    alignItems: "center",
    backgroundColor: COLORS.background.card,
    borderRadius: "16px",
    padding: "16px 24px",
    gap: "16px",
    width: "100%",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
  },
  infoContainer: {
    display: "flex",
    alignItems: "center",
    flex: 1,
    gap: "16px",
  },
  habitName: {
    fontSize: "1rem",
    color: COLORS.text.primary,
    fontWeight: "700",
    textTransform: "uppercase",
    marginBottom: "4px",
  },
  streakText: {
    fontSize: "0.875rem",
    fontWeight: "600",
  },
  counterContainer: {
    display: "flex",
    alignItems: "center",
    backgroundColor: COLORS.primary.main,
    borderRadius: "24px",
    minWidth: "120px",
    height: "40px",
    padding: "0 4px",
  },
  actionButton: {
    width: "40px",
    height: "40px",
    color: COLORS.primary.contrast,
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.2)",
    },
    "&.Mui-disabled": {
      color: COLORS.primary.contrast,
      opacity: 0.5,
    },
  },
  editButton: {
    width: "40px",
    height: "40px",
    color: COLORS.primary.contrast,
    backgroundColor: COLORS.primary.main,
    "&:hover": {
      backgroundColor: COLORS.primary.main,
    },
  },
  deleteButton: {
    width: "40px",
    height: "40px",
    color: COLORS.primary.contrast,
    backgroundColor: COLORS.secondary.main,
    "&:hover": {
      backgroundColor: COLORS.secondary.dark,
    },
  },
};

const HabitCard = memo(
  ({ habit, onIncrement, onDecrement, onEdit, onDelete, onReset }) => {
    const { icon: HabitIcon, name, streak, count, target, isDone } = habit;

    const getProgressMessage = useCallback(() => {
      if (isDone) return "Done";
      if (count === 0) return "New Seed!";
      const remaining = target - count;
      return `Just ${remaining} more to finish!`;
    }, [count, target, isDone]);

    const streakMessage = useCallback(() => {
      return streak > 0 && !isDone
        ? `${streak} times in a row!`
        : getProgressMessage();
    }, [streak, isDone, getProgressMessage]);

    return (
      <Box sx={cardStyles.container}>
        <Box sx={cardStyles.infoContainer}>
          <HabitIcon size={28} color={COLORS.text.primary} />
          <Box>
            <Typography sx={cardStyles.habitName}>{name}</Typography>
            <Typography
              sx={{
                ...cardStyles.streakText,
                color: isDone ? COLORS.primary.main : COLORS.secondary.main,
              }}
            >
              {streakMessage()}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Box sx={cardStyles.counterContainer}>
            <IconButton
              onClick={onDecrement}
              disabled={isDone || count === 0}
              sx={cardStyles.actionButton}
            >
              <Minus size={20} />
            </IconButton>

            <Typography
              sx={{
                flex: 1,
                textAlign: "center",
                fontSize: "0.875rem",
                fontWeight: "600",
                color: COLORS.primary.contrast,
              }}
            >
              {isDone ? "Done" : `${count}/${target}`}
            </Typography>

            <IconButton
              onClick={onIncrement}
              disabled={isDone}
              sx={cardStyles.actionButton}
            >
              <Plus size={20} />
            </IconButton>
          </Box>

          <Box sx={{ display: "flex", gap: "8px" }}>
            {isDone ? (
              <IconButton onClick={onReset} sx={cardStyles.editButton}>
                <ArrowCounterClockwise size={20} />
              </IconButton>
            ) : (
              <IconButton onClick={onEdit} sx={cardStyles.editButton}>
                <PencilSimple size={20} />
              </IconButton>
            )}

            <IconButton onClick={onDelete} sx={cardStyles.deleteButton}>
              <X size={20} />
            </IconButton>
          </Box>
        </Box>
      </Box>
    );
  },
);

HabitCard.displayName = "HabitCard";

HabitCard.propTypes = {
  habit: PropTypes.shape({
    icon: PropTypes.elementType.isRequired,
    name: PropTypes.string.isRequired,
    streak: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
    target: PropTypes.number.isRequired,
    isDone: PropTypes.bool.isRequired,
  }).isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
};

export default HabitCard;
