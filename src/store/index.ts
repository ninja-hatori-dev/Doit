import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './todosSlice';
import authReducer from './authSlice';
import themeReducer from './themeSlice';

import weatherReducer from './weatherSlice';

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    auth: authReducer,
    theme: themeReducer,
    weather: weatherReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;