// Importing createSlice from Redux Toolkit
import { createSlice } from "@reduxjs/toolkit";

// Initializing initialState with default mode as light
const initialState = {
  mode: "light",
};

// Creating authSlice with a name, initial state, and a setMode reducer
export const authSlice = createSlice({
  name: "auth", // name of the slice
  initialState, // initial state for the slice
  reducers: {
    setMode: (state) => {
      // toggle between light and dark modes
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

// Exporting the setMode reducer as an action
export const { setMode } = authSlice.actions;

// Exporting the authSlice reducer as default
export default authSlice.reducer;
