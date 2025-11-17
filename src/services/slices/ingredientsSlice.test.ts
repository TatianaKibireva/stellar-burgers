import ingredientsReducer, {
  fetchIngredients,
  initialState
} from './ingredientsSlice';
import { TIngredient } from '@utils-types';

const mockIngredients: TIngredient[] = [
  {
    _id: '1',
    name: 'Булочка',
    type: 'bun',
    proteins: 5,
    fat: 3,
    carbohydrates: 40,
    calories: 210,
    price: 100,
    image: 'bun.jpg',
    image_large: 'bun-large.jpg',
    image_mobile: 'bun-mobile.jpg'
  },
  {
    _id: '2',
    name: 'Котлета',
    type: 'main',
    proteins: 20,
    fat: 15,
    carbohydrates: 1,
    calories: 250,
    price: 80,
    image: 'patty.jpg',
    image_large: 'patty-large.jpg',
    image_mobile: 'patty-mobile.jpg'
  }
];

describe('проверка экшена fetchIngredients', () => {
  test('должен устанавливать loading в true при pending', () => {
    const action = { type: fetchIngredients.pending.type };
    const result = ingredientsReducer(initialState, action);
    
    expect(result.loading).toBe(true);
    expect(result.ingredients).toEqual([]);
  });

  test('должен добавлять ингредиенты и устанавливать loading в false при fulfilled', () => {
    const action = { 
      type: fetchIngredients.fulfilled.type, 
      payload: mockIngredients 
    };
    const result = ingredientsReducer(initialState, action);
    
    expect(result.loading).toBe(false);
    expect(result.ingredients).toEqual(mockIngredients);
  });

  test('должен устанавливать loading в false при rejected', () => {
    const action = { 
      type: fetchIngredients.rejected.type,
      error: { message: 'Ошибка загрузки' }
    };
    const result = ingredientsReducer(initialState, action);
    
    expect(result.loading).toBe(false);
    expect(result.ingredients).toEqual([]);
  });
});