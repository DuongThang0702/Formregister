import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import React from "react";

interface Payload {
  modelChildren: React.ReactElement | null;
  isShowModel: boolean;
}

const initialState = {
  isShowModel: false,
  modelChildren: null as React.ReactElement | null,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    showModel: (state, { payload }: PayloadAction<Payload>) => {
      state.isShowModel = payload.isShowModel;
      state.modelChildren = payload.modelChildren;
    },
  },
});

export const { showModel } = appSlice.actions;
export default appSlice.reducer;
