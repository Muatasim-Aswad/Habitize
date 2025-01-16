import React from "react";
import * as MuiIcons from "@mui/icons-material";
import PropTypes from "prop-types";

const IconRenderer = ({ iconName, size = 24 }) => {
  const IconComponent = MuiIcons[iconName];

  if (!IconComponent) {
    return <span>Invalid Icon</span>; // Fallback for invalid icon names
  }

  return <IconComponent style={{ fontSize: size }} />;
};

IconRenderer.propTypes = {
  iconName: PropTypes.string,
  size: PropTypes.number,
};

export default IconRenderer;
