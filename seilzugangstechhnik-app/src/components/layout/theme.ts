import { createTheme } from "@mui/material";

const colors = {
  primary: "#444441",
  secondary: "#A4B5BE",
  background: "#F0F0F0",
};

export const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: colors.secondary,
    },
    background: {
      default: colors.background,
    },
  },
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
    h1: {
      fontSize: "2rem",
      margin: "1rem",
    },
    h2: {
      fontSize: "1.5rem",
    },
    h3: {
      fontSize: "1.25rem",
    },
    h4: {
      fontSize: "1rem",
    },
    body2: {
      fontSize: "0.75rem",
      opacity: 0.6,
    },
    subtitle1: {
      fontSize: "1rem",
    },
    subtitle2: {
      fontWeight: 600,
      fontSize: "0.675rem",
      textAlign: "center",
    },
  },
  components: {
    MuiAvatar: {
      styleOverrides: {
        root: {
          width: "50px",
          height: "50px",
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          display: "flex",
          padding: "12px 0px",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          width: "100%",
        },
      },
    },

    MuiCardHeader: {
      styleOverrides: {
        root: {
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "10px",
          padding: "10px",
        },
      },
    },

    MuiList: {
      styleOverrides: {
        root: {
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          padding: 0,
          margin: 0,
          borderColor: colors.secondary,
          overflow: "auto",
        },
      },
    },

    MuiListItem: {
      styleOverrides: {
        root: {
          margin: 0,
          padding: 0,
        },
      },
    },

    MuiIconButton: {
      styleOverrides: {
        root: {
          width: "50px",
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          alignItems: "center",
          justifyContent: "center",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          display: "flex",
          padding: "8px 18px",
          alignItems: "center",
          gap: "10px",
          backgroundColor: colors.primary,
          color: colors.background,
          ":active": {
            backgroundColor: colors.secondary,
          },
          ":hover": {
            backgroundColor: colors.secondary,
          },
          ":disabled": {
            backgroundColor: colors.background,
          },
        },
      },
    },
  },
});
