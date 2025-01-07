import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Typography, Dialog, IconButton } from "@mui/material";
import { CalendarBlank, CaretLeft, CaretRight } from "phosphor-react";
import { COLORS } from "../../../theme/constants";
import { formatDate, toDateString } from "../../../utils/dateUtils";
import Calendar from "./Calendar";

const DatePicker = ({ selectedDate, onDateChange, mockData }) => {
  const [open, setOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  const hasHabitsForDate = (date) => {
    if (!date || !mockData?.habits) return false;
    const dateStr = toDateString(date);
    return mockData.habits.some((habit) =>
      habit.history?.some((h) => h.date === dateStr && h.count > 0),
    );
  };

  return (
    <>
      <Box
        onClick={handleOpen}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          backgroundColor: "#4F8A8B15",
          borderRadius: "24px",
          padding: "8px 16px",
          height: "40px",
          cursor: "pointer",
        }}
      >
        <CalendarBlank size={20} color={COLORS.text.primary} />
        <Typography
          sx={{
            fontSize: "0.875rem",
            color: COLORS.text.primary,
          }}
        >
          {formatDate(selectedDate)}
        </Typography>
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            borderRadius: "16px",
            padding: "24px",
            width: "100%",
            maxWidth: "400px",
          },
        }}
      >
        <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between" }}>
          <IconButton onClick={handlePrevMonth}>
            <CaretLeft size={24} />
          </IconButton>
          <Typography>
            {currentMonth.toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </Typography>
          <IconButton onClick={handleNextMonth}>
            <CaretRight size={24} />
          </IconButton>
        </Box>

        <Calendar
          currentMonth={currentMonth}
          selectedDate={selectedDate}
          onDateSelect={(date) => {
            onDateChange(date);
            handleClose();
          }}
          hasHabitsForDate={hasHabitsForDate}
        />
      </Dialog>
    </>
  );
};

DatePicker.propTypes = {
  selectedDate: PropTypes.instanceOf(Date).isRequired,
  onDateChange: PropTypes.func.isRequired,
  mockData: PropTypes.object.isRequired,
};

export default DatePicker;
