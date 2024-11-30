import { configureStore } from "@reduxjs/toolkit";
import coordinatesReducer from "./slices/coordinatesSlice.ts"
import { setupListeners } from "@reduxjs/toolkit/query";



export const store = configureStore({
  reducer: {
    coordinates: coordinatesReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
});

setupListeners(store.dispatch);
