import { configureStore } from "@reduxjs/toolkit";
import dashboardSlice from "../slice/dashboardSlice";
import cartSlice from "../slice/cartSlice";

export const store = configureStore({
  reducer: {
    reducer: dashboardSlice,
    cart: cartSlice,
  },
});
