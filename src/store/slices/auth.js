import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn(state, action) {
      localStorage.setItem("isLoggedIn", true);
      state.isLoggedIn = true;
    },
    logOut(state, action) {
      localStorage.setItem("isLoggedIn", false);
      state.isLoggedIn = false;
    },
  },
});

export const { logIn, logOut } = authSlice.actions;
export const authReducer = authSlice.reducer;

export const selectIsLoggedIn = state => state.auth.isLoggedIn;