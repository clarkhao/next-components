"use client"
import React from "react"
type TListData = {
  currentIndex: number
  isAscending: boolean
  cursors: Record<string, string>
}
type TListDataPayload = {
  isAscending: undefined
  isDescending: undefined
  "next-page": boolean
  "prev-page": boolean
  "set-specified": number
  "record-cursor": Record<string, string>
  reset: null
}
export type IDynamicListAction = {
  type: keyof TListDataPayload
  payload: TListDataPayload[IDynamicListAction["type"]]
}

export function usePage(current?: number) {
  const initListData: TListData = {
    currentIndex: current ?? 1,
    isAscending: true,
    cursors: {},
  }
  const listReducer = (state: TListData, action: IDynamicListAction) => {
    switch (action.type) {
      case "isAscending":
        return {
          ...state,
          isAscending: true,
        }
      case "isDescending":
        return {
          ...state,
          isAscending: false,
        }
      case "next-page":
        return {
          ...state,
          currentIndex: (action.payload as TListDataPayload["next-page"]) ? state.currentIndex + 1 : state.currentIndex,
        }
      case "prev-page":
        return {
          ...state,
          currentIndex: (action.payload as TListDataPayload["prev-page"]) ? state.currentIndex - 1 : state.currentIndex,
        }
      case "set-specified":
        return {
          ...state,
          currentIndex: action.payload as TListDataPayload["set-specified"],
        }
      case "record-cursor":
        return {
          ...state,
          cursors: {
            ...state.cursors,
            ...(action.payload as TListDataPayload["record-cursor"]),
          },
        }
      case "reset":
        return {
          ...state,
          ...initListData,
        }
      default:
        return state
    }
  }

  const [listState, listDispatch] = React.useReducer(listReducer, initListData)

  return { listState, listDispatch }
}
type TListHandle = {
  listState: TListData
  listDispatch: React.Dispatch<IDynamicListAction>
}
export const DynamicListContext = React.createContext<TListHandle | null>(null)
