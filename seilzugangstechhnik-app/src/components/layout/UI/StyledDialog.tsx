import { Dialog, styled } from "@mui/material";

export const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    padding: theme.spacing(2),
    minWidth: "80%",
    maxWidth: "100%",
  },
  "& .MuiDialogContent-root": {
    display: "flex",
  },
  "& .MuiFormControl-root": {
    margin: theme.spacing(1),
  },
  "& .MuiDialogActions-root": {
    display: "flex",
  },
  "& .MuiInputLabel-root": {},
}));
