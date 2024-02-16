import * as React from "react";
import Button from "@mui/material/Button";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
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

export default function NotesModal({
  propsid,
  propstitle,
  propsbody,
  propsdeadline,
  isOpen,
  onClose,
  onUpdate,
}) {
  const [noteData, setNoteData] = useState({
    id: propsid,
    title: propstitle,
    description: propsbody,
    deadline: propsdeadline,
  });
  const [open, setOpen] = useState(isOpen);

  const handleClose = () => {
    setOpen(false);
    onUpdate(noteData);
    onClose();
  };

  const handleTitleChange = (e) => {
    setNoteData((prev) => {
      return {
        ...prev,
        title: e.target.value,
      };
    });
  };

  const handleBodyChange = (e) => {
    setNoteData((prev) => {
      return {
        ...prev,
        description: e.target.value,
      };
    });
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <React.Fragment>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            <input
              onChange={handleTitleChange}
              className="w-full bg-black bg-opacity-0 outline-none"
              defaultValue={propstitle}
            ></input>
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          />
          <DialogContent dividers>
            <textarea
              onChange={handleBodyChange}
              defaultValue={propsbody}
              className="w-[25vw] min-h-[70vh] bg-black bg-opacity-0 outline-none"
            ></textarea>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Save changes
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </React.Fragment>
    </ThemeProvider>
  );
}
