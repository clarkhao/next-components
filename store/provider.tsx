"use client";
import { Provider } from "react-redux";
import { makeStore } from "./index";

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={makeStore()}>{children}</Provider>;
}
