import React, { useState, useEffect } from "react";
import {
  Grid,
  Button,
  Menu,
  MenuItem,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { DirectionsRun } from "@mui/icons-material";
import TimelineIcon from "@mui/icons-material/Timeline";

const Progress = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [habits, setHabits] = useState([
    { id: 1, name: "Push ups", progress: 40, date: "2025-01-10" },
    { id: 2, name: "Exercise", progress: 75, date: "2025-01-08" },
    { id: 3, name: "Read a Book", progress: 60, date: "2025-01-05" },
  ]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    const fetchHabits = async () => {
      const data = [
        { id: 1, name: "Push ups", progress: 40, date: "2025-01-10" },
        { id: 2, name: "Exercise", progress: 75, date: "2025-01-08" },
        { id: 3, name: "Read a Book", progress: 60, date: "2025-01-05" },
      ];

      const today = new Date();
      let filteredData = data;

      if (selectedFilter === "Today") {
        filteredData = data.filter(
          (habit) =>
            new Date(habit.date).toDateString() === today.toDateString(),
        );
      } else if (selectedFilter === "This Week") {
        const startOfWeek = new Date();
        startOfWeek.setDate(today.getDate() - today.getDay());
        filteredData = data.filter(
          (habit) =>
            new Date(habit.date) >= startOfWeek &&
            new Date(habit.date) <= today,
        );
      } else if (selectedFilter === "This Month") {
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        filteredData = data.filter(
          (habit) =>
            new Date(habit.date) >= startOfMonth &&
            new Date(habit.date) <= today,
        );
      }

      setHabits(filteredData);
    };

    fetchHabits();
  }, [selectedFilter]);

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
        <MenuItem onClick={() => handleClose("Today")}>Today</MenuItem>
        <MenuItem onClick={() => handleClose("This Week")}>This Week</MenuItem>
        <MenuItem onClick={() => handleClose("This Month")}>
          This Month
        </MenuItem>
      </Menu>

      <Grid container spacing={2} style={{ marginTop: "20px" }}>
        {habits.map((habit) => (
          <Grid item xs={6} sm={6} md={4} key={habit.id}>
            <Card
              sx={{
                backgroundColor: "#FFC29780",
                borderRadius: "12px",
                padding: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: isMobile ? "100%" : "80%",
                aspectRatio: "1 / 1",
                mx: "auto",
                overflow: "hidden",
              }}
            >
              <CardContent>
                <Box position="relative" display="inline-flex">
                  <CircularProgress
                    variant="determinate"
                    value={habit.progress}
                    size={isMobile ? 70 : 90}
                  />
                  <Box
                    top={0}
                    left={0}
                    bottom={0}
                    right={0}
                    position="absolute"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <DirectionsRun style={{ fontSize: isMobile ? 20 : 30 }} />
                  </Box>
                </Box>
                <Typography
                  variant={isMobile ? "body1" : "h6"}
                  style={{ marginTop: "10px" }}
                >
                  {habit.name}
                </Typography>
                <Typography variant={isMobile ? "body2" : "body1"}>
                  {habit.progress}%
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Progress;
