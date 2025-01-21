import React from "react";
import { Box } from "@mui/material";
import { Add, Home, Timeline, LibraryAdd } from "@mui/icons-material";
import InstructionItem from "./InstructionItem";
import exampleHabits from "./exampleHabits";
import { habitService } from "../../services/api/habitService"; // Import habitService for API calls
import { useNavigate } from "react-router-dom";

const Instructions = () => {
  const navigate = useNavigate();

  const handleAddExampleHabits = async () => {
    try {
      await Promise.all(
        exampleHabits.map((habit) => habitService.createHabit(habit)),
      );
      window.location.reload();
    } catch (error) {
      alert("Failed to add example habits. Please try again.");
    }
  };

  const instructionItems = [
    {
      icon: <Add />,
      buttonText: "Add Habit",
      linkTo: "/app/add-habit",
      description: "To <strong>create a new habit</strong>, use this button.",
    },
    {
      icon: <Home />,
      buttonText: "Dashboard",
      linkTo: "/app/dashboard",
      description: `Once a habit is created, you can <strong>record your progress</strong> in the dashboard page. <br />
      You can also <strong>delete</strong> or <strong>edit</strong> your habits here. <br />
      Using the date selector, you can record your progress on different days.`,
    },
    {
      icon: <Timeline />,
      buttonText: "Progress",
      linkTo: "/app/progress",
      description: `You can <strong>track your progress</strong> over time in the progress page. <br />
      There you can see all your habits and <strong>edit</strong> them as well.`,
    },
    {
      icon: <LibraryAdd />, // Changed icon to match the "Add" action
      buttonText: "Quick Start", // Shortened the button text
      onClick: handleAddExampleHabits,
      description: `
      Get started by adding some <strong>example habits</strong>! You can delete these habits anytime.<br />
      <ul>
        <li><strong>Meditate:</strong> Build mindfulness with a daily meditation session. 
            This habit runs from <strong>January 1, 2025</strong> to <strong>December 31, 2025</strong>.</li>
        <li><strong>Strength Training:</strong> Improve your fitness with two sessions per week. 
            This habit runs from <strong>January 1, 2025</strong> to <strong>June 30, 2025</strong>.</li>
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
