import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Payload {
  link: string;
}

const initialState = {
  link: null as string | null,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    passLink: (state, { payload }: PayloadAction<Payload>) => {
      state.link = payload.link;
    },
  },
});

export const { passLink } = appSlice.actions;
export default appSlice.reducer;
