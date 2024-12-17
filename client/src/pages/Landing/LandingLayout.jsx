import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import logo from "../../../public/logo.png";
import { Outlet } from "react-router-dom";
import { Typography } from "@mui/material";

const BoxContainer = styled(Box)(() => ({
  flexGrow: 1,
  height: "100vh",
  padding: "3rem", //this is for deducting the padding of the
}));

const GridContainer = styled(Grid)(() => ({
  height: "100%", // Full height for the grid container
  display: "flex",
  alignItems: "center", // Center content vertically
  justifyContent: "center", // Center content horizontally}
  textAlign: "center",
}));

const TypographyText = styled(Typography)(({ theme }) => ({
  fontSize: "20px",
  [theme.breakpoints.down("sm")]: {
    fontSize: "16px",
  },
}));

const logoStyle = {
  maxWidth: "60%",
  height: "auto",
  paddingBottom: "3vh",
};

export default function LandingLayout() {
  return (
    <BoxContainer>
      <GridContainer container spacing={2} columns={{ xs: 1, sm: 2 }}>
        <Grid size={1}>
          <img src={logo} alt="logo" loading="lazy" style={logoStyle} />
          <TypographyText variant="body1">
            Grow Your Habits Like Trees.
            <br />
            Plant the seeds of your goals and nurture them into lasting habits.
            <br />
            With Habitize, every small step helps your habits take root and
            thrive.
            <br />
            <strong>Login</strong> and keep growing today!
          </TypographyText>
        </Grid>
        <Grid size={1}>
          <Outlet /> {/* Child routes will be rendered here */}
        </Grid>
      </GridContainer>
    </BoxContainer>
  );
}
