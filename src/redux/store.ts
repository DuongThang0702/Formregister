import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./app";
import linkSlice from "./link";
import userSlice from "./user";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "user",
  storage,
  whitelist: ["user", "isLoggedIn"],
};

export const store = configureStore({
  reducer: {
    app: appSlice,
    link: linkSlice,
    user: persistReducer<any>(persistConfig, userSlice),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
