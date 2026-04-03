import { createTheme } from "@mui/material/styles";

export const appTheme = createTheme({
  palette: {
    primary: {
      main: "#d32f2f",
      dark: "#b71c1c",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#424242",
      dark: "#212121",
      contrastText: "#ffffff",
    },
    background: {
      default: "#eceff1",
      paper: "#ffffff",
    },
    text: {
      primary: "#212121",
      secondary: "#616161",
    },
  },
  typography: {
    fontFamily:
      '"Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif',
    h4: { fontWeight: 700 },
    h6: { fontWeight: 600 },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          border: "1px solid #e0e0e0",
          boxShadow: "none",
        },
      },
    },
  },
});
