import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TOrder, TOrdersData } from '@utils-types';
import { getFeedsApi } from '../../utils/burger-api';

// асинхронная Thunk-функция
export const fetchFeeds = createAsyncThunk('feed/fetchAll', async () => {
  const response = await getFeedsApi();
  return response;
});

type TFeedState = {
  orders: TOrder[];
  loading: boolean;
  feed: {
    total: number;
    totalToday: number;
  };
};

const initialState: TFeedState = {
  orders: [],
  loading: false,
  feed: {
    total: 0,
    totalToday: 0
  }
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<TOrder[]>) => {
      state.orders = action.payload;
    },
    addOrder: (state, action: PayloadAction<TOrder>) => {
      state.orders.unshift(action.payload);
      state.feed.total += 1;
    }
  },
  extraReducers: (builder) => {
    builder
      // обработка начала загрузки
      .addCase(fetchFeeds.pending, (state) => {
        state.loading = true;
      })
      // обработка успешного завершения
      .addCase(
        fetchFeeds.fulfilled,
        (state, action: PayloadAction<TOrdersData>) => {
          state.orders = action.payload.orders;
          state.loading = false;
          state.feed = {
            total: action.payload.total,
            totalToday: action.payload.totalToday
          };
        }
      )
      // обработка ошибки
      .addCase(fetchFeeds.rejected, (state) => {
        state.loading = false;
      });
  }
});

export const { setOrders, addOrder } = feedSlice.actions;
export default feedSlice.reducer;
