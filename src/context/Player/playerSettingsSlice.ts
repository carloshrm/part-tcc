import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { defaultPlayerSettings, PlayerSettingsState } from "./types";

const playerSettingsSlice = createSlice({
  name: "playerSettings",
  initialState: defaultPlayerSettings,
  reducers: {
    setVolume(state, action: PayloadAction<number>) {
      state.volume = action.payload;
    },
    toggleMute(state) {
      state.isMuted = !state.isMuted;
    },
    setIsPlaying(state, action: PayloadAction<boolean>) {
      state.isPlaying = action.payload;
    },
    setBpm(state, action: PayloadAction<number>) {
      state.bpm = action.payload;
    },
  },
  selectors: {
    getAllPlayerSettings: (state: PlayerSettingsState) => state,
  },
});

export const { setVolume, toggleMute, setIsPlaying, setBpm } = playerSettingsSlice.actions;

export const { getAllPlayerSettings } = playerSettingsSlice.selectors;

export default playerSettingsSlice.reducer;
