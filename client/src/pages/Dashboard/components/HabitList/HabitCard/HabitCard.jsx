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
import { PencilSimple, X, Plus, Minus } from "phosphor-react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { COLORS } from "../../../../../theme/constants";

const cardStyles = {
  container: {
    display: "flex",
    alignItems: "center",
    backgroundColor: COLORS.background.card,
    borderRadius: { xs: "4vw", md: "16px" },
    padding: { xs: "2vh 4vw", md: "16px 24px" },
    gap: { xs: "1vh", md: "16px" },
    width: "100%",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
    flexDirection: { xs: "column", md: "row" },
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
    alignItems: { xs: "flex-start", md: "center" },
    flex: { xs: "unset", md: "0 0 auto" },
    gap: { xs: "3vw", md: "16px" },
    width: { xs: "100%", md: "auto" },
  },
  textContainer: {
    flex: { xs: 1, md: "unset" },
    overflow: "hidden",
    width: "100%",
    paddingRight: { xs: "80px", md: 0 },
  },
  reminderContainer: {
    display: { xs: "flex", md: "flex" },
    alignItems: "center",
    gap: { xs: "2vw", md: "8px" },
    color: "#4A3B28",
    fontSize: { xs: "3.5vw", md: "0.75rem" },
    marginTop: { xs: "0.5vh", md: 0 },
    flex: { xs: "unset", md: 1 },
    justifyContent: { xs: "flex-start", md: "center" },
    marginLeft: { xs: 0, md: "24px" },
    marginRight: { xs: 0, md: "24px" },
    fontWeight: "900",
    lineHeight: { xs: 1.2, md: 1.5 },
    minWidth: { md: "200px" },
    maxWidth: "100%",
    overflow: "hidden",
    "& span": {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
  },
  spacer: {
    flex: { xs: "unset", md: 1 },
    minWidth: { md: "200px" },
  },
  actionsContainer: {
    display: "flex",
    alignItems: "center",
    width: { xs: "100%", md: "auto" },
    justifyContent: { xs: "space-between", md: "flex-end" },
    gap: { xs: "3vw", md: "12px" },
    marginLeft: { md: "auto" },
  },
  habitName: {
    fontSize: { xs: "0.875rem", md: "1.25rem" },
    color: COLORS.text.primary,
    fontWeight: "700",
    textTransform: "uppercase",
    marginBottom: { xs: "0.5vh", md: "4px" },
    lineHeight: { xs: 1.2, md: 1.5 },
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  streakText: {
    fontSize: { xs: "0.75rem", md: "0.875rem" },
    fontWeight: "600",
    lineHeight: { xs: 1.2, md: 1.5 },
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  counterContainer: {
    display: "flex",
    alignItems: "center",
    backgroundColor: COLORS.primary.main,
    borderRadius: { xs: "3vw", md: "24px" },
    flex: { xs: 1, md: "0 0 auto" },
    minWidth: { xs: "auto", md: "120px" },
    height: { xs: "11vw", md: "40px" },
    maxHeight: { xs: "50px", md: "40px" },
  },
  actionButton: {
    width: { xs: "11vw", md: "40px" },
    height: { xs: "11vw", md: "40px" },
    maxWidth: { xs: "50px", md: "40px" },
    maxHeight: { xs: "50px", md: "40px" },
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
    width: { xs: "11vw", md: "40px" },
    height: { xs: "11vw", md: "40px" },
    maxWidth: { xs: "50px", md: "40px" },
    maxHeight: { xs: "50px", md: "40px" },
    color: COLORS.text.primary,
    "&:hover": {
      backgroundColor: "transparent",
    },
    "& .dots": {
      display: "flex",
      flexDirection: "column",
      gap: "4px",
      alignItems: "center",
      "& .dot": {
        width: "4px",
        height: "4px",
        backgroundColor: "currentColor",
        borderRadius: "50%",
      },
    },
  },
};

const HabitCard = memo(
  ({ habit, onIncrement, onDecrement, onEdit, onDelete }) => {
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
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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

    return (
      <Box sx={cardStyles.container}>
        <Box sx={cardStyles.infoContainer}>
          <HabitIcon size={isMobile ? 25 : 40} color={COLORS.text.primary} />
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
            <AccessTimeIcon sx={{ fontSize: { xs: "3.5vw", md: "1rem" } }} />
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
              <MenuItem key="progress" sx={{ color: COLORS.text.secondary }}>
                Progress: {count}/{target}
              </MenuItem>
              <MenuItem
                key="decrease"
                onClick={onDecrement}
                disabled={count === 0}
              >
                <Minus weight="bold" style={{ marginRight: 8 }} />
                Decrease
              </MenuItem>
              <MenuItem onClick={handleEdit}>
                <PencilSimple weight="bold" style={{ marginRight: 8 }} />
                Edit
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
                disabled={count === 0}
                sx={cardStyles.actionButton}
              >
                <Minus weight="bold" />
              </IconButton>
              <Typography
                sx={{
                  flex: 1,
                  textAlign: "center",
                  color: COLORS.primary.contrast,
                  fontSize: { xs: "4vw", md: "1rem" },
                  fontWeight: "700",
                  px: 1,
                }}
              >
                {`${count}/${target}${isDone ? " Done" : ""}`}
              </Typography>
              <IconButton onClick={onIncrement} sx={cardStyles.actionButton}>
                <Plus weight="bold" />
              </IconButton>
            </Box>
            <Box sx={{ display: "flex", gap: "8px" }}>
              <IconButton onClick={onEdit} sx={cardStyles.editButton}>
                <PencilSimple size={20} />
              </IconButton>
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
};

export default HabitCard;
