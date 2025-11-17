import feedReducer, {
  fetchFeeds,
  setOrders,
  addOrder,
  initialState
} from './feedSlice';
import { TOrder } from '@utils-types';

const mockOrders: TOrder[] = [
  {
    _id: 'order1',
    status: 'created',
    name: 'Бургер 1',
    createdAt: '2023-01-01',
    updatedAt: '2023-01-01',
    number: 12345,
    ingredients: ['1', '2']
  },
  {
    _id: 'order2',
    status: 'pending',
    name: 'Бургер 2',
    createdAt: '2023-01-02',
    updatedAt: '2023-01-02',
    number: 12346,
    ingredients: ['1', '3']
  }
];

const mockFeedData = {
  orders: mockOrders,
  total: 100,
  totalToday: 10
};


describe('проверка экшенов setOrders и addOrder', () => {
  test('должен устанавливать заказы через setOrders', () => {
    const action = setOrders(mockOrders);
    const result = feedReducer(initialState, action);
    
    expect(result.orders).toEqual(mockOrders);
  });

  test('должен добавлять заказ через addOrder', () => {
    const newOrder: TOrder = {
      _id: 'order3',
      status: 'done',
      name: 'Бургер 3',
      createdAt: '2023-01-03',
      updatedAt: '2023-01-03',
      number: 12347,
      ingredients: ['1', '4']
    };
    
    const action = addOrder(newOrder);
    const result = feedReducer(
      { ...initialState, orders: mockOrders, feed: { total: 100, totalToday: 10 } },
      action
    );
    
    expect(result.orders).toHaveLength(3);
    expect(result.orders[0]).toEqual(newOrder);
    expect(result.feed.total).toBe(101);
  });
});

describe('проверка экшена fetchFeeds', () => {
  test('должен устанавливать loading в true при pending', () => {
    const action = { type: fetchFeeds.pending.type };
    const result = feedReducer(initialState, action);
    
    expect(result.loading).toBe(true);
    expect(result.orders).toEqual([]);
  });

  test('должен добавлять данные фидов и устанавливать loading в false при fulfilled', () => {
    const action = { 
      type: fetchFeeds.fulfilled.type, 
      payload: mockFeedData 
    };
    const result = feedReducer(initialState, action);
    
    expect(result.loading).toBe(false);
    expect(result.orders).toEqual(mockOrders);
    expect(result.feed.total).toBe(100);
    expect(result.feed.totalToday).toBe(10);
  });

  test('должен устанавливать loading в false при rejected', () => {
    const action = { 
      type: fetchFeeds.rejected.type,
      error: { message: 'Ошибка загрузки фидов' }
    };
    const result = feedReducer(initialState, action);
    
    expect(result.loading).toBe(false);
    expect(result.orders).toEqual([]);
  });
});