import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function EditDialog({ open, onClose, onSubmit, noteText }) {
  const [text, setText] = React.useState(noteText || "");

  React.useEffect(() => {
    setText(noteText || "");
  }, [noteText]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() === "") return;
    onSubmit(text);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Note</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit} id="edit-note-form">
          <TextField
            autoFocus
            required
            margin="dense"
            label="Note"
            type="text"
            fullWidth
            variant="standard"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit" form="edit-note-form">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
