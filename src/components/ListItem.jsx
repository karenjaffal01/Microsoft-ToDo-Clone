import {
    ListItemButton, ListItemIcon, ListItemText
} from '@mui/material'

export const ListItem = ({ text, icon }) => {
    return (
        <ListItemButton sx={{ height: '40px' }}>
            <ListItemIcon>
                {icon}
            </ListItemIcon>
            <ListItemText primary={text}></ListItemText>
        </ListItemButton>
    )
}
