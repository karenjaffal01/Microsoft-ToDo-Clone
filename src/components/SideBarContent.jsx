import { ListItem } from './ListItem';
import { List, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import FormDialog from './FormDialog.jsx';
import IconButton from '@mui/material/IconButton';
import { setActiveList } from '../state/NotesSlice.jsx';
import { useSelector } from 'react-redux';
export const SidebarContent = ({ lists, handleDialogOpen, dialogOpen, handleDialogClose, handleAddList, setOpen }) => {
    return (
        <div className="sidebar">
            {setOpen && (
                <IconButton
                    onClick={() => setOpen(false)}
                    sx={{ backgroundColor: "white", borderRadius: 0, display: 'flex', justifyContent: 'flex-start' }}
                >
                    <CloseTwoToneIcon />
                </IconButton>
            )}

            <List sx={{ height: '100%', bgcolor: 'background.paper', color: 'black' }} component="nav">
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
                            onClick={() => dispatch(setActiveList(list.id))}
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
};
