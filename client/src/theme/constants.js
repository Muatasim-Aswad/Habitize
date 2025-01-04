export const COLORS = {
  primary: {
    main: "#4F8A8B", // Action, Accent
    light: "#4F8A8B15", // input fields
    contrast: "#FFFFFF", // Contrast for primary
  },
  background: {
    default: "#FFF5E6", // background
    paper: "#FFFFFF",
    nav: "#FFC297", // nav bar
    card: "#FFC29750", // cards with 50% opacity
  },
  text: {
    primary: "#000000",
    secondary: "rgba(0, 0, 0, 0.5)", // 50% opacity for placeholders
  },
};

export const SPACING = {
  xs: 1, // 8px
  sm: 2, // 16px
  md: 3, // 24px
  lg: 4, // 32px
  xl: 5, // 40px
};

export const TYPOGRAPHY = {
  fontFamily: "'Nunito', sans-serif",
  h4: {
    fontSize: "2rem",
    fontWeight: "bold",
  },
  body1: {
    fontSize: "1rem",
    lineHeight: 1.5,
  },
  body2: {
    fontSize: "0.875rem",
    lineHeight: 1.43,
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

export const DASHBOARD = {
  card: {
    borderRadius: "12px",
    padding: SPACING.sm,
  },
  filters: {
    borderRadius: "24px",
    padding: {
      x: SPACING.xs,
      y: SPACING.xs,
    },
  },
  icon: {
    size: {
      small: 20,
      medium: 24,
      large: 32,
    },
  },
  nav: {
    width: "80px",
  },
};
