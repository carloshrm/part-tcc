import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MusicDataState, Clef, TimeSignature } from "./types";

const defaultMusicData: MusicDataState = {
  clef: Clef.Treble,
  timeSignature: {
    beats: 4,
    value: 4,
  },
};

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
  },
  selectors: {
    getAllMusicData: (state: MusicDataState) => state,
    getClef: (state: MusicDataState) => state.clef,
    getTimeSig: (state: MusicDataState) => state.timeSignature,
  },
});

export const { setClef, setTimeSig } = musicDataSlice.actions;
export const { getAllMusicData, getClef, getTimeSig } =
  musicDataSlice.selectors;

export default musicDataSlice.reducer;
