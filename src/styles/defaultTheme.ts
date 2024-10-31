import { createTheme } from "@mui/material";
import { styleColor } from "./styleColor";

export let theme = createTheme({
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
          background: `${styleColor.BLUE.main}`,
        },
      },
    },
  },
});
