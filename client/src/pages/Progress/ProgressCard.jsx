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
  return (
    <Grid item xs={6} md={4} key={habit._id}>
      <Card
        sx={{
          backgroundColor: "#FFC29780",
          borderRadius: "0.75rem",
          padding: "0.5rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          aspectRatio: "1 / 1",
          mx: "auto",
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
            width: "100%",
            height: "100%",
            padding: "0.5rem !important",
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: isMobile ? "4rem" : "6.875rem",
              height: isMobile ? "4rem" : "6.875rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "0.5rem",
            }}
          >
            <CircularProgress
              variant="determinate"
              value={habit.progress}
              size={isMobile ? "4rem" : "6.875rem"}
              thickness={3}
              sx={{ position: "absolute" }}
            />
            <CircularProgress
              variant="determinate"
              value={habit.commitment}
              size={isMobile ? "2.5rem" : "4.375rem"}
              thickness={4}
              sx={{ position: "absolute" }}
            />
            <IconRenderer
              iconName={habit.icon}
              size={isMobile ? "1.5625rem" : "2.5rem"}
            />
          </Box>
          <Box
            sx={{
              textAlign: "center",
              width: "100%",
            }}
          >
            <Typography
              variant={isMobile ? "body1" : "h6"}
              sx={{
                marginBottom: "0.25rem",
                fontSize: isMobile ? "0.875rem" : "1.25rem",
                fontWeight: "medium",
              }}
            >
              {habit.name}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                marginBottom: "0.25rem",
                fontSize: isMobile ? "0.75rem" : "0.875rem",
              }}
            >
              Commitment: {habit.commitment}%
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: isMobile ? "0.75rem" : "0.875rem",
              }}
            >
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
