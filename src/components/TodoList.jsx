import * as React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addNote } from "../state/NotesSlice";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";

import "../styles/TodoList.css";

export default function TodoList() {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState([]);
  const activeListId = useSelector((state) => state.notes.activeListId);
  const noteItems = useSelector((state) =>
    state.notes.notes.filter((n) => n.listId === activeListId)
  );

  const [task, setTask] = useState("");

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) newChecked.push(value);
    else newChecked.splice(currentIndex, 1);

    setChecked(newChecked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim() !== "") {
      dispatch(addNote({ listId: activeListId, text: task }));
      setTask("");
    }
  };

  return (
    <div className="todo">
      <List className="todo-list">
        {noteItems.map((note, index) => {
          const labelId = `checkbox-list-label-${index}`;
          return (
            <ListItem
              key={note.id || index}
              secondaryAction={
                <div className="actions">
                  <IconButton edge="end" aria-label="edit">
                    <EditOutlinedIcon fontSize="small" />
                  </IconButton>
                  <IconButton edge="end" aria-label="delete">
                    <DeleteOutlineOutlinedIcon fontSize="small" />
                  </IconButton>
                </div>
              }
              disablePadding
              className="todo-item"
            >
              <ListItemButton
                role={undefined}
                onClick={handleToggle(note.id)}
                dense
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked.includes(note.id)}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={note.text} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

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
