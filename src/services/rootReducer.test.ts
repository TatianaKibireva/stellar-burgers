import { rootReducer } from './rootReducer';

describe('rootReducer', () => {
  test('Должен вернуть начальное состояние', () => {
    const expectedState = {
      ingredients: { ingredients: [], loading: false },
      burgerConstructor: { bun: null, ingredients: [] },
      order: { order: null, loading: false, orderByNumber: null },
      feed: { orders: [], loading: false, feed: { total: 0, totalToday: 0 } },
      auth: { user: null, isAuthChecked: false },
      user: { user: null },
      orders: { orders: [], loading: false }
    };

    const actualState = rootReducer(undefined, { type: '' });
    expect(actualState).toEqual(expectedState);
  });
});