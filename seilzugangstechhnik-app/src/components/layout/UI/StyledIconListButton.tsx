import { IconButton, styled } from "@mui/material";

export const StyledIconListButton = styled(IconButton)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  minWidth: "120px",
  maxWidth: "120px",
  borderRadius: "2px",
  border: "2px solid",
  borderColor: theme.palette.primary.main,
  disableFocusRipple: true,
  transition: "background-color 0.2s ease, transform 0.3s ease",
  "&:active": {
    backgroundColor: theme.palette.secondary.main,
    transform: "scale(0.8)",
  },
}));
