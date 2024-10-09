import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: { errors: Record<string, string> } = { errors: {} };

const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    reset: (state) => {
      state.errors = {};
    },
    add: (state, action: PayloadAction<{ from: string; message: string }>) => {
      const { payload } = action;
      state.errors = { ...state.errors, [`${payload.from}`]: payload.message };
    },
    del: (state, action: PayloadAction<string>) => {
      const { payload } = action;
      delete state.errors[payload];
    },
  },
});
const { actions, reducer } = errorSlice;
export const { reset, add, del } = actions;
export default reducer;
