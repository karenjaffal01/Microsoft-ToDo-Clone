import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function FormDialog({ open, onClose, onSubmit }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const title = formJson.list;
    onSubmit(title); //send back to parent 
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add List</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Add the title of the new list
        </DialogContentText>
        <form onSubmit={handleSubmit} id="list-form">
          <TextField
            autoFocus
            required
            margin="dense"
            id="list"
            name="list"
            label="List Title"
            type="text"
            fullWidth
            variant="standard"
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit" form="list-form">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
