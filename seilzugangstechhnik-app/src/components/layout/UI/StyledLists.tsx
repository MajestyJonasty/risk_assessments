import { List, ListItem, styled } from "@mui/material";

export const StyledHorizontalList = styled(List)(({}) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  gap: "10px",
  padding: "10px",
  height: "fit-content",
}));

export const StyledHorizontalListItem = styled(ListItem)(({}) => ({
  display: "flex",
  flexDirection: "column",
  margin: "10px",
  justifyContent: "flex-start",
  alignItems: "center",
  cursor: "pointer",
}));

export const StyledVerticalList = styled(List)(({}) => ({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  padding: "10px",
  width: "100%",
}));

export const StyledVerticalListItem = styled(ListItem)(({ theme }) => ({
  display: "flex",
  border: "2px solid",
  borderColor: theme.palette.primary.main,
  width: "100%",
  padding: "12px 18px",
  justifyContent: "flex-start ",
  cursor: "pointer",
  "&:active": {
    backgroundColor: theme.palette.secondary.main,
  },
}));
