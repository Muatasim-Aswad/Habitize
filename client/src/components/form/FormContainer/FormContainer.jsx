import React from "react";
import PropTypes from "prop-types";
import { Stack, Card, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { SPACING } from "../../../theme/constants";

const FormWrapper = styled(Stack)(({ theme }) => ({
  minHeight: "100vh",
  padding: theme.spacing(SPACING.sm),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(SPACING.md),
  },
}));

const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(SPACING.md),
  gap: theme.spacing(SPACING.sm),
  margin: theme.spacing(SPACING.sm),
  boxShadow: "none",
  backgroundColor: "#FFF5E6",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
}));

const FormContainer = ({ children, title, description }) => {
  return (
    <FormWrapper>
      <StyledCard>
        <Typography
          component="h1"
          variant="h4"
          sx={{
            width: "100%",
            fontSize: "clamp(2rem, 10vw, 2.15rem)",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {title}
        </Typography>
        {description && (
          <Typography variant="body1" sx={{ color: "text.secondary", mb: 2 }}>
            {description}
          </Typography>
        )}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {children}
        </Box>
      </StyledCard>
    </FormWrapper>
  );
};

FormContainer.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
};

FormContainer.defaultProps = {
  description: "",
};

export default FormContainer;
