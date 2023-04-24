import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./rootReducer";

// TODO: Remember to use thunk to fetch async-ly and store to redux.

// Persist redux allows us to save the state of the app even after closing it.
// By saving the state in storage, and retrieve it whenever it is needed.
// black listing is for reducers we don't want to save after app is closed.

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["editViewReducer"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // ignoredActions are from redux persist to prevent errors!
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export default { persistor, store };
