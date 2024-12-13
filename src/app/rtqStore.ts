import { createSlice } from '@reduxjs/toolkit';

export interface AuthState {
  isAuthenticated: boolean;
  user: {
    id: number; // или string, в зависимости от вашей модели
    name: string; // Имя пользователя, если требуется
    email: string;
    role?: string // Email пользователя
  } | null; // null, если пользователь не авторизован
}

const initialState: AuthState = {
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null,
  isAuthenticated: !!localStorage.getItem('isAuthenticated'), // Проверяем сохраненное значение
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, actions) => {
      state.isAuthenticated = true;
      state.user = actions.payload.user
      localStorage.setItem('isAuthenticated', 'true'); // Сохраняем состояние
      localStorage.setItem('user', JSON.stringify(actions.payload.user));
    },
    logout: (state) => {
      state.isAuthenticated = false;
      localStorage.removeItem('isAuthenticated'); // Удаляем состояние
      localStorage.removeItem('user')
    },
  },
});

export const authReducer = authSlice.reducer;
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
