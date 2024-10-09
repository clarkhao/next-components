"use client";
import React from "react";

type TypingStates = {
  text: string;
  isPushed: boolean;
};
type TypingPayload = {
  "push-text": string;
  "pop-text": number;
  "set-isPushed": boolean;
  reset: null;
};
type ITypingAction = {
  type: keyof TypingPayload;
  payload: TypingPayload[ITypingAction["type"]];
};

export function useTyping() {
  const typingReducer = (state: TypingStates, action: ITypingAction) => {
    switch (action.type) {
      case "push-text":
        return {
          ...state,
          text: state.text.concat(action.payload as TypingPayload["push-text"]),
        };
      case "pop-text":
        return {
          ...state,
          text: state.text.slice(0, -1),
        };
      case "set-isPushed":
        return {
          ...state,
          isPushed: action.payload as TypingPayload["set-isPushed"],
        };
      case "reset":
        return {
          ...state,
          text: "",
          isPushed: true,
        };
      default:
        return state;
    }
  };
  const initialStates: TypingStates = {
    text: "",
    isPushed: true,
  };
  const [typingStates, typingDispatch] = React.useReducer(typingReducer, initialStates);

  return { typingStates, typingDispatch };
}
export type TypingHandle = {
  typingStates: TypingStates;
  typingDispatch: React.Dispatch<ITypingAction>;
};
export const TypingContext = React.createContext<TypingHandle | null>(null);
