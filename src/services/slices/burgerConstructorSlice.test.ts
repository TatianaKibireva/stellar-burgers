import burgerConstructorReducer, {
  addIngredient,
  removeIngredient,
  moveIngredient,
  initialState
} from './burgerConstructorSlice';
import { TIngredient } from '@utils-types';

// моковые данные
const mockBun: TIngredient = {
  _id: 'bun1',
  name: 'Булочка',
  type: 'bun',
  proteins: 0,
  fat: 0,
  carbohydrates: 0,
  calories: 0,
  price: 100,
  image: '',
  image_large: '',
  image_mobile: ''
};

const mockMain: TIngredient = {
  _id: 'main1',
  name: 'Котлета',
  type: 'main',
  proteins: 0,
  fat: 0,
  carbohydrates: 0,
  calories: 0,
  price: 50,
  image: '',
  image_large: '',
  image_mobile: ''
};

const mockSauce: TIngredient = {
  _id: 'sauce1',
  name: 'Соус',
  type: 'sauce',
  proteins: 0,
  fat: 0,
  carbohydrates: 0,
  calories: 0,
  price: 30,
  image: '',
  image_large: '',
  image_mobile: ''
};


describe('экшен добавления ингредиента', () => {
  test('должен добавлять булку в конструктор', () => {
    const action = addIngredient(mockBun);
    const result = burgerConstructorReducer(initialState, action);

    expect(result.bun).toEqual(mockBun);
    expect(result.ingredients).toHaveLength(0);
  });

  test('должен добавлять начинку в конструктор', () => {
    const action = addIngredient(mockMain);
    const result = burgerConstructorReducer(initialState, action);

    expect(result.bun).toBeNull();
    expect(result.ingredients).toHaveLength(1);
    expect(result.ingredients[0]).toMatchObject({
      ...mockMain,
      id: expect.any(String)
    });
  });

  test('должен добавлять соус в конструктор', () => {
    const action = addIngredient(mockSauce);
    const result = burgerConstructorReducer(initialState, action);

    expect(result.ingredients).toHaveLength(1);
    expect(result.ingredients[0].type).toBe('sauce');
  });
});

describe('экшен удаления ингредиента', () => {
  test('должен удалять ингредиет по айди', () => {
    // добавляем ингредиенты
    const addAction = addIngredient(mockMain);
    const stateWithIngredient = burgerConstructorReducer(initialState, addAction);
    
    const ingredientId = stateWithIngredient.ingredients[0].id;
    const removeAction = removeIngredient(ingredientId);
    const result = burgerConstructorReducer(stateWithIngredient, removeAction);

    expect(result.ingredients).toHaveLength(0);
  });
});

describe('экшен изменения порядка ингредиентов в начинке', () => {
  test('должен перемещать ингредиент с одного индекса на другой', () => {
    // добавляем несколько ингредиентов
    const addMainAction = addIngredient(mockMain);
    const state1 = burgerConstructorReducer(initialState, addMainAction);
    
    const addSauceAction = addIngredient(mockSauce);
    const state2 = burgerConstructorReducer(state1, addSauceAction);

    const addAnotherMainAction = addIngredient({ ...mockMain, _id: 'main2' });
    const stateWithIngredients = burgerConstructorReducer(state2, addAnotherMainAction);

    // проверяем начальный порядок
    expect(stateWithIngredients.ingredients[0]._id).toBe('main1');
    expect(stateWithIngredients.ingredients[1]._id).toBe('sauce1');
    expect(stateWithIngredients.ingredients[2]._id).toBe('main2');

    // перемещаем соус с 1 на 0
    const moveAction = moveIngredient({ fromIndex: 1, toIndex: 0 });
    const result = burgerConstructorReducer(stateWithIngredients, moveAction);

    // проверяем новый порядок
    expect(result.ingredients[0]._id).toBe('sauce1');
    expect(result.ingredients[1]._id).toBe('main1');
    expect(result.ingredients[2]._id).toBe('main2');
  });
});