import orderReducer, {
  createOrder,
  getOrderByNumber,
  clearOrder,
  initialState
} from './orderSlice';
import { TOrder } from '@utils-types';

const mockOrder: TOrder = {
  _id: 'order1',
  status: 'created',
  name: 'Бургер',
  createdAt: '2023-01-01',
  updatedAt: '2023-01-01',
  number: 12345,
  ingredients: ['1', '2', '1']
};

describe('проверка экшена clearOrder', () => {
  test('должен очищать состояние заказа', () => {
    const stateWithOrder = {
      ...initialState,
      order: mockOrder,
      loading: true
    };
    const result = orderReducer(stateWithOrder, clearOrder());
    
    expect(result).toEqual(initialState);
  });
});

describe('проверка экшена createOrder', () => {
  test('должен устанавливать loading в true при pending', () => {
    const action = { type: createOrder.pending.type };
    const result = orderReducer(initialState, action);
    
    expect(result.loading).toBe(true);
    expect(result.order).toBeNull();
  });

  test('должен добавлять заказ и устанавливать loading в false при fulfilled', () => {
    const action = { 
      type: createOrder.fulfilled.type, 
      payload: mockOrder 
    };
    const result = orderReducer(initialState, action);
    
    expect(result.loading).toBe(false);
    expect(result.order).toEqual(mockOrder);
  });

  test('должен устанавливать loading в false при rejected', () => {
    const action = { 
      type: createOrder.rejected.type,
      error: { message: 'Ошибка создания заказа' }
    };
    const result = orderReducer(initialState, action);
    
    expect(result.loading).toBe(false);
    expect(result.order).toBeNull();
  });
});

describe('проверка экшена getOrderByNumber', () => {
  test('должен устанавливать loading в true при pending', () => {
    const action = { type: getOrderByNumber.pending.type };
    const result = orderReducer(initialState, action);
    
    expect(result.loading).toBe(true);
    expect(result.orderByNumber).toBeNull();
  });

  test('должен добавлять заказ по номеру и устанавливать loading в false при fulfilled', () => {
    const action = { 
      type: getOrderByNumber.fulfilled.type, 
      payload: mockOrder 
    };
    const result = orderReducer(initialState, action);
    
    expect(result.loading).toBe(false);
    expect(result.orderByNumber).toEqual(mockOrder);
  });

  test('должен устанавливать loading в false при rejected', () => {
    const action = { 
      type: getOrderByNumber.rejected.type,
      error: { message: 'Ошибка поиска заказа' }
    };
    const result = orderReducer(initialState, action);
    
    expect(result.loading).toBe(false);
    expect(result.orderByNumber).toBeNull();
  });
});