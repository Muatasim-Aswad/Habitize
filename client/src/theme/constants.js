export const COLORS = {
  primary: {
    main: "#666666", // Color used in form headings
    light: "#808080",
    dark: "#404040",
  },
  background: {
    default: "#FFF5E6", // Main background color
    paper: "#FFF5E6", // Form container background color
  },
  border: "#E0E0E0", // Form container border color
  text: {
    primary: "#666666",
    secondary: "rgba(0, 0, 0, 0.6)",
  },
};

export const SPACING = {
  xs: 1, // 8px
  sm: 2, // 16px
  md: 3, // 24px
  lg: 4, // 32px
};

export const TYPOGRAPHY = {
  fontFamily: "'Nunito', sans-serif",
  h4: {
    fontSize: "clamp(2rem, 10vw, 2.15rem)",
    fontWeight: "bold",
  },
};

export const BREAKPOINTS = {
  values: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
  },
};
