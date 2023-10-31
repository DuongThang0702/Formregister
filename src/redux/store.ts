import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./app";
import linkSlice from "./link";
export const store = configureStore({
  reducer: {
    app: appSlice,
    link: linkSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
