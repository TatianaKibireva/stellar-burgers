import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { orderBurgerApi } from '../../utils/burger-api';

export const createOrder = createAsyncThunk(
  'order/create',
  async (ingredientIds: string[]) => {
    const response = await orderBurgerApi(ingredientIds);
    return response.order;
  }
);

type TOrderState = {
  order: TOrder | null;
  loading: boolean;
};

const initialState: TOrderState = {
  order: null,
  loading: false
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.order = null;
      state.loading = false;
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
      });
  }
});

export const { clearOrder } = orderSlice.actions;
export default orderSlice.reducer;
