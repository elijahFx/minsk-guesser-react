import { configureStore } from "@reduxjs/toolkit";
import coordinatesReducer from "./slices/coordinatesSlice.ts";
import authReducer  from "./slices/authSlice.ts"
import { setupListeners } from "@reduxjs/toolkit/query";
import { userApi } from "./apis/userApi.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    coordinates: coordinatesReducer,
    [userApi.reducerPath]: userApi.reducer, // Подключаем reducer userApi
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware), // Добавляем middleware userApi
});

// Настраиваем listeners для API
setupListeners(store.dispatch);
