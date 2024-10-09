import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { mergeStorage } from "../../lib/storage"

export type TAuthState = {
  fields: Record<string, string>
  signup: { email: string; step: number }
}
const initialState: TAuthState = {
  fields: { type: "password" },
  signup: { email: "", step: 0 },
}

const errorSlice = createSlice({
  name: "auth",
  initialState: mergeStorage<TAuthState, "signup">("auth", ["signup"], initialState),
  reducers: {
    toggleType: (state) => {
      if (state.fields.type === "password") state.fields.type = "text"
      else state.fields.type = "password"
    },
    setStep: (state, action: PayloadAction<{ email: string; step: number }>) => {
      const { payload } = action
      window.sessionStorage.setItem(
        "auth",
        JSON.stringify({
          signup: payload,
        })
      )
      return { ...state, signup: payload }
    },
  },
})
const { actions, reducer } = errorSlice
export const { toggleType, setStep } = actions
export default reducer
