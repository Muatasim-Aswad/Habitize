import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Typography, Dialog, IconButton, Grid } from "@mui/material";
import { CalendarBlank, CaretLeft, CaretRight } from "phosphor-react";
import { COLORS } from "../../../theme/constants";

const DatePicker = ({ selectedDate, onDateChange }) => {
  const [open, setOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const formatDate = (date) => {
    const today = new Date();
    const isToday =
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();

    if (isToday) {
      return "Today";
    }

    return date.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    const days = [];
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1),
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1),
    );
  };

  const handleDateSelect = (date) => {
    onDateChange(date);
    handleClose();
  };

  const isSelectedDate = (date) => {
    if (!date) return false;
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  const isToday = (date) => {
    if (!date) return false;
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  return (
    <>
      <Box
        onClick={handleOpen}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          backgroundColor: "#4F8A8B15",
          borderRadius: "24px",
          padding: "8px 16px",
          height: "40px",
          cursor: "pointer",
        }}
      >
        <Typography
          sx={{
            color: COLORS.text.primary,
            fontSize: "0.875rem",
            padding: 0,
          }}
        >
          {formatDate(selectedDate)}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <CalendarBlank size={24} color={COLORS.text.primary} />
        </Box>
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            borderRadius: "16px",
            padding: "24px",
            maxWidth: "360px",
            width: "100%",
          },
        }}
      >
        {/* Calendar Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <IconButton onClick={handlePrevMonth}>
            <CaretLeft size={24} />
          </IconButton>
          <Typography
            sx={{
              fontSize: "1rem",
              fontWeight: "600",
              color: COLORS.text.primary,
            }}
          >
            {currentMonth.toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </Typography>
          <IconButton onClick={handleNextMonth}>
            <CaretRight size={24} />
          </IconButton>
        </Box>

        {/* Weekday Headers */}
        <Grid container spacing={1} sx={{ marginBottom: "8px" }}>
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <Grid item xs={12 / 7} key={day}>
              <Typography
                sx={{
                  textAlign: "center",
                  fontSize: "0.75rem",
                  color: COLORS.text.secondary,
                }}
              >
                {day}
              </Typography>
            </Grid>
          ))}
        </Grid>

        {/* Calendar Days */}
        <Grid container spacing={1}>
          {getDaysInMonth(currentMonth).map((date, index) => (
            <Grid item xs={12 / 7} key={index}>
              {date && (
                <Box
                  onClick={() => handleDateSelect(date)}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "36px",
                    cursor: "pointer",
                    borderRadius: "8px",
                    backgroundColor: isSelectedDate(date)
                      ? "#4F8A8B"
                      : isToday(date)
                        ? "#4F8A8B15"
                        : "transparent",
                    color: isSelectedDate(date) ? "#FFF" : COLORS.text.primary,
                    "&:hover": {
                      backgroundColor: isSelectedDate(date)
                        ? "#4F8A8B"
                        : "#4F8A8B30",
                    },
                  }}
                >
                  <Typography sx={{ fontSize: "0.875rem" }}>
                    {date.getDate()}
                  </Typography>
                </Box>
              )}
            </Grid>
          ))}
        </Grid>
      </Dialog>
    </>
  );
};

DatePicker.propTypes = {
  selectedDate: PropTypes.instanceOf(Date).isRequired,
  onDateChange: PropTypes.func.isRequired,
};

export default DatePicker;
