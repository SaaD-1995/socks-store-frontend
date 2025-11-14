import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      name: "Admin User",
      role: "admin",
    },
  },
  reducers: {}
});

export default authSlice.reducer;
