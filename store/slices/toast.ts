import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TToastType = "info" | "success" | "error" | "warning" | "msg";
export type TToastMsg = {
  id: string;
  colors: TToastType;
  msg: string;
  display: "standard" | "writer";
  timed: "sm" | "md" | "lg" | null;
  variant: "default" | "colored";
};

const initialState: { toastMsg: Array<TToastMsg> } = {
  toastMsg: [],
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    reset: (state) => {
      state.toastMsg = initialState.toastMsg;
    },
    add: (state, action: PayloadAction<TToastMsg>) => {
      const { payload } = action;
      return { ...state, toastMsg: [...state.toastMsg, payload] };
    },
    del: (state, action: PayloadAction<string>) => {
      const { payload } = action;
      const queue = state.toastMsg.filter((el) => el.id !== payload);
      return { ...state, toastMsg: queue };
    },
  },
});

const { actions, reducer } = toastSlice;
export const { reset, add, del } = actions;
export default reducer;
