import React from "react";
import PropTypes from "prop-types";
import { Box, Typography, IconButton } from "@mui/material";
import { PencilSimple, X, Plus, Minus } from "phosphor-react";
import { COLORS } from "../../../../theme/constants";

const HabitCard = ({ habit, onIncrement, onDecrement, onEdit, onDelete }) => {
  const { icon: HabitIcon, name, streak, count, target, isDone } = habit;

  const getProgressMessage = () => {
    if (isDone) return "done";
    if (count === 0) return "New Seed!";
    const remaining = target - count;
    return `Just ${remaining} more to finish!`;
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: COLORS.background.card,
        borderRadius: "16px",
        padding: "16px 24px",
        gap: "16px",
        width: "100%",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
        marginBottom: "16px",
        "&:hover": {
          backgroundColor: "rgba(255, 194, 151, 0.8)",
        },
      }}
    >
      {/* Icon and Name */}
      <Box sx={{ display: "flex", alignItems: "center", flex: 1, gap: "16px" }}>
        <HabitIcon size={28} color={COLORS.text.primary} />
        <Box>
          <Typography
            sx={{
              fontSize: "1rem",
              color: COLORS.text.primary,
              fontWeight: "700",
              textTransform: "uppercase",
              marginBottom: "4px",
            }}
          >
            {name}
          </Typography>
          <Typography
            sx={{
              fontSize: "0.875rem",
              color: isDone ? "#4F8A8B" : "#B87264",
              fontWeight: "600",
            }}
          >
            {streak > 0 && !isDone
              ? `${streak} times in a row!`
              : getProgressMessage()}
          </Typography>
        </Box>
      </Box>

      {/* Counter and Actions */}
      <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {/* Progress Counter */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#4F8A8B",
            borderRadius: "24px",
            minWidth: "120px",
            height: "40px",
            padding: "0 4px",
          }}
        >
          <IconButton
            onClick={onDecrement}
            disabled={isDone || count === 0}
            sx={{
              color: "#FFF",
              padding: "8px",
              "&:hover": {
                backgroundColor: "transparent",
              },
              "&.Mui-disabled": {
                color: "#FFF",
                opacity: 0.5,
              },
            }}
          >
            <Minus size={20} />
          </IconButton>

          <Typography
            sx={{
              flex: 1,
              textAlign: "center",
              fontSize: "0.875rem",
              fontWeight: "600",
              color: "#FFF",
            }}
          >
            {isDone ? "done" : `${count}/${target}`}
          </Typography>

          <IconButton
            onClick={onIncrement}
            disabled={isDone}
            sx={{
              color: "#FFF",
              padding: "8px",
              "&:hover": {
                backgroundColor: "transparent",
              },
              "&.Mui-disabled": {
                color: "#FFF",
                opacity: 0.5,
              },
            }}
          >
            <Plus size={20} />
          </IconButton>
        </Box>

        {/* Edit and Delete */}
        <Box sx={{ display: "flex", gap: "8px" }}>
          <IconButton
            onClick={onEdit}
            sx={{
              width: "40px",
              height: "40px",
              backgroundColor: "#4F8A8B",
              color: "#FFF",
              "&:hover": {
                backgroundColor: "#4F8A8B",
              },
            }}
          >
            <PencilSimple size={20} />
          </IconButton>

          <IconButton
            onClick={onDelete}
            sx={{
              width: "40px",
              height: "40px",
              backgroundColor: "#B87264",
              color: "#FFF",
              "&:hover": {
                backgroundColor: "#A65D4F",
              },
            }}
          >
            <X size={20} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

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
};

export default HabitCard;
