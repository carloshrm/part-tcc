import { configureStore } from "@reduxjs/toolkit";
import musicDataReducer from "./MusicData/musicDataSlice";
import playerSettingsReducer from "./Player/playerSettingsSlice";

export const store = configureStore({
  reducer: {
    musicData: musicDataReducer,
    playerSettings: playerSettingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
