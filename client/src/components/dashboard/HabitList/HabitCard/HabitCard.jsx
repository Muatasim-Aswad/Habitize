import React, { memo, useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  PencilSimple,
  X,
  Plus,
  ArrowCounterClockwise,
  Minus,
} from "phosphor-react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { COLORS } from "../../../../theme/constants";

const cardStyles = {
  container: {
    display: "flex",
    alignItems: "center",
    backgroundColor: COLORS.background.card,
    borderRadius: { xs: "4vw", sm: "16px" },
    padding: { xs: "2vh 4vw", sm: "16px 24px" },
    gap: { xs: "1vh", sm: "16px" },
    width: "100%",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
    flexDirection: { xs: "column", sm: "row" },
    position: "relative",
  },
  mobileActions: {
    position: "absolute",
    top: "2vh",
    right: "4vw",
    display: "flex",
    gap: "2vw",
    zIndex: 1,
  },
  infoContainer: {
    display: "flex",
    alignItems: { xs: "flex-start", sm: "center" },
    flex: { xs: "unset", sm: "0 0 auto" },
    gap: { xs: "3vw", sm: "16px" },
    width: { xs: "100%", sm: "auto" },
  },
  textContainer: {
    flex: { xs: 1, sm: "unset" },
  },
  reminderContainer: {
    display: { xs: "flex", sm: "flex" },
    alignItems: "center",
    gap: { xs: "2vw", sm: "8px" },
    color: "#4A3B28",
    fontSize: { xs: "3.5vw", sm: "0.75rem" },
    marginTop: { xs: "0.5vh", sm: 0 },
    flex: { xs: "unset", sm: 1 },
    justifyContent: { xs: "flex-start", sm: "center" },
    marginLeft: { xs: 0, sm: "24px" },
    marginRight: { xs: 0, sm: "24px" },
    fontWeight: "900",
    lineHeight: { xs: 1.2, sm: 1.5 },
    minWidth: { sm: "200px" },
  },
  spacer: {
    flex: { xs: "unset", sm: 1 },
    minWidth: { sm: "200px" },
  },
  actionsContainer: {
    display: "flex",
    alignItems: "center",
    width: { xs: "100%", sm: "auto" },
    justifyContent: { xs: "space-between", sm: "flex-end" },
    gap: { xs: "3vw", sm: "12px" },
    marginLeft: { sm: "auto" },
  },
  habitName: {
    fontSize: { xs: "4vw", sm: "1rem" },
    color: COLORS.text.primary,
    fontWeight: "700",
    textTransform: "uppercase",
    marginBottom: { xs: "0.5vh", sm: "4px" },
    lineHeight: { xs: 1.2, sm: 1.5 },
  },
  streakText: {
    fontSize: { xs: "3.5vw", sm: "0.875rem" },
    fontWeight: "600",
    lineHeight: { xs: 1.2, sm: 1.5 },
  },
  counterContainer: {
    display: "flex",
    alignItems: "center",
    backgroundColor: COLORS.primary.main,
    borderRadius: { xs: "3vw", sm: "24px" },
    flex: { xs: 1, sm: "0 0 auto" },
    minWidth: { xs: "auto", sm: "120px" },
    height: { xs: "11vw", sm: "40px" },
    maxHeight: { xs: "50px", sm: "40px" },
  },
  actionButton: {
    width: { xs: "11vw", sm: "40px" },
    height: { xs: "11vw", sm: "40px" },
    maxWidth: { xs: "50px", sm: "40px" },
    maxHeight: { xs: "50px", sm: "40px" },
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
  moreButton: {
    width: { xs: "11vw", sm: "40px" },
    height: { xs: "11vw", sm: "40px" },
    maxWidth: { xs: "50px", sm: "40px" },
    maxHeight: { xs: "50px", sm: "40px" },
    color: COLORS.text.primary,
    "&:hover": {
      backgroundColor: "transparent",
    },
    "& .dots": {
      display: "flex",
      flexDirection: "column",
      gap: "1.2vw",
      alignItems: "center",
      "& .dot": {
        width: "1.6vw",
        height: "1.6vw",
        maxWidth: "6px",
        maxHeight: "6px",
        backgroundColor: "currentColor",
        borderRadius: "50%",
      },
    },
  },
};

const HabitCard = memo(
  ({ habit, onIncrement, onDecrement, onEdit, onDelete, onReset }) => {
    const {
      icon: HabitIcon,
      name,
      count,
      target,
      isDone,
      reminderTime,
      reminderMessage,
      motivationalMessage,
    } = habit;

    const [anchorEl, setAnchorEl] = useState(null);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const handleMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
      setAnchorEl(null);
    };

    const handleEdit = () => {
      handleMenuClose();
      onEdit();
    };

    const handleDelete = () => {
      handleMenuClose();
      onDelete();
    };

    const handleReset = () => {
      handleMenuClose();
      onReset();
    };

    return (
      <Box sx={cardStyles.container}>
        <Box sx={cardStyles.infoContainer}>
          <HabitIcon
            size={isMobile ? "12vw" : 36}
            color={COLORS.text.primary}
          />
          <Box sx={cardStyles.textContainer}>
            <Typography sx={cardStyles.habitName}>{name}</Typography>
            <Typography
              sx={{
                ...cardStyles.streakText,
                color: isDone ? COLORS.primary.main : COLORS.secondary.main,
              }}
            >
              {motivationalMessage}
            </Typography>
          </Box>
        </Box>

        {reminderTime ? (
          <Box sx={cardStyles.reminderContainer}>
            <AccessTimeIcon sx={{ fontSize: { xs: "3.5vw", sm: "1rem" } }} />
            <Typography component="span">
              {reminderTime} - {reminderMessage}
            </Typography>
          </Box>
        ) : (
          <Box sx={cardStyles.spacer} />
        )}

        {isMobile ? (
          <Box sx={cardStyles.mobileActions}>
            <IconButton
              onClick={onIncrement}
              disabled={isDone}
              sx={{
                backgroundColor: COLORS.primary.main,
                color: COLORS.primary.contrast,
                width: "11vw",
                height: "11vw",
                maxWidth: "44px",
                maxHeight: "44px",
                "&:hover": {
                  backgroundColor: COLORS.primary.main,
                },
              }}
            >
              <Plus weight="bold" />
            </IconButton>
            <IconButton onClick={handleMenuOpen} sx={cardStyles.moreButton}>
              <div className="dots">
                <div className="dot" />
                <div className="dot" />
                <div className="dot" />
              </div>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              {!isDone && [
                <MenuItem key="progress" sx={{ color: COLORS.text.secondary }}>
                  Progress: {count}/{target}
                </MenuItem>,
                <MenuItem
                  key="decrease"
                  onClick={onDecrement}
                  disabled={count === 0}
                >
                  <Minus weight="bold" style={{ marginRight: 8 }} />
                  Decrease
                </MenuItem>,
              ]}
              <MenuItem onClick={isDone ? handleReset : handleEdit}>
                {isDone ? (
                  <>
                    <ArrowCounterClockwise
                      weight="bold"
                      style={{ marginRight: 8 }}
                    />
                    Reset
                  </>
                ) : (
                  <>
                    <PencilSimple weight="bold" style={{ marginRight: 8 }} />
                    Edit
                  </>
                )}
              </MenuItem>
              <MenuItem
                onClick={handleDelete}
                sx={{ color: COLORS.secondary.main }}
              >
                <X weight="bold" style={{ marginRight: 8 }} />
                Delete
              </MenuItem>
            </Menu>
          </Box>
        ) : (
          <Box sx={cardStyles.actionsContainer}>
            <Box sx={cardStyles.counterContainer}>
              <IconButton
                onClick={onDecrement}
                disabled={count === 0 || isDone}
                sx={cardStyles.actionButton}
              >
                <Minus weight="bold" />
              </IconButton>
              <Typography
                sx={{
                  flex: 1,
                  textAlign: "center",
                  color: COLORS.primary.contrast,
                  fontSize: { xs: "4vw", sm: "1rem" },
                  fontWeight: "700",
                  px: 1,
                }}
              >
                {isDone ? "Done" : `${count}/${target}`}
              </Typography>
              <IconButton
                onClick={onIncrement}
                disabled={isDone}
                sx={cardStyles.actionButton}
              >
                <Plus weight="bold" />
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
        )}
      </Box>
    );
  },
);

HabitCard.displayName = "HabitCard";

HabitCard.propTypes = {
  habit: PropTypes.shape({
    icon: PropTypes.elementType.isRequired,
    name: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    target: PropTypes.number.isRequired,
    isDone: PropTypes.bool.isRequired,
    reminderTime: PropTypes.string,
    reminderMessage: PropTypes.string,
    motivationalMessage: PropTypes.string.isRequired,
  }).isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
};

export default HabitCard;
