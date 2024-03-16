import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrdersApi } from '@api';

export const getOrders = createAsyncThunk('orders/getUsers', async () => {
  const response = await getOrdersApi();
  return response;
});

type TOrders = {
  //   success: boolean;
  orders: TOrder[];
  //   total: number;
  //   totalToday: number;
};

const initialState: TOrders = {
  //   success: false,
  orders: []
  //   total: 0,
  //   totalToday: 0
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        //
      })
      .addCase(getOrders.rejected, (state, action) => {
        //
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      });
  }
});

export const ordersReducer = ordersSlice.reducer;
