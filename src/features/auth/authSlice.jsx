import { createSlice } from "@reduxjs/toolkit";
import { getUserData, loginAction } from "./authApi";

const initialState = {
  currentUser: {},
  isLogin: false,
  rememberPage: "/"
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (state) => {
      state.users = {};
      state.isLogin = false;
      // remove token in local storage
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      // redirect to login page
      window.location.href = "/login";
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getUserData.fulfilled, (state, action) => {
      state.currentUser = action.payload.user;
      state.isLogin = true;
    });
    builder.addCase(getUserData.rejected, (state) => {
      state.currentUser = {};
      state.isLogin = false;
      // remove token in local storage
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    });
  }
});

export const { logOut } = authSlice.actions;
export default authSlice.reducer;
