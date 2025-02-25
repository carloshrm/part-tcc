import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MusicDataState, Clef, TimeSignature, Note, defaultMusicData, RESTS } from "./types";

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
    addMeasure(state) {
      state.notes.push(...Array(state.timeSignature.beats).fill(RESTS[state.timeSignature.value]));
    },
  },
  selectors: {
    getAllMusicData: (state: MusicDataState) => state,
    getClef: (state: MusicDataState) => state.clef,
    getTimeSig: (state: MusicDataState) => state.timeSignature,
    getMeasures: (state: MusicDataState) => state.notes,
  },
});

export const { setClef, setTimeSig, addNote, addMeasure } = musicDataSlice.actions;
export const { getAllMusicData, getClef, getTimeSig, getMeasures } = musicDataSlice.selectors;

export default musicDataSlice.reducer;
