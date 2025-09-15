import ordersReducer, {
  getOrders,
  initialState
} from './ordersSlice';
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
    status: 'done',
    name: 'Бургер 2',
    createdAt: '2023-01-02',
    updatedAt: '2023-01-02',
    number: 12346,
    ingredients: ['1', '3']
  }
];

describe('проверка экшена getOrders', () => {
  test('должен устанавливать loading в true при pending', () => {
    const action = { type: getOrders.pending.type };
    const result = ordersReducer(initialState, action);
    
    expect(result.loading).toBe(true);
    expect(result.orders).toEqual([]);
  });

  test('должен добавлять заказы и устанавливать loading в false при fulfilled', () => {
    const action = { 
      type: getOrders.fulfilled.type, 
      payload: mockOrders 
    };
    const result = ordersReducer(initialState, action);
    
    expect(result.loading).toBe(false);
    expect(result.orders).toEqual(mockOrders);
  });

  test('должен устанавливать loading в false и очищать заказы при rejected', () => {
    const action = { 
      type: getOrders.rejected.type,
      error: { message: 'Ошибка загрузки заказов' }
    };
    const result = ordersReducer(
      { ...initialState, orders: mockOrders, loading: true },
      action
    );
    
    expect(result.loading).toBe(false);
    expect(result.orders).toEqual([]);
  });
});