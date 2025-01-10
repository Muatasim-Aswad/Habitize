/* eslint-disable react/prop-types */
import React from "react";
import { IconButton, Grid } from "@mui/material";
import {
  EmojiPeople,
  Alarm,
  FitnessCenter,
  SportsBaseball,
  Home,
  LocalGroceryStore,
  OutdoorGrill,
  HealthAndSafety,
  SelfImprovement,
  Spa,
  Fastfood,
  ChildCare,
  AccessAlarm,
  Bed,
  Book,
  Brush,
  DirectionsRun,
  Yard,
  Mood,
  ThumbUp,
  Work,
} from "@mui/icons-material";

const icons = [
  { component: EmojiPeople, key: "EmojiPeople" },
  { component: Alarm, key: "Alarm" },
  { component: FitnessCenter, key: "FitnessCenter" },
  { component: SportsBaseball, key: "SportsBaseball" },
  { component: Home, key: "Home" },
  { component: LocalGroceryStore, key: "LocalGroceryStore" },
  { component: OutdoorGrill, key: "OutdoorGrill" },
  { component: HealthAndSafety, key: "HealthAndSafety" },
  { component: SelfImprovement, key: "SelfImprovement" },
  { component: Spa, key: "Spa" },
  { component: Fastfood, key: "Fastfood" },
  { component: ChildCare, key: "ChildCare" },
  { component: AccessAlarm, key: "AccessAlarm" },
  { component: Bed, key: "Bed" },
  { component: Book, key: "Book" },
  { component: Brush, key: "Brush" },
  { component: DirectionsRun, key: "DirectionsRun" },
  { component: Yard, key: "Yard" },
  { component: Mood, key: "Mood" },
  { component: ThumbUp, key: "ThumbUp" },
  { component: Work, key: "Work" },
];

const IconButtonComponent = ({ handleIconSelect }) => {
  return (
    <Grid container spacing={2}>
      {icons.map(({ component: Icon, key }) => (
        <Grid item key={key}>
          <IconButton onClick={() => handleIconSelect(Icon)}>
            <Icon sx={{ fontSize: 40 }} />
          </IconButton>
        </Grid>
      ))}
    </Grid>
  );
};

export default IconButtonComponent;
