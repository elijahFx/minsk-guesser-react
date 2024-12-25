import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  name: string;
  email: string;
  [key: string]: any; // Extendable for additional user properties
}

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser(state, action: PayloadAction<User>) {
      state.isLoggedIn = true;
      state.user = action.payload;
      const userData = { ...action.payload, timestamp: Date.now() };
      localStorage.setItem("user", JSON.stringify(userData));
    },
    logoutUser(state) {
      state.isLoggedIn = false;
      state.user = null;
      localStorage.removeItem("user");
    },
    signupUser(state, action: PayloadAction<User>) {
      state.isLoggedIn = true;
      state.user = action.payload;
      const userData = { ...action.payload, timestamp: Date.now() };
      localStorage.setItem("user", JSON.stringify(userData));
    },
  },
});

export const { loginUser, logoutUser, signupUser } = authSlice.actions;

export default authSlice.reducer;
