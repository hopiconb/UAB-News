import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#000000",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "red",
      contrastText: "#42fb80",
    },
    success: {
      main: "#00ffe7",
      contrastText: "#00ff00",
      dark: "#0160fb",
      light: "#5b87f1",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          textTransform: "none",
          fontSize: "0.8em",
        },
      },
    },
  },
});

export default theme;
