import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "./NotesSlice.jsx";
export const store = configureStore({
  reducer: {
    notes: notesReducer,
  },
});
