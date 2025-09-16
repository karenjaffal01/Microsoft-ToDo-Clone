import { createSlice } from "@reduxjs/toolkit";
import IndeterminateCheckBoxOutlinedIcon from "@mui/icons-material/IndeterminateCheckBoxOutlined";
import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import TourOutlinedIcon from "@mui/icons-material/TourOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ListIcon from "@mui/icons-material/List";

const notesList = [
  { id: crypto.randomUUID(), title: "My day", icon: LightModeOutlinedIcon },
  {
    id: crypto.randomUUID(),
    title: "Important",
    icon: StarOutlineOutlinedIcon,
  },
  {
    id: crypto.randomUUID(),
    title: "Planned",
    icon: IndeterminateCheckBoxOutlinedIcon,
  },
  {
    id: crypto.randomUUID(),
    title: "Assigned To Me",
    icon: PersonOutlineOutlinedIcon,
  },
  { id: crypto.randomUUID(), title: "Flagged Email", icon: TourOutlinedIcon },
  { id: crypto.randomUUID(), title: "Tasks", icon: HomeOutlinedIcon },
];

const initialState = {
  notesList,
  notes: [],
  activeListId: notesList[0].id,
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addList: (state, action) => {
      const newList = {
        id: crypto.randomUUID(),
        title: action.payload.title,
        icon: ListIcon,
      };
      state.notesList.push(newList);

      state.activeListId = newList.id;
    },
    addNote: (state, action) => {
      const { listId, text } = action.payload;
      state.notes.push({
        id: crypto.randomUUID(),
        listId,
        text,
        completed: false,
      });
    },
    setActiveList: (state, action) => {
      state.activeListId = action.payload;
    },
  },
});

export const { addList, addNote, setActiveList } = notesSlice.actions;
export default notesSlice.reducer;
