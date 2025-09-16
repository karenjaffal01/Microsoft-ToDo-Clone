import Drawer from '@mui/material/Drawer';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useMediaQuery } from '@mui/material';
import  {SidebarContent}  from './SideBarContent';
import { setActiveList } from '../state/NotesSlice.jsx';
import Nav from './Nav.jsx';

import { addList } from '../state/NotesSlice'
import '../styles/leftBar.css';
export const LeftBar = () => {
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const lists = useSelector((state) => state.notes.notesList);

  const dispatch = useDispatch();

  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);
  const handleAddList = (title) => {
    dispatch(addList({ title }));
  };

  const isMobile = useMediaQuery('(max-width:480px)');

  return (
    <>
      {!isMobile && (
        <SidebarContent
          lists={lists}
          handleDialogOpen={handleDialogOpen}
          dialogOpen={dialogOpen}
          handleDialogClose={handleDialogClose}
          handleAddList={handleAddList}
        />
      )}

      {isMobile && (
        <>
          <Nav open={open} setOpen={setOpen} />

          <Drawer
            anchor="left"
            open={open}
            onClose={() => setOpen(false)}
          >
            <SidebarContent
              lists={lists}
              handleDialogOpen={handleDialogOpen}
              dialogOpen={dialogOpen}
              handleDialogClose={handleDialogClose}
              handleAddList={handleAddList}
              setOpen={setOpen}
            />
          </Drawer>
        </>
      )}
    </>
  );
};
