import { createTheme } from "@mui/material";
import { styleColor } from "./styleColor";

export let theme = createTheme({
  palette: {
    primary: {
      main: `${styleColor.BLUE.main}`,
      dark : `${styleColor.BLUE[100]}`
    },
    secondary: {
      main: `${styleColor.YELLOW.main}`,
      dark: `${styleColor.YELLOW[0]}`
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained",
        size: "medium",
        color: "primary",
      },
      styleOverrides: {
        root: {
          padding: "5px 30px",
          color: `${styleColor.WHITE}`,
        },
      },
    },
  },
});
