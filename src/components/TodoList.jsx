import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import IconButton from '@mui/material/IconButton';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import '../styles/TodoList.css';
import { addNote } from '../state/NotesSlice';
import { useSelector } from 'react-redux';
import { useState } from 'react';
export default function TodoList() {
  const [checked, setChecked] = React.useState([0]);
  const activeListId = useSelector((state) => state.notes.activeListId);
  const noteItems = useSelector((state) => state.notes.notes);
  const notes = useSelector((state) => state.notes.notes.filter(n => n.listId === activeListId))
  const [task, setTask] = useState('');
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  return (
    <div className='todo'>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {noteItems.map((value) => {
          const labelId = `checkbox-list-label-${value}`;

          return (
            <ListItem
              key={value}
              secondaryAction={
                <IconButton edge="end" aria-label="delete">
                  <DeleteOutlineOutlinedIcon />
                </IconButton>
              }
              disablePadding
            >
              <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked.includes(value)}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <form
        onSubmit={(e) => {
          e.preventDefault(); 
          if (task.trim() !== "") {
            dispatch(addNote({ listId: selectedListId, text: task }));
            setTask("");
          }
        }}
      >
        <FormControl fullWidth className="add-task">
          <InputLabel htmlFor="outlined-adornment-amount">Add Task</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            startAdornment={<InputAdornment position="start">+</InputAdornment>}
            label="Add Task"
          />
        </FormControl>
      </form>

    </div>
  );
}
