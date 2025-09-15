import authReducer, {
  checkUserAuth,
  loginUser,
  registerUser,
  logoutUser,
  setAuthChecked,
  setUser,
  initialState
} from './authSlice';
import { TUser } from '@utils-types';

const mockUser: TUser = {
  email: 'test@example.com',
  name: 'Test User'
};


describe('проверка экшенов setAuthChecked и setUser', () => {
  test('должен устанавливать флаг проверки авторизации', () => {
    const action = setAuthChecked(true);
    const result = authReducer(initialState, action);
    
    expect(result.isAuthChecked).toBe(true);
  });

  test('должен устанавливать пользователя', () => {
    const action = setUser(mockUser);
    const result = authReducer(initialState, action);
    
    expect(result.user).toEqual(mockUser);
  });
});

describe('проверка экшена checkUserAuth', () => {
  test('должен устанавливать isAuthChecked в false при pending', () => {
    const action = { type: checkUserAuth.pending.type };
    const result = authReducer(initialState, action);
    
    expect(result.isAuthChecked).toBe(false);
  });

  test('должен устанавливать пользователя и isAuthChecked в true при fulfilled', () => {
    const action = { 
      type: checkUserAuth.fulfilled.type, 
      payload: mockUser 
    };
    const result = authReducer(initialState, action);
    
    expect(result.user).toEqual(mockUser);
    expect(result.isAuthChecked).toBe(true);
  });

  test('должен очищать пользователя и устанавливать isAuthChecked в true при rejected', () => {
    const action = { 
      type: checkUserAuth.rejected.type,
      error: { message: 'Ошибка проверки авторизации' }
    };
    const result = authReducer({ ...initialState, user: mockUser }, action);
    
    expect(result.user).toBeNull();
    expect(result.isAuthChecked).toBe(true);
  });
});

describe('проверка экшена loginUser', () => {
  test('должен устанавливать isAuthChecked в false при pending', () => {
    const action = { type: loginUser.pending.type };
    const result = authReducer(initialState, action);
    
    expect(result.isAuthChecked).toBe(false);
  });

  test('должен устанавливать пользователя и isAuthChecked в true при fulfilled', () => {
    const action = { 
      type: loginUser.fulfilled.type, 
      payload: mockUser 
    };
    const result = authReducer(initialState, action);
    
    expect(result.user).toEqual(mockUser);
    expect(result.isAuthChecked).toBe(true);
  });

  test('должен устанавливать isAuthChecked в true при rejected', () => {
    const action = { 
      type: loginUser.rejected.type,
      error: { message: 'Ошибка входа' }
    };
    const result = authReducer(initialState, action);
    
    expect(result.isAuthChecked).toBe(true);
    expect(result.user).toBeNull();
  });
});

describe('проверка экшена registerUser', () => {
  test('должен устанавливать isAuthChecked в false при pending', () => {
    const action = { type: registerUser.pending.type };
    const result = authReducer(initialState, action);
    
    expect(result.isAuthChecked).toBe(false);
  });

  test('должен устанавливать пользователя и isAuthChecked в true при fulfilled', () => {
    const action = { 
      type: registerUser.fulfilled.type, 
      payload: mockUser 
    };
    const result = authReducer(initialState, action);
    
    expect(result.user).toEqual(mockUser);
    expect(result.isAuthChecked).toBe(true);
  });

  test('должен устанавливать isAuthChecked в true при rejected', () => {
    const action = { 
      type: registerUser.rejected.type,
      error: { message: 'Ошибка регистрации' }
    };
    const result = authReducer(initialState, action);
    
    expect(result.isAuthChecked).toBe(true);
    expect(result.user).toBeNull();
  });
});

describe('проверка экшена logoutUser', () => {
  test('должен очищать пользователя при fulfilled', () => {
    const action = { type: logoutUser.fulfilled.type };
    const result = authReducer({ ...initialState, user: mockUser }, action);
    
    expect(result.user).toBeNull();
  });
});