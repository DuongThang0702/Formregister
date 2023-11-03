import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Payload {
  link: string;
}
interface PayloadUrl {
  url: string;
}

const initialState = {
  link: null as string | null,
  url: null as string | null,
};

export const appSlice = createSlice({
  name: "link",
  initialState,
  reducers: {
    passLink: (state, { payload }: PayloadAction<Payload>) => {
      state.link = payload.link;
    },

    passUrlCapture: (state, { payload }: PayloadAction<PayloadUrl>) => {
      state.url = payload.url;
    },
  },
});

export const { passLink, passUrlCapture } = appSlice.actions;
export default appSlice.reducer;
