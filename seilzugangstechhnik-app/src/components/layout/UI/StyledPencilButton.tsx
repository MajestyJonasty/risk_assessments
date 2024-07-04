import { IconButton, styled } from "@mui/material";

export const StyledPencilButton = styled(IconButton)(({ theme }) => ({
  padding: "12px",
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.primary.main,
  "&:hover": {
    backgroundColor: theme.palette.secondary.dark,
  },
}));
