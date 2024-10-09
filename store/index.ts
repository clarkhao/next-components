import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth";
import errReducer from "./slices/error";
import themeReducer from "./slices/theme";
import toastReducer from "./slices/toast";

const defaultMiddlewareConfig = {
  serializableCheck: {
    ignoredActions: [],
    ignoredActionPaths: [],
    // like toast.toastMsg
    ignoredPaths: [""],
  },
};

export const makeStore = () => {
  return configureStore({
    reducer: {
      error: errReducer,
      auth: authReducer,
      theme: themeReducer,
      toast: toastReducer,
    },
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(defaultMiddlewareConfig),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
