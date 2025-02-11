import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MusicDataState, Clef, TimeSignature, Note, defaultMusicData } from "./types";

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
    addNote(state, action: PayloadAction<{ note: Note; measure: number }>) {
      state.measures[action.payload.measure].push(action.payload.note);
    },
    addMeasure(state) {
      state.measures.push(Array(state.timeSignature.beats).fill(undefined));
    },
  },
  selectors: {
    getAllMusicData: (state: MusicDataState) => state,
    getClef: (state: MusicDataState) => state.clef,
    getTimeSig: (state: MusicDataState) => state.timeSignature,
    getMeasures: (state: MusicDataState) => state.measures,
  },
});

export const { setClef, setTimeSig, addNote, addMeasure } = musicDataSlice.actions;
export const { getAllMusicData, getClef, getTimeSig, getMeasures } = musicDataSlice.selectors;

export default musicDataSlice.reducer;
