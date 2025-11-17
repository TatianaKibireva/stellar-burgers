import userReducer, {
  fetchUser,
  updateUser,
  clearUser,
  initialState
} from './userSlice';
import { TUser } from '@utils-types';

const mockUser: TUser = {
  email: 'test@example.com',
  name: 'Test User'
};

const updatedUser: TUser = {
  email: 'updated@example.com',
  name: 'Updated User'
};

describe('проверка экшена clearUser', () => {
  test('должен очищать пользователя', () => {
    const action = clearUser();
    const result = userReducer({ user: mockUser }, action);
    
    expect(result.user).toBeNull();
  });
});

describe('проверка экшена fetchUser', () => {
  test('должен устанавливать пользователя при fulfilled', () => {
    const action = { 
      type: fetchUser.fulfilled.type, 
      payload: mockUser 
    };
    const result = userReducer(initialState, action);
    
    expect(result.user).toEqual(mockUser);
  });
});

describe('проверка экшена updateUser', () => {
  test('должен обновлять пользователя при fulfilled', () => {
    const action = { 
      type: updateUser.fulfilled.type, 
      payload: updatedUser 
    };
    const result = userReducer({ user: mockUser }, action);
    
    expect(result.user).toEqual(updatedUser);
  });
});