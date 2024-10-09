"use client"
import React from "react"
type TListData = {
  pageIndex: number
  currentIndex: number
  isNext: boolean
}
type TListDataPayload = {
  "next-page": { first: boolean; current: boolean }
  "prev-page": { first: boolean; current: boolean }
  "specified-page": { first: boolean; current: boolean; value: number }
  "set-is-next": boolean
}
export type IListAction = {
  type: keyof TListDataPayload
  payload: TListDataPayload[IListAction["type"]]
}

export function useFetch(current?: number) {
  const currentPage = current ?? 1
  const initListData: TListData = {
    pageIndex: currentPage === 1 ? currentPage : currentPage - 1,
    currentIndex: currentPage,
    isNext: false,
  }
  const listReducer = (state: TListData, action: IListAction) => {
    switch (action.type) {
      case "next-page":
        return {
          ...state,
          pageIndex: (action.payload as TListDataPayload["next-page"]).first ? state.pageIndex + 1 : state.pageIndex,
          currentIndex: (action.payload as TListDataPayload["next-page"]).current
            ? state.currentIndex + 1
            : state.pageIndex,
        }
      case "prev-page":
        return {
          ...state,
          pageIndex: (action.payload as TListDataPayload["next-page"]).first ? state.pageIndex - 1 : state.pageIndex,
          currentIndex: (action.payload as TListDataPayload["next-page"]).current
            ? state.currentIndex - 1
            : state.pageIndex,
        }
      case "specified-page":
        return {
          ...state,
          pageIndex: (action.payload as TListDataPayload["specified-page"]).first
            ? state.pageIndex + ((action.payload as TListDataPayload["specified-page"]).value - state.pageIndex - 1)
            : state.pageIndex,
          currentIndex: (action.payload as TListDataPayload["specified-page"]).current
            ? (action.payload as TListDataPayload["specified-page"]).value
            : state.currentIndex,
        }
      case "set-is-next":
        return {
          ...state,
          isNext: action.payload as TListDataPayload["set-is-next"],
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
  listDispatch: React.Dispatch<IListAction>
}
export const ListContext = React.createContext<TListHandle | null>(null)
