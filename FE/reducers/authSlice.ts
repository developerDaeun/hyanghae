import { createSlice } from "@reduxjs/toolkit";

interface authState {
  isAuthenticated: boolean;
  token: String | null;
}

const initialState: authState = { isAuthenticated: false, token: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.token = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
