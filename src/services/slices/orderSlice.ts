import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { orderBurgerApi, getOrderByNumberApi } from '../../utils/burger-api';
import { clearConstructor } from './burgerConstructorSlice';

export const createOrder = createAsyncThunk(
  'order/create',
  async (ingredientIds: string[], { dispatch }) => {
    const response = await orderBurgerApi(ingredientIds);
    dispatch(clearConstructor());
    return response.order;
  }
);

type TOrderState = {
  order: TOrder | null;
  loading: boolean;
  orderByNumber: TOrder | null;
};

export const initialState: TOrderState = {
  order: null,
  loading: false,
  orderByNumber: null
};

export const getOrderByNumber = createAsyncThunk(
  'order/getOrderByNumber',
  async (orderNumber: number) => {
    const response = await getOrderByNumberApi(orderNumber);
    return response.orders[0];
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.order = null;
      state.loading = false;
      state.orderByNumber = null;
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        createOrder.fulfilled,
        (state, action: PayloadAction<TOrder>) => {
          state.order = action.payload;
          state.loading = false;
        }
      )
      .addCase(createOrder.rejected, (state) => {
        state.loading = false;
        state.order = null;
      })

      .addCase(getOrderByNumber.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getOrderByNumber.fulfilled,
        (state, action: PayloadAction<TOrder>) => {
          state.orderByNumber = action.payload;
          state.loading = false;
        }
      )
      .addCase(getOrderByNumber.rejected, (state) => {
        state.loading = false;
        state.orderByNumber = null;
      });
  }
});

export const { clearOrder } = orderSlice.actions;
export default orderSlice.reducer;
