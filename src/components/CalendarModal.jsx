import MyCalendar from "./MyCalendar";
import * as React from "react";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import { useState, useEffect } from "react";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function CalendarModal({
  propsdeadline,
  isOpen,
  onClose,
  onDeadlineChange,
}) {
  const [deadline, setDeadline] = useState(propsdeadline);
  const [open, setOpen] = useState(isOpen);

  const handleClose = () => {
    console.log("Closing modal");
    setOpen(false);
    onClose();
  };
  const handleDeadline = (deadlineDate) => {
    setDeadline(deadlineDate);
    onDeadlineChange(deadline);
    console.log("At calendar modal: ", deadline);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <React.Fragment>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <MyCalendar onDateChange={handleDeadline} />
        </BootstrapDialog>
      </React.Fragment>
    </ThemeProvider>
  );
}
