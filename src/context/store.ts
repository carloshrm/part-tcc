import { configureStore } from "@reduxjs/toolkit";
import { PERSIST, persistReducer, persistStore, REHYDRATE } from "redux-persist";
import storage from "redux-persist/lib/storage";
import musicDataReducer from "./MusicData/musicDataSlice";
import playerSettingsReducer from "./Player/playerSettingsSlice";

const persistedMusicDataReducer = persistReducer(
  {
    key: "musicdata",
    storage,
  },
  musicDataReducer,
);

const persistedPlayerSettingsReducer = persistReducer(
  {
    key: "playersettings",
    storage,
  },
  playerSettingsReducer,
);

export const store = configureStore({
  reducer: {
    musicData: persistedMusicDataReducer,
    playerSettings: persistedPlayerSettingsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [PERSIST, REHYDRATE],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
