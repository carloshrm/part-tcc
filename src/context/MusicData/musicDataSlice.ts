import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MusicDataState, TimeSignature, Note, defaultMusicData } from "./types";
import { Clef, RESTS } from "./constants";

const musicDataSlice = createSlice({
  name: "musicData",
  initialState: defaultMusicData,
  reducers: {
    setClef(state, action: PayloadAction<Clef>) {
      state.clef = action.payload;
    },
    setTimeSig(state, action: PayloadAction<TimeSignature>) {
      state.timeSignature = action.payload;
    },
    addNote(state, action: PayloadAction<Note>) {
      state.notes.push(action.payload);
    },
    setNote(state, action: PayloadAction<Note>) {
      state.notes[state.selectedNote] = action.payload;
    },
    addMeasure(state, action: PayloadAction<Note[]>) {
      state.notes = [...state.notes, ...action.payload];
    },
    setSelectedNote(state, action: PayloadAction<number>) {
      state.selectedNote = action.payload;
    },
  },
  selectors: {
    getAllMusicData: (state: MusicDataState) => state,
    getClef: (state: MusicDataState) => state.clef,
    getTimeSig: (state: MusicDataState) => state.timeSignature,
    getNotes: (state: MusicDataState) => state.notes,
    getSelectedNote: (state: MusicDataState) => state.selectedNote,
  },
});

export const { setClef, setTimeSig, addNote, addMeasure, setSelectedNote, setNote } = musicDataSlice.actions;
export const { getAllMusicData, getClef, getTimeSig, getNotes, getSelectedNote } = musicDataSlice.selectors;

export default musicDataSlice.reducer;
