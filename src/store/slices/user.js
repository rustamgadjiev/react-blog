import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: JSON.parse(localStorage.getItem('userData')),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
      setUserDataToLocale(state, action) {
        localStorage.setItem('userData', JSON.stringify(action.payload));
        state.userData = JSON.parse(localStorage.getItem('userData'));
      },
      editData(state, action) {
        localStorage.setItem('userData', JSON.stringify({ ...state.userData, ...action.payload }));
        state.userData = JSON.parse(localStorage.getItem('userData'));
      }
  },
});

export const userReducer = userSlice.reducer;

export const { setUserDataToLocale, editData } = userSlice.actions;

export const selectUserData = state => state.user.userData;