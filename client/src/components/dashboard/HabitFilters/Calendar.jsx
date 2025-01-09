import React from "react";
import PropTypes from "prop-types";
import { Grid, Typography, Box } from "@mui/material";
import { getDaysInMonth, isSameDay } from "../../../utils/dateUtils";
import { COLORS } from "../../../theme/constants";

const Calendar = ({
  currentMonth,
  selectedDate,
  onDateSelect,
  hasHabitsForDate,
}) => {
  const days = getDaysInMonth(currentMonth);
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <>
      <Grid container spacing={1} sx={{ mb: 2 }}>
        {weekDays.map((day) => (
          <Grid item xs={12 / 7} key={day}>
            <Typography
              align="center"
              sx={{
                color: COLORS.text.secondary,
                fontSize: "0.75rem",
              }}
            >
              {day}
            </Typography>
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={1}>
        {days.map((day, index) => (
          <Grid item xs={12 / 7} key={index}>
            {day && (
              <Box
                sx={{
                  position: "relative",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Typography
                  align="center"
                  sx={{
                    cursor: "pointer",
                    padding: "8px",
                    borderRadius: "50%",
                    backgroundColor: isSameDay(day, selectedDate)
                      ? COLORS.primary.main
                      : "transparent",
                    color: isSameDay(day, selectedDate)
                      ? "#fff"
                      : COLORS.text.primary,
                    "&:hover": {
                      backgroundColor: isSameDay(day, selectedDate)
                        ? COLORS.primary.main
                        : COLORS.primary.light,
                    },
                  }}
                  onClick={() => onDateSelect(day)}
                >
                  {day.getDate()}
                </Typography>
                {hasHabitsForDate && hasHabitsForDate(day) && (
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: "2px",
                      width: "4px",
                      height: "4px",
                      borderRadius: "50%",
                      backgroundColor: COLORS.primary.main,
                    }}
                  />
                )}
              </Box>
            )}
          </Grid>
        ))}
      </Grid>
    </>
  );
};

Calendar.propTypes = {
  currentMonth: PropTypes.instanceOf(Date).isRequired,
  selectedDate: PropTypes.instanceOf(Date).isRequired,
  onDateSelect: PropTypes.func.isRequired,
  hasHabitsForDate: PropTypes.func,
};

export default Calendar;
