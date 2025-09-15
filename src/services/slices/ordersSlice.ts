import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrdersApi } from '../../utils/burger-api';

export const getOrders = createAsyncThunk('orders/getAll', getOrdersApi);

type TOrdersState = {
  orders: TOrder[];
  loading: boolean;
};

export const initialState: TOrdersState = {
  orders: [],
  loading: false
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getOrders.fulfilled,
        (state, action: PayloadAction<TOrder[]>) => {
          state.orders = action.payload;
          state.loading = false;
        }
      )
      .addCase(getOrders.rejected, (state) => {
        state.loading = false;
        state.orders = [];
      });
  }
});

export default ordersSlice.reducer;
