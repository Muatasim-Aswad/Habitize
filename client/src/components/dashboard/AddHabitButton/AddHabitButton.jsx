import React from "react";
import { Fab } from "@mui/material";
import { Plus } from "phosphor-react";
import { useNavigate } from "react-router-dom";

const AddHabitButton = () => {
  const navigate = useNavigate();

  return (
    <Fab
      onClick={() => navigate("/app/add-habit")}
      sx={{
        position: "fixed",
        right: { xs: 16, sm: 24, md: 32 },
        bottom: {
          xs: 90, // Bottom navigation + spacing
          md: 32,
        },
        backgroundColor: "#4F8A8B",
        "&:hover": {
          backgroundColor: "#4F8A8B",
        },
      }}
    >
      <Plus size={24} color="#FFF" weight="bold" />
    </Fab>
  );
};

export default AddHabitButton;
