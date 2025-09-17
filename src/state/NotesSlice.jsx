import { createSlice } from "@reduxjs/toolkit";
import IndeterminateCheckBoxOutlinedIcon from "@mui/icons-material/IndeterminateCheckBoxOutlined";
import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import TourOutlinedIcon from "@mui/icons-material/TourOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ListIcon from "@mui/icons-material/List";
const pastelColors = [
  "#f4f5f7",
  "#FFF5BA",
  "#BAE1FF",
  "#E7FFBA",
  "#E0BBE4",
  "#FFDAB9",
  "#FFD6E0"
];

const notesList = [
  { id: crypto.randomUUID(), title: "My day", icon: LightModeOutlinedIcon, bgColor: pastelColors[0] },
  {
    id: crypto.randomUUID(),
    title: "Important",
    icon: StarOutlineOutlinedIcon,
    bgColor: pastelColors[1]
  },
  {
    id: crypto.randomUUID(),
    title: "Planned",
    icon: IndeterminateCheckBoxOutlinedIcon,
    bgColor: pastelColors[2]
  },
  {
    id: crypto.randomUUID(),
    title: "Assigned To Me",
    icon: PersonOutlineOutlinedIcon,
    bgColor: pastelColors[3]
  },
  { id: crypto.randomUUID(), title: "Flagged Email", icon: TourOutlinedIcon, bgColor: pastelColors[4] },
  { id: crypto.randomUUID(), title: "Tasks", icon: HomeOutlinedIcon, bgColor: pastelColors[5] },
];

const initialState = {
  notesList,
  notes: [],
  activeListId: notesList[0].id,
  searchQuery: "",
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
        bgColor: pastelColors[6]
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
        isCompleted: false,
      });
    },
    toggleComplete: (state, action) => {
      const note = state.notes.find((n) => n.id === action.payload);
      if (note) note.isCompleted = !note.isCompleted;
    },
    setActiveList: (state, action) => {
      state.activeListId = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    deleteNote: (state, action) => {
      const noteId = action.payload;
      state.notes = state.notes.filter((note) => note.id !== noteId);
    },
    editNote: (state, action) => {
      const { noteId, newText } = action.payload;
      const note = state.notes.find((n) => n.id === noteId);
      if (note) note.text = newText;
    },
  },
});

export const { addList, addNote, setActiveList, setSearchQuery, deleteNote, editNote, toggleComplete } = notesSlice.actions;
export default notesSlice.reducer;
