import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0798acff", // teal
    },
    secondary: {
      main: "#3bdd43ff", // purple
    },
    background: {
      default: "#fcfcfcff",
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
    h2: {
      fontWeight: 700,
    },
  },
});

export default theme;
