import { configureStore } from "@reduxjs/toolkit";
import musicDataReducer from "./MusicData/musicDataSlice";

export const store = configureStore({
  reducer: {
    musicData: musicDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
