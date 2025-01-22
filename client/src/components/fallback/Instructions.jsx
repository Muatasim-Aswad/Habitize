import React from "react";
import { Box } from "@mui/material";
import { Add, Home, Timeline, LibraryAdd } from "@mui/icons-material";
import InstructionItem from "./InstructionItem";
import exampleHabits from "./exampleHabits";
import { habitService } from "../../services/api/habitService"; // Import habitService for API calls
import { useLocation, useNavigate } from "react-router-dom";

const Instructions = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleAddExampleHabits = async () => {
    try {
      await Promise.all(
        exampleHabits.map((habit) => habitService.createHabit(habit)),
      );

      if (location.pathname === "/app/dashboard") window.location.reload();
      else navigate("/app/dashboard");
    } catch (error) {
      alert("Failed to add example habits. Please try again.");
    }
  };

  const instructionItems = [
    {
      icon: <LibraryAdd />,
      buttonText: "Quick Start",
      onClick: handleAddExampleHabits,
      description: (() => {
        const startDay = new Date();
        return `
          Get started by adding some <strong>example habits</strong>! You can delete these habits anytime.<br />
          <ul style="padding-left: 1rem;">
            <li><strong>Meditate:</strong> Build mindfulness with a daily meditation session. 
                This habit runs from <strong>${startDay.toDateString()}</strong> for <strong>40 days</strong>.</li>
            <li><strong>Running:</strong> Improve your fitness by running 10 kilometers per week. 
                This habit runs from <strong>${startDay.toDateString()}</strong> for <strong>4 weeks</strong>.</li>
          </ul>
        `;
      })(),
    },
    {
      icon: <Add />,
      buttonText: "Add Habit",
      linkTo: "/app/add-habit",
      description:
        "To <strong>add a new habit</strong>, use the <strong>+</strong> button.",
    },
    {
      icon: <Home />,
      buttonText: "Dashboard",
      linkTo: "/app/dashboard",
      description: `
        In the Dashboard, you can: <br />
        <ul style="padding-left: 1rem;">
          <li><strong>Add, edit, or delete a habit.</strong></li>
          <li><strong>Record your progress</strong> for a specific day using the date selector.</li>
          <li>Filter habits by name to quickly find what you're looking for.</li>
        </ul>
      `,
    },
    {
      icon: <Timeline />,
      buttonText: "Progress",
      linkTo: "/app/progress",
      description: `
        On the Progress page, you can: <br />
        <ul style="padding-left: 1rem;">
          <li><strong>Track your habits' progress</strong> over time toward your end goal, and your commitment up to today.</li>
          <li><strong>Edit or delete a habit</strong> by clicking on it directly.</li>
          <li>You will find all your habits here. You can filter them to only view:
            <ul style="padding-left: 2rem;">
              <li>Habits that are currently in progress.</li>
              <li>Completed or older habits.</li>
            </ul>
          </li>
        </ul>
      `,
    },
  ];

  return (
    <Box p={3} pl={0}>
      {instructionItems.map((item, index) => (
        <InstructionItem
          key={index}
          icon={item.icon}
          buttonText={item.buttonText}
          linkTo={item.linkTo}
          onClick={item.onClick} // Pass the onClick handler if available
          description={item.description}
        />
      ))}
    </Box>
  );
};

export default Instructions;
