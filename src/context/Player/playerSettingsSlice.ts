import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";
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
    setPlayerSettingsImportData(state, action: PayloadAction<PlayerSettingsState>) {
      const { volume, isMuted, isPlaying, bpm } = action.payload;
      state.volume = volume;
      state.isMuted = isMuted;
      state.isPlaying = isPlaying;
      state.bpm = bpm;
    },
  },
  selectors: {
    getAllPlayerSettings: (state: PlayerSettingsState) => state,
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => {
      return defaultPlayerSettings;
    });
  },
});

export const { setVolume, toggleMute, setIsPlaying, setBpm, setPlayerSettingsImportData } = playerSettingsSlice.actions;

export const { getAllPlayerSettings } = playerSettingsSlice.selectors;

export default playerSettingsSlice.reducer;
