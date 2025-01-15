import React, { useState } from "react";
import { TextField, Box, IconButton } from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import { FixedSizeGrid as Grid } from "react-window";
import PropTypes from "prop-types";

const IconSelector = ({ onIconSelect }) => {
  const [filter, setFilter] = useState("");

  // Get all available MUI icons
  const iconNames = Object.keys(MuiIcons);

  // Filter icons based on user input
  const filteredIcons = iconNames.filter((iconName) =>
    iconName.toLowerCase().includes(filter.toLowerCase()),
  );

  // Grid dimensions
  const COLUMN_COUNT = 4;
  const ITEM_SIZE = 80; // Height and width of each cell

  // Virtualized grid cell renderer
  const Cell = ({ columnIndex, rowIndex, style }) => {
    const index = rowIndex * COLUMN_COUNT + columnIndex;
    if (index >= filteredIcons.length) return null;

    const iconName = filteredIcons[index];
    const IconComponent = MuiIcons[iconName];

    return (
      <div style={style}>
        <IconButton
          onClick={() => onIconSelect(iconName)}
          aria-label={iconName}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <IconComponent />
        </IconButton>
      </div>
    );
  };

  Cell.propTypes = {
    columnIndex: PropTypes.number.isRequired,
    rowIndex: PropTypes.number.isRequired,
    style: PropTypes.object.isRequired,
  };

  return (
    <Box>
      <TextField
        label="Search Icons"
        variant="outlined"
        fullWidth
        margin="normal"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <Grid
        columnCount={COLUMN_COUNT}
        columnWidth={ITEM_SIZE}
        height={400} // Visible grid height (scrollable area)
        rowCount={Math.ceil(filteredIcons.length / COLUMN_COUNT)}
        rowHeight={ITEM_SIZE}
        width={COLUMN_COUNT * ITEM_SIZE} // Total grid width
      >
        {Cell}
      </Grid>
    </Box>
  );
};

IconSelector.propTypes = {
  onIconSelect: PropTypes.func.isRequired,
};

export default IconSelector;
