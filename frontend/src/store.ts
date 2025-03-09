import { configureStore } from "@reduxjs/toolkit";
import coordinatesReducer from "./slices/coordinatesSlice.ts";
import authReducer from "./slices/authSlice.ts";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userApi } from "./apis/userApi.ts";
import { partyApi } from "./apis/partyApi.ts"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    coordinates: coordinatesReducer,
    [userApi.reducerPath]: userApi.reducer, // Connects the userApi reducer
    [partyApi.reducerPath]: partyApi.reducer, // Connects the partyApi reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware) // Adds userApi middleware
      .concat(partyApi.middleware), // Adds partyApi middleware
});

// Set up listeners for API
setupListeners(store.dispatch);
