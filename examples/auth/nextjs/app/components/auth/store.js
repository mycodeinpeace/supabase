// src/components/auth/store.js

import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    session: null,
    user: null,
  },
  reducers: {
    setSession: (state, action) => {
      state.session = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setSession, setUser } = authSlice.actions;
export default authSlice.reducer;
