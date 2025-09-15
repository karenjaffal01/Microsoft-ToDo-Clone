import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import '../styles/leftBar.css';

import { ListItem } from './ListItem';

import {
    List, ListItemButton, ListItemIcon, ListItemText, ListSubheader
} from '@mui/material'

import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';

import { addList } from '../state/NotesSlice'
import FormDialog from './FormDialog.jsx';
export const LeftBar = () => {
    
    const [open, setOpen] = useState(false)
    const [dialogOpen, setDialogOpen] = useState(false);

    const lists = useSelector((state) => state.notes.notesList)
    const dispatch = useDispatch();
    const handleClick = () => {
        setOpen(!open)
    }
    const handleDialogOpen = () => setDialogOpen(true);
    const handleDialogClose = () => setDialogOpen(false);
    const handleAddList = (title) => {
        dispatch(addList({ title }));
    };

    return (
        <div className='sidebar'>
            <List
                sx={{ height: '100%', bgcolor: 'background.paper', color: 'black' }}
                component="nav"
            >
                <ListSubheader component="div">
                    <Avatar
                        alt="Karen"
                        src="https://randomuser.me/api/portraits/women/27.jpg"
                        sx={{ width: 56, height: 56 }}
                    />
                    <div className="profile-header">
                        <h1 className="name">User name</h1>
                        <p className="name-p">username@email.com</p>
                    </div>
                </ListSubheader>
                <div className="search">
                    <TextField
                        id="outlined-search"
                        placeholder="Search"
                        type="search"
                        size="small"
                        sx={{
                            width: '90%',
                            margin: '10px auto',
                            display: 'block',
                            backgroundColor: '#fff',
                            borderRadius: '30px',
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '30px',
                                paddingRight: '8px',
                            },
                        }}
                        InputProps={{
                            startAdornment: <SearchIcon sx={{ color: '#888', mr: 1 }} />,
                        }}
                    />
                </div>
                {lists.map((list) => {
                    const IconComponent = list.icon;
                    return (
                        <ListItem
                            key={list.id}
                            text={list.title}
                            icon={<IconComponent />}
                        />
                    );
                })}
            </List>
            <div className="sidebar-footer">
                <ListItemButton onClick={handleDialogOpen}>
                    <ListItemIcon>
                        <AddIcon />
                    </ListItemIcon>
                    <ListItemText primary="New List" sx={{ color: 'black' }} />
                </ListItemButton>
            </div>
            <FormDialog
                open={dialogOpen}
                onClose={handleDialogClose}
                onSubmit={handleAddList}
            />
        </div>
    )
}
