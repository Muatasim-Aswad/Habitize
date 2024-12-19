import React from "react";
import PropTypes from "prop-types";
import { Stack, Card, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const FormWrapper = styled(Stack)(({ theme }) => ({
  minHeight: "100vh",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
}));

const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: theme.spacing(2),
  boxShadow: "none",
  border: "1px solid #E0E0E0",
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
            color: "#666666",
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
