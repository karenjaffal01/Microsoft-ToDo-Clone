import * as React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addNote, deleteNote, editNote, toggleComplete } from "../state/NotesSlice";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Button from '@mui/material/Button';
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import EditDialog from "./EditDialog";
import "../styles/TodoList.css";

import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';

export default function TodoList() {
  const dispatch = useDispatch();

  const [noteToDelete, setNoteToDelete] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [task, setTask] = useState("");
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState(null);
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleEditClick = (note) => {
    setNoteToEdit(note);
    setEditDialogOpen(true);
  };
  const handleEditSubmit = (newText) => {
    dispatch(editNote({ noteId: noteToEdit.id, newText }));
  };
  const activeListId = useSelector((state) => state.notes.activeListId);
  const searchQuery = useSelector((state) => state.notes.searchQuery);
  const noteItems = useSelector((state) => {
    const allNotes = state.notes.notes;
    const query = searchQuery.toLowerCase();

    if (query) {
      return allNotes.filter((n) => n.text.toLowerCase().includes(query));
    } else {
      return allNotes.filter((n) => n.listId === state.notes.activeListId);
    }
  });
  const notesList = useSelector((state) => state.notes.notesList);
  const activeList = notesList.find((list) => list.id === activeListId);
  const completedList = noteItems.filter((note) => note.isCompleted);
  const notCompleted = noteItems.filter((note) => !note.isCompleted);
  const color = activeList.bgColor;
  const icon = activeList.icon;
  const title = activeList.title;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim() !== "") {
      dispatch(addNote({ listId: activeListId, text: task }));
      setTask("");
    }
  };

  const handleDelete = (noteId) => {
    setDeleteDialogOpen(true);
    setNoteToDelete(noteId);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteNote(noteToDelete));
    setDeleteDialogOpen(false);
    setNoteToDelete(null);
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setNoteToDelete(null);
  };

  const ListIcon = icon;

  return (
    <div className="todo" style={{ backgroundColor: color }}>
      {!searchQuery && <div className="header">
        <ListIcon />
        <h3>{title}</h3>
      </div>
      }
      {noteItems.length == 0 && <p className='none'>No Tasks Found. Add tasks</p>}
      <List className="todo-list">
        {notCompleted.map((note, index) => {
          const labelId = `checkbox-list-label-${index}`;
          return (
            <ListItem
              key={note.id}
              secondaryAction={
                <div className="actions">
                  <IconButton edge="end" aria-label="edit" onClick={() => handleEditClick(note)}>
                    <EditOutlinedIcon />
                  </IconButton>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(note.id)}>
                    <DeleteOutlineOutlinedIcon />
                  </IconButton>
                </div>
              }
              disablePadding
              className="todo-item"
            >
              <ListItemButton
                key={note.id}
                onClick={() => dispatch(toggleComplete(note.id))}
                dense
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={note.isCompleted}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={note.text}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
        {completedList.length > 0 && (
  <>
    <div 
      onClick={handleClick} 
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "8px 12px",
        cursor: "pointer",
        fontWeight: "500",
        fontSize: "1rem",
        backgroundColor: "transparent",
        border: "none",
        outline: "none",
      }}
    >
      <span>Completed</span>
      {open ? <ExpandLess /> : <ExpandMore />}
    </div>

    <Collapse in={open} timeout="auto" unmountOnExit>
      <List>
        {completedList.map((note, index) => {
          const labelId = `checkbox-list-label-inbox-${index}`;
          return (
            <ListItem
              key={note.id}
              secondaryAction={
                <div className="actions">
                  <IconButton
                    edge="end"
                    aria-label="edit"
                    onClick={() => handleEditClick(note)}
                  >
                    <EditOutlinedIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDelete(note.id)}
                  >
                    <DeleteOutlineOutlinedIcon />
                  </IconButton>
                </div>
              }
              disablePadding
              className="todo-item"
            >
              <ListItemButton
                onClick={() => dispatch(toggleComplete(note.id))}
                dense
              >
                <ListItemIcon>
                  <Checkbox checked={note.isCompleted} />
                </ListItemIcon>
                <ListItemText
                  id={labelId}
                  primary={note.text}
                  sx={{
                    textDecoration: note.isCompleted ? "line-through" : "none",
                    color: note.isCompleted ? "gray" : "inherit",
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Collapse>
  </>
)}
      <Dialog open={deleteDialogOpen} onClose={handleCancelDelete}>
        <DialogTitle>Are you sure you want to delete this note?</DialogTitle>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <EditDialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        onSubmit={handleEditSubmit}
        noteText={noteToEdit?.text}
        key={noteToEdit}
      />
      <form className="add-task-form" onSubmit={handleSubmit}>
        <FormControl fullWidth>
          <OutlinedInput
            placeholder="Add a task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            startAdornment={<InputAdornment position="start">+</InputAdornment>}
          />
        </FormControl>
      </form>
    </div>
  );
}
