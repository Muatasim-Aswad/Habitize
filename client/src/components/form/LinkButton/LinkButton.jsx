import React from "react";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@mui/material";

const LinkButton = ({ to, href, children }) => {
  const commonStyles = {
    color: "#0D102E",
    fontWeight: "bold",
    fontSize: "17px",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
      color: "#0D102E",
    },
  };

  if (to) {
    return (
      <Link component={RouterLink} to={to} sx={commonStyles}>
        {children}
      </Link>
    );
  }

  return (
    <Link href={href} sx={commonStyles}>
      {children}
    </Link>
  );
};

LinkButton.propTypes = {
  to: PropTypes.string,
  href: PropTypes.string,
  children: PropTypes.node.isRequired,
};

LinkButton.defaultProps = {
  to: undefined,
  href: undefined,
};

export default LinkButton;
