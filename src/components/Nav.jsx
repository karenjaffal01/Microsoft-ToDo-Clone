import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import '../styles/Nav.css';

export default function Nav({ open, setOpen }) {

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color="default" width="30px">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={() => setOpen(!open)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Notes
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

