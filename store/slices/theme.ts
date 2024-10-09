import { createSlice } from "@reduxjs/toolkit";

const initialState: { isDarkMode: boolean } = { isDarkMode: false };

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggle: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
  },
});

const { actions, reducer } = themeSlice;
export const { toggle } = actions;
export default reducer;
