import React, { useState, useEffect } from "react";
import {
  Grid,
  Button,
  Menu,
  MenuItem,
  Typography,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import TimelineIcon from "@mui/icons-material/Timeline";
import ProgressCard from "./ProgressCard";
import { userService } from "../../services/api/userService";
import { useLocation, useNavigate } from "react-router-dom";
import Instructions from "../../components/fallback/Instructions";

const Progress = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [habits, setHabits] = useState([]);
  const [filteredHabits, setFilteredHabits] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    const fetchHabits = async () => {
      const habits = await userService.getHabitsProgress();
      setHabits(habits.habits);
    };

    fetchHabits();
  }, []);

  //change the habits based on the selected filter, default is All. habit has a period.end date in this format 2025-06-30T23:59:59.999Z, so we can compare it to new Date() to see if it is in the past
  useEffect(() => {
    if (selectedFilter === "All") {
      setFilteredHabits(habits);
    } else if (selectedFilter === "In Progress") {
      setFilteredHabits(
        habits.filter((habit) => new Date(habit.period.end) > new Date()),
      );
    } else if (selectedFilter === "Past Habits") {
      setFilteredHabits(
        habits.filter((habit) => new Date(habit.period.end) < new Date()),
      );
    }
  }, [selectedFilter, habits]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (filter) => {
    setAnchorEl(null);
    if (filter) setSelectedFilter(filter);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        padding: isMobile ? 2 : 4,
        backgroundColor: "#FFF5EB",
        minHeight: "100vh",
        justifyContent: "flex-start",
        mt: 5,
      }}
    >
      <Typography
        variant={isMobile ? "h5" : "h4"}
        sx={{
          mb: 4,
          color: "#4F8A8B",
          display: "flex",
          alignItems: "center",
        }}
      >
        <TimelineIcon
          sx={{ fontSize: isMobile ? 35 : 50, mr: 2, color: "#4F8A8B", mt: 1 }}
        />
        Progress
      </Typography>

      <Button variant="contained" onClick={handleClick}>
        {selectedFilter}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleClose(null)}
      >
        <MenuItem onClick={() => handleClose("All")}>All</MenuItem>
        <MenuItem onClick={() => handleClose("In Progress")}>
          In Progress
        </MenuItem>
        <MenuItem onClick={() => handleClose("Past Habits")}>
          Past Habits
        </MenuItem>
      </Menu>

      {habits.length === 0 && <Instructions />}
      <Grid container spacing={2} style={{ marginTop: "20px" }}>
        {filteredHabits.map((habit) => (
          <ProgressCard
            key={habit._id}
            habit={habit}
            isMobile={isMobile}
            style={{ cursor: "pointer" }}
            handleClick={(habitId) => {
              navigate(`/app/edit-habit/${habitId}`, {
                state: { from: location.pathname },
              });
            }}
          />
        ))}
      </Grid>
    </Box>
  );
};

export default Progress;
