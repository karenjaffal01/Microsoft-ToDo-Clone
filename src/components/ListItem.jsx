import {
    ListItemButton, ListItemIcon, ListItemText
} from '@mui/material'

export const ListItem = ({ text, icon, onClick, selected }) => {
    return (
        <ListItemButton sx={{ height: '40px' }} onClick={onClick} selected={selected}>
            <ListItemIcon>
                {icon}
            </ListItemIcon>
            <ListItemText primary={text}></ListItemText>
        </ListItemButton>
    )
}
