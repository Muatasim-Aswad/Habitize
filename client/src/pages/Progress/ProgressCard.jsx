import React from "react";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Box,
} from "@mui/material";
import PropTypes from "prop-types";
import IconRenderer from "../../components/IconRenderer";

const ProgressCard = ({ habit, isMobile, handleClick }) => {
  if (habit.progress > 100) habit.progress = 100;
  if (habit.commitment > 100) habit.commitment = 100;

  return (
    <Grid item xs={6} sm={6} md={4} key={habit._id}>
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
          mx: "0",
          overflow: "hidden",
        }}
      >
        <CardContent
          onClick={() => handleClick(habit._id)}
          sx={{
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Centering the circles and icon */}
          <Box
            sx={{
              position: "relative",
              width: isMobile ? 90 : 110, // Adjust based on size
              height: isMobile ? 90 : 110, // Adjust based on size
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Outer circle */}
            <CircularProgress
              variant="determinate"
              value={habit.progress}
              size={isMobile ? 90 : 110}
              thickness={3}
              sx={{ position: "absolute" }}
            />
            {/* Inner circle */}
            <CircularProgress
              variant="determinate"
              value={habit.commitment}
              size={isMobile ? 50 : 70}
              thickness={4}
              sx={{ position: "absolute" }}
            />
            {/* Icon */}

            <IconRenderer iconName={habit.icon} size={isMobile ? 30 : 40} />
          </Box>
          {/* Text content */}
          <Box sx={{ textAlign: "center", marginTop: 2 }}>
            <Typography
              variant={isMobile ? "body1" : "h6"}
              style={{ marginTop: "10px" }}
            >
              {habit.name}
            </Typography>
            <Typography variant={isMobile ? "body2" : "body1"}>
              Commitment: {habit.commitment}%
            </Typography>
            <Typography variant={isMobile ? "body2" : "body1"}>
              Progress: {habit.progress}%
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

ProgressCard.propTypes = {
  habit: PropTypes.object.isRequired,
  isMobile: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default ProgressCard;
