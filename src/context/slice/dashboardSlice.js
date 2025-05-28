import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isMyAccount: false,
  isCompanyDetails: false,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setIsMyAccount: (state, action) => {
      state.isMyAccount = action.payload;
    },
    setIsCompanyDetails: (state, action) => {
      state.isCompanyDetails = action.payload;
    },
  },
});

export const { setIsMyAccount, setIsCompanyDetails } = dashboardSlice.actions;
export default dashboardSlice.reducer;
