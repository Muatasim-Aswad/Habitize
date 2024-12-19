import { createTheme } from "@mui/material";
import { COLORS, SPACING, TYPOGRAPHY, BREAKPOINTS } from "./constants";

const theme = createTheme({
  palette: {
    primary: COLORS.primary,
    background: COLORS.background,
    text: COLORS.text,
  },
  typography: {
    fontFamily: TYPOGRAPHY.fontFamily,
    h4: TYPOGRAPHY.h4,
  },
  spacing: (factor) => `${8 * factor}px`, // Material UI default spacing
  breakpoints: BREAKPOINTS,
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          border: `1px solid ${COLORS.border}`,
          backgroundColor: COLORS.background.paper,
          boxShadow: "none",
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: SPACING.xs * 4,
          height: SPACING.xs * 4,
        },
      },
    },
  },
});

export default theme;
