import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getFeedsApi } from '@api';

export const getFeeds = createAsyncThunk('order/getAll', async () => {
  const response = await getFeedsApi();
  return response;
});

type TFeeds = {
  orders: TOrder[];
  success: boolean;
  total: number;
  totalToday: number;
};

const initialState: TFeeds = {
  orders: [],
  success: false,
  total: 0,
  totalToday: 0
};

const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        //
      })
      .addCase(getFeeds.rejected, (state, action) => {
        //
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      });
  }
});

export const feedsReducer = feedsSlice.reducer;
