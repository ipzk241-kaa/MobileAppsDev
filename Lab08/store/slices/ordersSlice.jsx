import { createSlice } from "@reduxjs/toolkit";

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    history: [], 
  },
  reducers: {
    addOrder(state, action) {
      const newOrder = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        ...action.payload,
      };
      state.history.push(newOrder);
    },
  },
});

export const { addOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
