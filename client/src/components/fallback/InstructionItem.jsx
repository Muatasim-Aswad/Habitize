import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const InstructionItem = ({
  icon,
  buttonText,
  linkTo,
  description,
  onClick,
}) => (
  <Box
    display="flex"
    alignItems="center"
    gap={2}
    mb={3}
    flexWrap="wrap"
    sx={{ flexDirection: { xs: "column", sm: "row" } }}
  >
    <Button
      variant="contained"
      color="primary"
      startIcon={icon}
      component={onClick ? "button" : Link}
      to={onClick ? undefined : linkTo}
      onClick={onClick}
      sx={{ minWidth: 140 }}
    >
      {buttonText}
    </Button>
    <Typography
      variant="body1"
      pl={2}
      sx={{
        mt: { xs: 1, sm: 0 },
        textAlign: { xs: "center", sm: "left" },
      }}
    >
      <span dangerouslySetInnerHTML={{ __html: description }} />
    </Typography>
  </Box>
);

InstructionItem.propTypes = {
  icon: PropTypes.element.isRequired,
  buttonText: PropTypes.string.isRequired,
  linkTo: PropTypes.string, // Optional link for navigation
  description: PropTypes.string.isRequired,
  onClick: PropTypes.func, // Optional function to execute
};

InstructionItem.defaultProps = {
  linkTo: null,
  onClick: null,
};

export default InstructionItem;
