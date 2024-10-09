"use client"

import { LocalStorageAPI } from "lib/storage"
import React from "react"

// custom functions
export function getInitStorage<T extends Record<string, unknown>, S extends keyof T>(
  key: string,
  slice: Array<S>
): Pick<T, S> | Error {
  const result: Record<string, unknown> = {}
  if (typeof window === "undefined") return new Error("storage null")
  const values = window.localStorage.getItem(key)
  if (values === null) return new Error("storage null")
  else {
    const raw = JSON.parse(values as string)
    for (const s of slice) {
      result[s.toString()] = raw[s]
    }
    return result as Pick<T, S>
  }
}

export function mergeStorage<T extends Record<string, unknown>, S extends keyof T>(
  key: string,
  slice: Array<S>,
  init: T
): T {
  const storage = getInitStorage<T, S>(key, slice)
  if (storage instanceof Error) {
    return init
  }
  return { ...init, ...storage }
}

export type TToastType = "info" | "success" | "error" | "warning" | "msg"
export type TToastMsg = {
  id: string
  colors: TToastType
  msg: string
  display: "standard" | "writer"
  timed: "sm" | "md" | "lg" | null
  variant: "default" | "colored"
}
export type TError = {
  id: string
  msg: string
  path: string
}

type GlobalStates = {
  toastMsg: Array<TToastMsg>
  theme: "light" | "dark"
}
type GlobalStatesPayload = {
  "toast-reset": undefined
  "toast-add": TToastMsg
  "toast-del": string
  "toggle-theme": "light" | "dark"
}
export type GlobalStatesAction = {
  type: keyof GlobalStatesPayload
  payload: GlobalStatesPayload[GlobalStatesAction["type"]]
}
export function useGlobalStates() {
  let theme: "light" | "dark" = "dark"
  const globalStorage = new LocalStorageAPI<Omit<GlobalStates, "toastMsg">>("global")
  const globals = globalStorage.load()
  if (
    globals?.theme === "dark" ||
    (!(globals?.theme) && window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark")
    theme = "dark"
  } else {
    document.documentElement.classList.remove("dark")
    theme = "light"
  }
  const init: GlobalStates = {
    toastMsg: [],
    theme,
  }
  const initGlobalStates = mergeStorage<GlobalStates, "theme">("global", ["theme"], init)
  const reducer = (state: GlobalStates, action: GlobalStatesAction) => {
    switch (action.type) {
      case "toast-add":
        return { ...state, toastMsg: [...state.toastMsg, action.payload as TToastMsg] }
      case "toast-del":
        return { ...state, toastMsg: state.toastMsg.filter((el) => el.id !== action.payload) }
      case "toast-reset":
        return { ...state, toastMsg: init.toastMsg }
      case "toggle-theme":
        return { ...state, theme: action.payload as "light" | "dark" }
      default:
        return state
    }
  }
  const [states, dispatch] = React.useReducer(reducer, initGlobalStates)
  return { states, dispatch }
}
type TGlobalStatesHandler = {
  states: GlobalStates
  dispatch: React.Dispatch<GlobalStatesAction>
}
export const GlobalContext = React.createContext<TGlobalStatesHandler | null>(null)
