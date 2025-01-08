export const COLORS = {
  primary: {
    main: "#4F8A8B",
    light: "#4F8A8B15",
    contrast: "#FFFFFF",
  },
  secondary: {
    main: "#B87264",
    dark: "#A65D4F",
  },
  background: {
    default: "#FFF5E6",
    paper: "#FFFFFF",
    nav: "#FFC297",
    card: "#FFC29750",
  },
  text: {
    primary: "#000000",
    secondary: "rgba(0, 0, 0, 0.5)",
  },
};

export const SPACING = {
  xs: 1,
  sm: 2,
  md: 3,
  lg: 4,
  xl: 5,
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
