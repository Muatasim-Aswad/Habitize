import React from "react";
import PropTypes from "prop-types";
import { Stack, Card, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { SPACING } from "../../../theme/constants";

const FormWrapper = styled(Stack)(({ theme }) => ({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(SPACING.sm),
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(SPACING.xs),
  },
  [theme.breakpoints.between("sm", "md")]: {
    padding: theme.spacing(SPACING.sm),
  },
}));

const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  maxWidth: "450px",
  padding: theme.spacing(SPACING.md),
  gap: theme.spacing(SPACING.sm),
  margin: 0,
  backgroundColor: "#FFF5E6",
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
  borderRadius: "12px",
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(SPACING.sm),
    width: "100%",
  },
  [theme.breakpoints.between("sm", "md")]: {
    padding: theme.spacing(SPACING.sm),
    width: "100%",
    maxWidth: "400px",
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
