import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import logo from "../../../public/logo.png";
import { Outlet } from "react-router-dom";
import { Typography } from "@mui/material";

const BoxContainer = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "auto",
  padding: theme.spacing(2, 0),
}));

const ContentContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: theme.spacing(4),
  padding: theme.spacing(2),
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    gap: theme.spacing(6),
  },
}));

const ContentSection = styled(Stack)(({ theme }) => ({
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  maxWidth: "600px",
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));

const TypographyText = styled(Typography)(({ theme }) => ({
  fontSize: "20px",
  [theme.breakpoints.down("sm")]: {
    fontSize: "16px",
  },
  [theme.breakpoints.between("sm", "md")]: {
    fontSize: "18px",
  },
}));

const logoStyle = {
  maxWidth: "60%",
  height: "auto",
  marginBottom: "24px",
};

export default function LandingLayout() {
  return (
    <BoxContainer>
      <ContentContainer maxWidth="lg">
        <ContentSection>
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
        </ContentSection>
        <ContentSection>
          <Outlet />
        </ContentSection>
      </ContentContainer>
    </BoxContainer>
  );
}
