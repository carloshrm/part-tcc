import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MusicDataState, Clef } from "./types";

const defaultMusicData: MusicDataState = {
  clef: Clef.Treble,
};

const musicDataSlice = createSlice({
  name: "musicData",
  initialState: defaultMusicData,
  reducers: {
    setClef(state, action: PayloadAction<Clef>) {
      state.clef = action.payload;
    },
  },
  selectors: {
    getAllMusicData: (state: MusicDataState) => state,
    getClef: (state: MusicDataState) => state.clef,
  },
});

export const { setClef } = musicDataSlice.actions;
export const { getAllMusicData, getClef } = musicDataSlice.selectors;

export default musicDataSlice.reducer;
